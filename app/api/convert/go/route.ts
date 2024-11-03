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

    console.log(structsMap)

    

    return NextResponse.json({ t: structsMap })
}




export { POST }