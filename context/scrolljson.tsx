"use client"
import { createContext, useState } from "react";
import React from "react";

export interface ScrollJsonContextProps {
    goToCards: number
    setGoToCards: (value: number) => void
}

const ScrollContext = createContext<ScrollJsonContextProps | null>(null);

const ScrollProvider = ({ children }: { children: React.ReactNode }) => {

    const [goToCards, setGoToCards] = useState<number>(0)
    
    return (
        <ScrollContext.Provider value={{ goToCards, setGoToCards }}>
            {children}
        </ScrollContext.Provider>
    )
}

export { ScrollProvider, ScrollContext }

