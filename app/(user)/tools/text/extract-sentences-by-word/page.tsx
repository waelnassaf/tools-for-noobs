"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const targetWordInput = useRef<HTMLInputElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const extractSentences = () => {
        const text = textarea.current?.value
        const targetWord = targetWordInput.current?.value.trim()

        if (!text || !targetWord) {
            setIsEmpty(true)
            setShowAlert(true)
        } else {
            const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || []
            const filteredSentences = sentences
                .filter((sentence) =>
                    sentence.toLowerCase().includes(targetWord.toLowerCase())
                )
                .map((sentence) => sentence.trim())

            const resultText = filteredSentences.join("\n")
            setTextResult(resultText)
            setIsEmpty(resultText.length === 0)
            setShowAlert(true)
        }

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Extract Sentences By Word"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Extract Sentences By Word</h1>
                <p>
                    Paste the text and enter a word to find sentences containing
                    that word:
                </p>

                <div className="lg:flex lg:gap-4 mb-4">
                    <textarea
                        className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                        placeholder="Paste text here"
                        ref={textarea}
                    ></textarea>
                    <input
                        className="input input-bordered input-lg w-full md:w-1/4 mt-3 lg:m-0"
                        placeholder="Find word"
                        ref={targetWordInput}
                    />
                </div>

                <SubmitButton
                    text={"Extract Sentences"}
                    handleClick={extractSentences}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={textResult}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Extract Sentences By Word</h2>
                    <p>
                        This tool <b>Extract Sentences By Word</b> helps you
                        find and extract all sentences containing a specific
                        word from a given text. Whether you&apos;re analyzing
                        documents, filtering important information, or
                        processing textual data, this tool simplifies the task
                        by identifying and displaying the relevant sentences.
                    </p>
                </div>
            </div>
        </>
    )
}
