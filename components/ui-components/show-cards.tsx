import React from 'react'
import Card, { CardProps } from './card'

type CardDeclared = Omit<CardProps, 'index'>

const cards: CardDeclared[] = [
    { cardType: 'golang' },
    { cardType: 'typescript'},
    { cardType: 'convert'}
]

const ShowCards = () => {
  return (
    <div className="grid grid-cols-3 space-x-4 mx-auto mt-16 p-4 gap-2 max-w-7xl w-full">
        {Array.from(cards).map((card, index) => (
            <Card {...card} index={index} key={index} />
        ))}
    </div>

  )
}

export default ShowCards