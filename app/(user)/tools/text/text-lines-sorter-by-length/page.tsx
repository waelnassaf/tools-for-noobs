"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TextLinesSorterByLength() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text Lines Sorter By Length"]

    const handleTextSorting = (order: "ascending" | "descending") => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)

        if (textarea.current) {
            const text = textarea.current.value
            const lines = text.split("\n")
            const sortedLines = lines.sort((a, b) =>
                order === "ascending"
                    ? a.length - b.length
                    : b.length - a.length
            )
            setTextResult(sortedLines.join("\n"))
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
                <h1>Text Lines Sorter By Length</h1>
                <p>
                    Paste the text in the following input to sort the lines by
                    length:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap gap-4">
                    <SubmitButton
                        text={"Ascending"}
                        handleClick={() => handleTextSorting("ascending")}
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Descending"}
                        handleClick={() => handleTextSorting("descending")}
                        className="w-full sm:w-auto"
                    />
                </div>

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
                    <h2>About Text Lines Sorter By Length</h2>
                    <p>
                        This tool <b>Text Lines Sorter By Length</b> is a useful
                        utility for anyone needing to sort lines of text by
                        their length. Whether you&apos;re organizing data,
                        formatting a document, or just cleaning up text, this
                        tool helps you easily sort the lines from shortest to
                        longest or vice versa.
                    </p>
                </div>
            </div>
        </>
    )
}
