"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import Card, { CardProps } from './card'
import GoImg from '../../public/gologo.svg'
import TsImg from '../../public/typescriptlogo.svg'
import Convert from '../../public/convert.svg'
import { ScrollContext, ScrollJsonContextProps } from '@/context/scrolljson'


type CardDeclared = Omit<CardProps, 'index'>

const cards: CardDeclared[] = [
    { cardType: 'golang', 
      cardText: 'Transform your Go structs into JSON.',
      image: GoImg,
      languageText: `type Person struct { \n Name string 
      \n Age int \n
      \n Email string \n
      \n Married bool \n
      }`,
      jsonText: `{ \n "Name": "Fabio", \n "Age": 25, \n "Email": "fabio@yahoo.com", \n "Married": true \n }`
    },
    { cardType: 'typescript',
      cardText: 'Transform your Typescript interfaces/types into JSON.',
      image: TsImg,
      languageText: `type Person = { \n name: string 
      \n age: number \n
      \n email: string \n
      \n married: boolean \n
      }`,
      jsonText: `{ \n "name": "Fabio", \n "age": 25, \n "email": "fabio@yahoo.com", \n "married": true \n }`
    },
      { cardType: 'convert',
      cardText: 'Create your own custom interface and transform it into JSON.',
      image: Convert,
      languageText: `Person: \n
      \n Name: string (Random name) \n
      \n Age: number (Random) \n
      \n Email: string (Random email) \n
      \n Married: boolean (Random) \n
      `,
      jsonText: `{ \n "Name": "Fabio", \n "Age": 25, \n "Email": "fabio@yahoo.com", \n "Married": true \n }`
    }
]

const ShowCards = () => {

  const showCardsRef = useRef<HTMLDivElement>(null)
  const scrollCtx = useContext(ScrollContext);
  const { goToCards } = scrollCtx as ScrollJsonContextProps;

  useEffect(() => {
    if (goToCards !== 0) {
      if (showCardsRef.current) {
        showCardsRef.current.scrollIntoView({ behavior: 'smooth' })   
      }
    }
  }, [goToCards])

  return (
    <div ref={showCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-y-24 xl:gap-y-0 xl:grid-cols-3 space-x-4 mx-auto mt-16 p-4 gap-2 max-w-7xl w-full">
        {cards.map((card, index) => (
            <Card {...card} index={index} key={index} />
        ))}
    </div>
  )
}



export default ShowCards