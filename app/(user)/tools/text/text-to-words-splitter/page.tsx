"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TextToWordsSplitter() {
    const [words, setWords] = useState<string[]>([])
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [displayOption, setDisplayOption] = useState("comma")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text To Words Splitter"]

    const splitTextToWords = () => {
        if (textarea.current) {
            const text = textarea.current.value
            const trimmedText = text.trim()
            const wordArray = splitWords(trimmedText)
            setWords(wordArray)
            setShowAlert(true)
            setIsEmpty(wordArray.length === 0)
            setTimeout(() => {
                alertDiv.current?.scrollIntoView({ behavior: "smooth" })
            }, 0)
        }
    }

    const splitWords = (text: string): string[] => {
        return text
            .replace(/[^\w\s]/g, "") // Remove non-word characters
            .split(/\s+/) // Split by whitespace
            .filter((word) => word.length > 0) // Filter out any empty strings
    }

    const getFormattedResult = (): string => {
        return displayOption === "comma" ? words.join(", ") : words.join("\n")
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Text To Words Splitter</h1>
                <p>Enter text below to split it into individual words:</p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Enter text here"
                    ref={textarea}
                ></textarea>

                <div className="form-control w-full md:w-1/3 my-4">
                    {["comma", "newline"].map((option) => (
                        <label
                            className="label cursor-pointer space-x-2"
                            key={option}
                        >
                            <span className="label-text">
                                {option === "comma"
                                    ? "Separated by Commas"
                                    : "Each Word on a New Line"}
                            </span>
                            <input
                                type="radio"
                                name="displayOption"
                                value={option}
                                checked={displayOption === option}
                                onChange={() => setDisplayOption(option)}
                                className="radio radio-primary"
                            />
                        </label>
                    ))}
                </div>

                <SubmitButton
                    text={"Split Text"}
                    handleClick={splitTextToWords}
                    className="w-full sm:w-auto"
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={getFormattedResult()}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Text To Words Splitter</h2>
                    <p>
                        This <strong>Text To Words Splitter</strong> tool
                        converts text into individual words by removing special
                        characters and splitting the text by spaces. You can
                        choose to display the words separated by commas or each
                        word on a new line. It&apos;s useful for analyzing text,
                        creating word lists, or preparing content for further
                        processing.
                    </p>
                </div>
            </div>
        </>
    )
}
