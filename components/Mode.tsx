"use client"

import { FaSun, FaMoon } from "react-icons/fa"
import { useTheme } from "@/contexts/ThemeContext"

const Mode = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div
            className=" flex
                            justify-center
                            items-center
                            mr-auto
                            md:col-span-2
                            "
            onClick={toggleTheme}
        >
            <div
                className={`relative
                    w-[90px]
                    ml-auto
                    flex justify-between
                    py-3 px-4 m-4 sm:m-0 rounded-3xl pointer
                    ${theme === "dark" ? "bg-sun" : "bg-space"}
                    `}
            >
                <div
                    className={`
                                  mode-ball
                                  absolute
                                  w-6 
                                  h-6 
                                  bg-black
                                  rounded-full 
                                  top-1/2
                                  -translate-y-1/2
                                  transition-transform
                                  ${
                                      theme === "dark"
                                          ? "-translate-x-1"
                                          : "translate-x-9"
                                  }
                            `}
                ></div>
                <FaMoon className="text-xl" />
                <FaSun className="text-xl" />
            </div>
        </div>
    )
}

export default Mode
