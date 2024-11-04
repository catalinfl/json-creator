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
            if (index === value.length - 1) {
                if (!verifyFieldType(fieldType)) {
                    const str = createStruct(structsMap, fieldType) // this should be after parsing the structs
                    jsonToBeMapped.push(`"${fieldName}": ${str}`)
                    return
                }
                jsonToBeMapped.push(`"${fieldName}": "abcd"`)
            } else {
                jsonToBeMapped.push(`"${fieldName}": "abcd",`)
            }
        })

        sendJsonMap.set(key, jsonToBeMapped) 
    })

    for (const [key, value] of sendJsonMap) {
        console.log(key, value)
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


const createStruct = (structMap: Map<string, string[]>, fieldType: string): string => {
    if (!structMap.has(fieldType)) {
        return ""
    }

    var stringifiedJsonToBeSend = "";

    for (let [key, value] of structMap) {
        if (key === fieldType) {
            stringifiedJsonToBeSend += "{\n"
            value.forEach((row: string, index: number) => {
                const fieldName = row.split(' ')[0]
                const fieldType = row.split(' ')[1]
                if (index === value.length - 1) {
                    stringifiedJsonToBeSend += `\t "${fieldName}": "${fieldType}"` + "\n"
                    return
                }
                stringifiedJsonToBeSend += `\t "${fieldName}": "${fieldType}", ` + "\n"
            })

            stringifiedJsonToBeSend += "\t }"
        }
    }

    return stringifiedJsonToBeSend
}





export { POST }