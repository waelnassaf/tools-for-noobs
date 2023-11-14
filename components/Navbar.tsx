"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { RxHamburgerMenu } from "react-icons/rx"
import { useState } from "react"
import { navLinks } from "@/constants"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <nav>
            <div className="flex-center sm:hidden p-2">
                <div
                    className={`
                        border border-black p-2 ${
                            isMenuOpen
                                ? "border-opacity-10"
                                : "border-opacity-40"
                        }`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <RxHamburgerMenu className="text-3xl" />
                </div>
            </div>

            <div
                className={`
                        ${
                            isMenuOpen
                                ? "opacity-100 h-auto block"
                                : "opacity-50 h-0 hidden"
                        }
                        transition-opacity duration-100 ease-in-out
                        sm:opacity-100 sm:h-auto sm:block
                        sm:px-4
                        md:w-3/4  `}
            >
                <ul
                    className={`
                      sm:flex
                      sm:justify-between
                      sm:items-center
                      text-center
                      `}
                >
                    {navLinks.map((l, i) => (
                        <li key={i}>
                            <Link
                                key={i}
                                href={l.path}
                                className={`
                                    block
                                    rounded-none
                                    sm:rounded-full
                                    hover:bg-black
                                    hover:bg-opacity-10
                                    py-4
                                    px-6
                                ${
                                    pathname === l.path ||
                                    pathname.includes(l.path.split("/")[2])
                                        ? "bg-black bg-opacity-20"
                                        : ""
                                } `}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
