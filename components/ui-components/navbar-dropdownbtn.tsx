import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import GoLogo from "@/public/gologo.svg"
import TypeScriptLogo from "@/public/typescriptlogo.svg"
import Image from "next/image"

  export default function ButtonDropdownNavbar() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p> Transform </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 mt-3 p-0">
                <DropdownMenuCheckboxItem className="text-md rounded-none m-0 cursor-pointer bg-blue-600 px-5 text-white justify-between"> TypeScript <Image priority width="32" className="mr-[-2px]" src={TypeScriptLogo} alt="Golang"/> </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="text-md rounded-none m-0 cursor-pointer bg-sky-400 px-5 text-white justify-between"> Go <Image priority width="32" src={GoLogo} alt="Golang"/>  </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
  }