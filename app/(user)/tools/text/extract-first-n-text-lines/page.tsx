"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function ExtractFirstLines() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [lineCount, setLineCount] = useState<number>(1)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Extract First n Lines"]

    const handleTextTransformation = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value
            const lines = text.split("\n").slice(0, lineCount).join("\n")
            setTextResult(lines)
        }
        // Ensure the alert div is scrolled into view after state update
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Extract First n Lines</h1>
                <p>
                    Paste the text and specify the number of lines to extract:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4 mt-4">
                    <input
                        type="number"
                        className="input input-bordered w-full sm:w-auto"
                        min="1"
                        value={lineCount}
                        onChange={(e) => setLineCount(Number(e.target.value))}
                        placeholder="Number of lines"
                    />
                </div>
                <SubmitButton
                    text={"Extract Lines"}
                    handleClick={handleTextTransformation}
                    className="w-full sm:w-auto"
                />
                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`${textResult}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Extract First n Lines</h2>
                    <p>
                        This tool <b>Extract First n Lines</b> is a useful
                        utility for anyone looking to quickly extract the first
                        few lines from a block of text. Whether you need to
                        preview the beginning of a document, truncate text, or
                        work with data entries, this tool allows you to easily
                        extract the specified number of lines.
                    </p>
                </div>
            </div>
        </>
    )
}
