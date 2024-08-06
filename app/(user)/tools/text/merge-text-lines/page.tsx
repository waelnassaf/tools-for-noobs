"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [mergedText, setMergedText] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const delimiterInput = useRef<HTMLInputElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const mergeLines = () => {
        const text = textarea.current?.value
        const delimiter = delimiterInput.current?.value || " "

        if (!text) {
            setIsEmpty(true)
            setShowAlert(false)
            return
        }

        const lines = text.split("\n").filter(Boolean)
        const merged = lines.join(delimiter)

        setIsEmpty(merged.length === 0)
        setMergedText(merged)
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Merge Text Lines"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Merge Text Lines</h1>
                <p>
                    Paste the text and specify the delimiter to merge the lines:
                </p>

                <div className="lg:flex lg:gap-4 mb-4">
                    <textarea
                        className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                        placeholder="Paste text here"
                        ref={textarea}
                    ></textarea>
                    <input
                        className="input input-bordered input-lg w-full md:w-1/4 mt-3 lg:m-0"
                        placeholder="Enter delimiter"
                        ref={delimiterInput}
                    />
                </div>

                <SubmitButton text={"Merge Lines"} handleClick={mergeLines} />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={mergedText}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Merge Text Lines</h2>
                    <p>
                        This tool <b>Merge Text Lines</b> allows users to paste
                        multiple lines of text and merge them into a single line
                        with a specified delimiter.
                    </p>
                </div>
            </div>
        </>
    )
}
