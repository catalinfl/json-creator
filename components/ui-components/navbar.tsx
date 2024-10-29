import React from "react"
import { MotionDiv } from "./motion"
import Link from "next/link"
import ButtonDropdownNavbar from "./navbar-dropdownbtn"

export default function Navbar() {
    return (
        <MotionDiv 
        viewport={{ amount: 0 }}
        transition={{ 
            duration: 0.5,
            ease: "easeInOut"
        }}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        className="text-md flex flex-row gap-5 min-w-[300px] max-w-[400px] text-primary mt-3 rounded-lg bg-slate-100 p-4 mx-auto justify-around">
            <Link href="/">
                <p className="cursor-pointer"> Home </p>
            </Link>
            <Link href="/">
                <ButtonDropdownNavbar />
            </Link>
            <Link href="/">
                <p className="cursor-pointer"> Convert </p>
            </Link>
            <Link href="/">
                <p className="cursor-pointer"> About </p> 
            </Link>
        </MotionDiv>
    )
}