"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

interface CharCounts {
    [char: string]: number
}

export default function Home() {
    const [charCounts, setCharCounts] = useState<CharCounts>({})
    const [targetChar, setTargetChar] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [option, setOption] = useState("single")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const targetCharInput = useRef<HTMLInputElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)
    const countSingleChar = (char: string, text: string) => {
        const regex = new RegExp(char, "g")
        return (text.match(regex) || []).length
    }

    const countChars = () => {
        const text = textarea.current?.value

        if (!text) {
            setIsEmpty(true)
            setShowAlert(false)
            return
        }

        let charCount: CharCounts = {}

        if (option === "single") {
            const inputChar = targetCharInput.current?.value.trim()
            if (!inputChar) {
                setIsEmpty(true)
                setShowAlert(false)
                return
            }

            charCount[inputChar] = countSingleChar(inputChar, text)
            setTargetChar(inputChar)
        } else {
            charCount = Array.from(text).reduce<CharCounts>((acc, char) => {
                acc[char] = (acc[char] || 0) + 1
                return acc
            }, {})
            setTargetChar("") // Clear target character for all characters option
        }

        setIsEmpty(Object.keys(charCount).length === 0)
        setCharCounts(charCount)
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Character Frequency Counter"]

    const formatCharCounts = () => {
        return Object.entries(charCounts)
            .map(([char, count]) => `${char}: ${count}`)
            .join("\n")
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Character Frequency Counter</h1>
                <p>
                    Paste the text and choose an option to find character
                    frequency:
                </p>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="form-control w-full md:w-1/3 my-4">
                    <label className="label cursor-pointer space-x-2">
                        <span className="label-text">
                            Find Single Character Occurrence
                        </span>
                        <input
                            type="radio"
                            name="option"
                            value="single"
                            checked={option === "single"}
                            onChange={() => setOption("single")}
                        />
                    </label>
                    <label className="label cursor-pointer space-x-2">
                        <span className="label-text">
                            Find All Characters Occurrences
                        </span>
                        <input
                            type="radio"
                            name="option"
                            value="all"
                            checked={option === "all"}
                            onChange={() => setOption("all")}
                        />
                    </label>
                </div>

                <div className="flex gap-3">
                    {option === "single" && (
                        <input
                            className="input input-bordered input-lg w-full md:w-1/4 mt-3 lg:m-0"
                            placeholder="Enter character"
                            ref={targetCharInput}
                        />
                    )}

                    <SubmitButton
                        text={"Count Character Frequency"}
                        handleClick={countChars}
                    />
                </div>

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={
                        option === "single"
                            ? `Frequency of "${targetChar}": ${charCounts[targetChar] || 0}`
                            : `Character Frequencies:\n${formatCharCounts()}`
                    }
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Character Frequency Counter</h2>
                    <p>
                        This tool <b>Character Frequency Counter</b> is used by
                        people who want a quick way to determine the frequency
                        of characters in a text.
                    </p>
                </div>
            </div>
        </>
    )
}
