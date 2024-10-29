import { MotionDiv } from "./motion"

export interface CardProps {
    cardType: CardType
    index: number
}   

type CardType = "golang" | "typescript" | "convert"

export default function Card({ cardType, index }: CardProps) {

    const isEven = index % 2 === 0;

    return (
        <MotionDiv 
            initial={{ opacity: 0, rotate: 5, x: isEven ? -100 : 0, y: isEven ? 0 : -100 }}
            whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, threshold: 0.5 }}
        className="bg-secondary shadow-slate-400 bg-slate-100 min-h-[500px] rounded-lg shadow-2xl">
            <h3 className={`${cardType === "golang" ? "bg-sky-400" : cardType === "typescript" ? "bg-blue-700" : "bg-yellow-500"} bg-secondary rounded-t-lg text-white px-6 py-2`}> {cardType.slice(0, 1).toUpperCase() + cardType.slice(1, cardType.length)} </h3>
            <div className="px-4 py-2">
                <p> test </p>
            </div>
        </MotionDiv>
    )
}