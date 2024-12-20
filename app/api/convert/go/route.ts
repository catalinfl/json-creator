import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export type LanguageType = "typescript" | "go" | "convert"

type BodyType = {
    message: any,
    language: LanguageType
}

async function POST(req: NextRequest) {
    const body = await req.json()

    const typedBody = body as BodyType
    
    if (typedBody.language !== "go") {
        return NextResponse.json({ message: "Invalid language" }, { status: 400 })
    }
    
    const linesFormatted = typedBody.message.split('\n').map((line: string) => (
        line.includes('\t') ? line.replace('\t', '') : line
    )) as string[]

    const structsMap = new Map<string, string[]>();

    let isContentOfStruct = false;
    let isStructPresentVar = false;
    let contentLines = "";
    let structName = "";

    linesFormatted.forEach((line: string, _: number) => {
       
        if (line.includes('{')) { // handle the start of the struct
            isContentOfStruct = true;
            structName = line.split(' ')[1];
            if (structsMap.has(structName)) {
                isStructPresentVar = true;
            }
            structsMap.set(structName, [])
            return
        } 

        if (line.includes('}')) { // handle the end of the struct
            isContentOfStruct = false;
            if (line === "") {
                return
            }
            if (contentLines.split('\n').length < 2) {
                contentLines = contentLines + '\n';
                structsMap.set(structName, [contentLines.split('\n')[0]])
                contentLines = ""
                return
            }
            structsMap.set(structName, contentLines.split('\n'))
            contentLines = ""
            return
        }

        if (isContentOfStruct) {
            if (contentLines === "") {
                contentLines = line
                return
            }
            contentLines += '\n' + line
        }
    })


    const sendJsonMap = new Map<string, string[]>();

    structsMap.forEach((value, key) => {
        sendJsonMap.set(key, [])
        var jsonToBeMapped = [] as string[]
        value.forEach((row: string, index: number) => {
            const fieldName = row.split(' ')[0]
            const fieldType = row.split(' ')[1]
            if (!verifyFieldType(fieldType)) {
                jsonToBeMapped.push(`"${fieldName}": ${fieldType}`)
                return
            }
            if (index === value.length - 1) {
                jsonToBeMapped.push(`"${fieldName}": "abcd"`)
            } else {
                jsonToBeMapped.push(`"${fieldName}": "abcd",`)
            }
        })

        sendJsonMap.set(key, jsonToBeMapped) 
    })

    for (const [key, value] of sendJsonMap) {
        const updatedValue: string[] = [];
        for (const row of value) {
            const fieldName = row.split(' ')[0]
            const fieldType = row.split(' ')[1]
            if (verifyIfAnotherStruct(structsMap, fieldType)) {
                const structJson = createStruct(structsMap, fieldType, fieldName, 0)
                if (structJson === "") {
                    return NextResponse.json({ message: "Invalid field type" }, { status: 400 })
                }
                updatedValue.push(`${structJson}`)
            } else {
                updatedValue.push(row);
            }
        }
        sendJsonMap.set(key, updatedValue);
    }

    for (let eachStruct of Array.from(structsMap.values())) {
        for (let row of eachStruct) {
            const fieldType = row.split(' ')[1]
            if ((!verifyFieldType(fieldType) && !verifyIfAnotherStruct(structsMap, fieldType)) || isStructPresentVar) {
                return NextResponse.json({ message: "Invalid field type" }, { status: 400 })
            }
        }
    }

    var stringifiedJsonToBeSend = "";

    for (let value of Array.from(sendJsonMap.values())) {
        stringifiedJsonToBeSend += "{\n"
        for (let row of value) {
            stringifiedJsonToBeSend += row + "\n"
        }
        stringifiedJsonToBeSend += "}\n"
    }

    console.log(stringifiedJsonToBeSend)


    return NextResponse.json({ t: stringifiedJsonToBeSend })
}

const GoTypes = ["int", "string", "float64", "bool", "struct", "interface", "map", "slice", "array", "chan", "func", "pointer", "nil", "error", "byte", "rune", "complex64", "complex128", "uint", "uintptr", "int8", "int16", "int32", "int64", "uint8", "uint16", "uint32", "uint64", "float32"]

const verifyFieldType = (fieldType: string) => {
    if (GoTypes.includes(fieldType)) {
        return true
    }
    return false
}

const verifyIfAnotherStruct = (structMap: Map<string, string[]>, fieldType: string) => {
    if (structMap.has(fieldType)) {
        return true
    }
    return false
}



const createStruct = (structMap: Map<string, string[]>, fieldType: string, jsonPartName: string, level: number, visited = new Set<string>()): string | NextResponse => {
    if (!structMap.has(fieldType)) {
        return NextResponse.json({ message: "Invalid field type" }, { status: 404 });
    }

    if (visited.has(fieldType)) {
        return `"${jsonPartName}": { "circular_reference": "${fieldType}" }`;
    }

    visited.add(fieldType);

    let stringifiedJsonToBeSend = "";

    const indent = '\t'.repeat(level);
    const nextIndent = '\t'.repeat(level + 1);

    if (jsonPartName.includes(`"`)) {
        stringifiedJsonToBeSend += `${indent}${jsonPartName} {\n`;
    } else {
        stringifiedJsonToBeSend += `${indent}"${jsonPartName}": {\n`;
    }

    const value = structMap.get(fieldType);
    if (value) {
        value.forEach((row: string, index: number) => {
            const fieldName = row.split(' ')[0];
            const fieldType = row.split(' ')[1];
            if (structMap.has(fieldType)) {
                const nestedStructJson = createStruct(structMap, fieldType, fieldName, level + 1, visited);
                if (typeof nestedStructJson === 'string') {
                    stringifiedJsonToBeSend += `${nestedStructJson}`;
                } else {
                    return nestedStructJson;
                }
            } else {
                stringifiedJsonToBeSend += `${nextIndent}"${fieldName}": "abcd"`;
            }
            if (index !== value.length - 1) {
                stringifiedJsonToBeSend += ",\n";
            } else {
                stringifiedJsonToBeSend += "\n";
            }
        });
    }

    stringifiedJsonToBeSend += `${nextIndent}}`;


    visited.delete(fieldType);
    return stringifiedJsonToBeSend;
};



export { POST }