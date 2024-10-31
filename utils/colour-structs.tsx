import { CardType } from '@/components/ui-components/card'
import React from 'react'

interface ColourStructsProps {
    structText: string
    language: CardType,
    isLanguage: boolean
}


const ColourStructs = ({structText, language, isLanguage}: ColourStructsProps) => {
    if (!isLanguage) {
        return JSONStructs(structText)
    }
    if (language === "golang") {
        return GoStructs(structText)
    } 
    if (language === "typescript") {
        return TypeScriptStructs(structText)
    }
    if (language === "convert") {
        return ConvertStructs(structText)
    }
    return 
}

const ConvertStructs = (structText: string): JSX.Element => {
    const structLines = structText.split('\n')

    return (
        <div className='p-4 whitespace-pre-line'>
            {structLines.map((line: string, lineIndex: number) => (
                <div key={lineIndex} className={lineIndex > 0 && !line.includes('}') && !line.includes('{') ? 'pl-4' : ''}>
                    {line.split(" ").map((word: string, wordIndex: number) => (
                        <React.Fragment key={wordIndex}>
                            {word.includes(':') || word.includes('(') || word.includes(')') ? <span className="text-yellow-500">{word}</span> : word}{' '}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

const GoStructs = (structText: string) => {
    const structLines = structText.split('\n')

    return (
        <div className='p-4 whitespace-pre-line'>
            {structLines.map((line: string, lineIndex: number) => (
                <div key={lineIndex} className={lineIndex > 0 && !line.includes('}') && !line.includes('{') ? 'pl-4' : ''}>
                    {line.split(" ").map((word: string, wordIndex: number) => (
                        <React.Fragment key={wordIndex}>
                            {identifyGoWords(word)}{' '}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}   


const TypeScriptStructs = (structText: string): JSX.Element=> {
    const structLines = structText.split('\n')
    return (
        <div className="whitespace-pre-line p-4">
            {structLines.map((line: string, lineIndex: number) => (
                <div key={lineIndex} className={lineIndex > 0 && !line.includes('{') && !line.includes('}') ? "pl-4" : ""}>
                    {line.split(" ").map((word: string, wordIndex: number) => (
                        <React.Fragment key={wordIndex}>
                            {identifyTypescriptWords(word)}{' '}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

const JSONStructs = (jsonText: string): JSX.Element => {
    const jsonLines = jsonText.split('\n')

    return (
        <div className='p-4 whitespace-pre-line'>
            {jsonLines.map((line: string, lineIndex: number) => (
                <div key={lineIndex} className={lineIndex > 0 && !line.includes('}') && !line.includes('{') ? 'pl-4' : ''}>
                    {line.split(" ").map((word: string, wordIndex: number) => (
                        <React.Fragment key={wordIndex}>
                            {identifyJsonWords(word)}{' '}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

const identifyJsonWords = (word: string): JSX.Element | string => {
    if (word === '{' || word === '}') {
        return <span className="text-blue-600">{word}</span>
    }
    if (word === ':') {
        return <span className="text-blue-600">{word}</span>
    }
    const wordWithoutComma = word.replace(/,/g, '')
    if (!isNaN(Number(wordWithoutComma))) {
        return (
            <>
            <span className="text-red-400">{wordWithoutComma}</span>{word.includes(',') ? ',' : ''}
            </>
        ) 
    }
    if (word === "true" || word === "false") {
        return <span className="text-red-600">{word}</span>
    }


    
    if (word.includes('"')) {
        const wordReplaced = word.replace(/"/g, '').replace(/,/g, '').replace(/:/g, '')
        const containsComma = word.includes(',')
        const containsColon = word.includes(':')
        return (
            <>
                {'"'}<span className="text-red-400">{wordReplaced}</span>{'"'}{containsComma ? ',' : ''}{containsColon ? ':' : ''}
            </>
        ) 
    }

    return word
}

const identifyGoWords = (word: string): JSX.Element | string => {
    if (word === "type") {
        return <span className="text-blue-600">{word}</span>
    }
    if (word === "struct") {
        return <span className="text-sky-400">{word}</span>
    }
    if (word === "string" || word === "int" || word === "bool" || word === "float64" || word === "float32" || word === "uint" || word === "uint8" || word === "uint16" || word === "uint32" || word === "uint64" || word === "int8" || word === "int16" || word === "int32" || word === "int64" || word === "byte" || word === "rune") {
        return <span className="text-sky-600">{word}</span>
    }
    return word
}

const identifyTypescriptWords = (word: string): JSX.Element | string => {
    if (word === "type") {
        return <span className="text-blue-600">{word}</span>
    }
    if (word === "=") {
        return <span className="text-sky-400">{word}</span>
    }
    if (word === "interface") {
        return <span className="text-red-400">{word}</span>
    }
    if (word === "string" || word === "number" || word === "boolean" || word === "object" || word === "null" || word === "undefined") {
        return <span className="text-blue-500">{word}</span>
    }
    return word
}

export default ColourStructs