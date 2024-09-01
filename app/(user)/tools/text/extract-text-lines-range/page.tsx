"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function ExtractLinesRange() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [startLine, setStartLine] = useState<number>(1)
    const [endLine, setEndLine] = useState<number>(1)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Extract Text Lines Range"]

    const handleTextTransformation = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value
            const lines = text
                .split("\n")
                .slice(startLine - 1, endLine)
                .join("\n")
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
                <h1>Extract Text Lines Range</h1>
                <p>
                    Paste the text and specify the start and end line numbers to
                    extract a range of lines:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-start gap-4 mt-4">
                    <input
                        type="number"
                        className="input input-bordered w-full sm:w-auto"
                        min="1"
                        value={startLine}
                        onChange={(e) => setStartLine(Number(e.target.value))}
                        placeholder="Start line"
                    />
                    <input
                        type="number"
                        className="input input-bordered w-full sm:w-auto"
                        min="1"
                        value={endLine}
                        onChange={(e) => setEndLine(Number(e.target.value))}
                        placeholder="End line"
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
                    <h2>About Extract Text Lines Range</h2>
                    <p>
                        This tool <b>Extract Text Lines Range</b> allows you to
                        easily extract a specific range of lines from a block of
                        text. Whether you need to focus on a particular section
                        of a document, extract certain data, or manipulate text,
                        this tool enables you to specify both the start and end
                        line numbers and get the desired lines efficiently.
                    </p>
                </div>
            </div>
        </>
    )
}
