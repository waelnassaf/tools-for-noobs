"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

interface WordCounts {
    [word: string]: number
}

export default function Home() {
    const [wordCounts, setWordCounts] = useState<WordCounts>({})
    const [targetWord, setTargetWord] = useState<string>("") // State to store the target word
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const targetWordInput = useRef<HTMLInputElement>(null) // Ref for the target word input
    const alertDiv = useRef<HTMLDivElement>(null)

    const countWords = () => {
        const text = textarea.current?.value
        const inputWord = targetWordInput.current?.value.trim().toLowerCase()

        if (!text || !inputWord) {
            setIsEmpty(true)
            setShowAlert(false)
            return
        }

        const words = text.toLowerCase().split(/\s+/).filter(Boolean) // Ensure case-insensitive matching
        const wordCount = words.reduce<WordCounts>((acc, word) => {
            if (word === inputWord) {
                // Count only the target word
                acc[word] = (acc[word] || 0) + 1
            }
            return acc
        }, {})

        setIsEmpty(Object.keys(wordCount).length === 0)
        setWordCounts(wordCount)
        setTargetWord(inputWord) // Update the state with the target word
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Word Frequency Counter"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Word Frequency Counter</h1>
                <p>
                    Paste the text and enter the word you want to count the
                    frequency of:
                </p>

                <div className="flex gap-4 mb-4">
                    <input
                        className="input input-bordered input-lg w-full md:w-1/4"
                        placeholder="Enter word"
                        ref={targetWordInput}
                    />
                    <textarea
                        className="textarea textarea-lg block textarea-bordered
                        textarea-ghost w-full md:w-3/4 h-80"
                        placeholder="Paste text here"
                        ref={textarea}
                    ></textarea>
                </div>

                <SubmitButton
                    text={"Count Word Frequency"}
                    handleClick={countWords}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`Frequency of "${targetWord}": ${wordCounts[targetWord] || 0}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Word Frequency Counter</h2>
                    <p>
                        This tool <b>Word Frequency Counter</b> is used by
                        people who want a quick way to determine the frequency
                        of a specific word in a text.
                    </p>
                </div>
            </div>
        </>
    )
}
