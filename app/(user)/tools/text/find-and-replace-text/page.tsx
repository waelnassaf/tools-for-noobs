"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const targetWordInput = useRef<HTMLInputElement>(null)
    const replaceWordInput = useRef<HTMLInputElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const findAndReplace = () => {
        const text = textarea.current?.value
        const targetWord = targetWordInput.current?.value.trim()
        const replaceWord = replaceWordInput.current?.value.trim()

        if (!text || !targetWord || !replaceWord) {
            setIsEmpty(true)
            setShowAlert(false)
            return
        }

        const regex = new RegExp(targetWord, "gi")
        const replacedText = text.replace(regex, replaceWord)

        setTextResult(replacedText)
        setIsEmpty(false)
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Find and Replace Text"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Find and Replace Text</h1>
                <p>
                    Paste the text, enter the word you want to find, and the
                    word you want to replace it with:
                </p>

                <div className="lg:flex lg:gap-4 mb-4">
                    <textarea
                        className="textarea textarea-lg block textarea-bordered
                        textarea-ghost w-full md:w-3/4 h-80"
                        placeholder="Paste text here"
                        ref={textarea}
                    ></textarea>
                    <input
                        className="input input-bordered input-lg w-full
                        md:w-1/4 mt-3 lg:m-0"
                        placeholder="Find word"
                        ref={targetWordInput}
                    />
                    <input
                        className="input input-bordered input-lg w-full
                        md:w-1/4 mt-3 lg:m-0"
                        placeholder="Replace with"
                        ref={replaceWordInput}
                    />
                </div>

                <SubmitButton
                    text={"Find and Replace"}
                    handleClick={findAndReplace}
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
                    <h2>About Find and Replace Text</h2>
                    <p>
                        This tool <b>Find and Replace Text</b> is a handy
                        utility for quickly finding and replacing words in a
                        given text. Whether you&apos;re editing documents, code,
                        or any text data, this tool helps streamline the process
                        by replacing all instances of a target word with a
                        specified replacement.
                    </p>
                </div>
            </div>
        </>
    )
}
