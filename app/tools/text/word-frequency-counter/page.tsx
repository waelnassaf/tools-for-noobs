"use client"
import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

interface WordCounts {
    [word: string]: number
}

export default function Home() {
    const [wordCounts, setWordCounts] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const countWords = () => {
        const text = textarea.current?.value
        if (!text) {
            setIsEmpty(true)
            setShowAlert(false)
            return
        }

        const words = text.split(/\s+/).filter(Boolean)
        const counts = words.reduce<WordCounts>((acc, word) => {
            acc[word] = (acc[word] || 0) + 1
            return acc
        }, {})

        setIsEmpty(false)
        setWordCounts(counts)
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
                    Paste the text in the following input to get the word
                    frequencies:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Count Word Frequency"}
                    handleClick={countWords}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`Word Frequencies: ${JSON.stringify(wordCounts)}`}
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
                        of words in a specific text.
                    </p>
                </div>
            </div>
        </>
    )
}
