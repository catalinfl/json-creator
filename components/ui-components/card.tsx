"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { MotionDiv } from "./motion"
import Image, { StaticImageData } from "next/image"
import ColourStructs from "@/utils/colour-structs"

export interface CardProps {
    cardType: CardType
    cardText: string
    index: number
    jsonText: string
    languageText: string
    image: StaticImageData
}   

export interface ImageAbsoluteProps { 
    image: string
}

type ModelStructureProps = {
    card: CardType,
    jsonText: string,
    languageText: string
}


export type CardType = "golang" | "typescript" | "convert"

export default function Card({ cardType, index, cardText, jsonText, languageText, image }: CardProps) {

    const isEven = index % 2 === 0;

    return (
        <MotionDiv 
            initial={{ opacity: 0, rotate: 5, x: isEven ? -100 : 0, y: isEven ? 0 : -100 }}
            whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, threshold: 0.5 }}
        className="bg-secondary select-none relative shadow-slate-400 bg-white min-h-[500px] shadow-2xl">
            <h3 className={`${cardType === "golang" ? "bg-sky-400" : cardType === "typescript" ? "bg-blue-600" : "bg-yellow-500"} rounded-t-lg text-white px-6 py-2`}> {cardType.slice(0, 1).toUpperCase() + cardType.slice(1, cardType.length)} </h3>
            <div className="px-4 py-2 h-16">
                <p> {cardText} </p>
            </div>
            <ImageAbsolute image={image} />
            <ModelStructure card={cardType} jsonText={jsonText} languageText={languageText} />
        </MotionDiv>
    )
}


const ImageAbsolute = ({ image }: { image: StaticImageData }) => {
    return (
        <div className="flex-row">
        <Image src={image} alt="logo" width="300" height="300" className="absolute z-0 inset-0 opacity-20 bg-center mx-auto h-full"/>
        </div>
    )
}

const ModelStructure: React.FC<ModelStructureProps> = ({ card, jsonText, languageText }) => {
        const [isLanguage, setIsLanguage] = useState<boolean>(true)

        return (
            <div className="h-[400px] w-full">
                <div className="w-full h-full">
                    <div className="h-[400px] text-lg">
                    <ColourStructs isLanguage={isLanguage} language={card} structText={isLanguage ? languageText : jsonText} />
                    </div>
                    <div className={`${card === "golang" ? "bg-sky-400" : card === "typescript" ? "bg-blue-600" : "bg-yellow-500" } border-dashed border-slate-300 border-t-8 flex flex-row py-2 rounded-b-lg mt-[-5px] justify-center gap-4`}>
                        <Button onClick={() => setIsLanguage(true)}> {card.slice(0, 1).toUpperCase() + card.slice(1, card.length)} </Button>
                        <Button onClick={() => setIsLanguage(false)}> JSON </Button>
                    </div>
                </div>
            </div>
        )
}