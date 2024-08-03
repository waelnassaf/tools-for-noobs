"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function AlignTextColumns() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Align Text Columns"]

    const handleTextTransformation = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value.trim()
            const lines = text.split("\n").map((line) => line.trim())

            // Determine the max width for each column
            const columnWidths = lines.reduce((widths, line) => {
                line.split(/\s+/).forEach((word, index) => {
                    widths[index] = Math.max(widths[index] || 0, word.length)
                })
                return widths
            }, [] as number[])

            // Transform each line by padding each word to the column width
            const transformedText = lines
                .map((line) => {
                    return line
                        .split(/\s+/)
                        .map((word, index) => {
                            return word.padEnd(columnWidths[index], " ")
                        })
                        .join(" ")
                })
                .join("\n")

            setTextResult(transformedText)
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
                <h1>Align Text Columns</h1>
                <p>
                    Paste the text with columns separated by spaces to get the
                    properly padded table:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Align Text Columns"}
                        handleClick={handleTextTransformation}
                        className="w-full sm:w-auto"
                    />
                </div>

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={textResult}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                    additionalStyling="font-mono whitespace-pre"
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Align Text Columns</h2>
                    <p>
                        This tool <b>Align Text Columns</b> helps you format
                        text columns into a properly padded table. Whether
                        you&apos;re working with text data, code, or lists, this
                        tool ensures your columns are neatly aligned, making
                        your text easier to read and manage.
                    </p>
                </div>
            </div>
        </>
    )
}
