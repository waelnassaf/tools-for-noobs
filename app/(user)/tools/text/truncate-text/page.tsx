"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TruncateText() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [truncateLength, setTruncateLength] = useState<number>(0)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Truncate Text"]

    const handleTextTransformation = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value
            const truncatedText = text.slice(0, truncateLength)
            setTextResult(truncatedText)
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
                <h1>Truncate Text</h1>
                <p>
                    Paste the text in the following input to truncate it to the
                    specified length:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <input
                    type="number"
                    className="input input-bordered w-full md:w-1/4 my-4"
                    placeholder="Enter truncate length"
                    value={truncateLength}
                    onChange={(e) => setTruncateLength(Number(e.target.value))}
                />

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Truncate Text"}
                        handleClick={handleTextTransformation}
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
                    <h2>About Truncate Text</h2>
                    <p>
                        This tool <b>Truncate Text</b> is a handy utility for
                        anyone needing to shorten text to a specific length.
                        Whether you&apos;re dealing with text, lists, or data
                        entries, this tool helps you easily truncate the text to
                        the desired number of characters.
                    </p>
                </div>
            </div>
        </>
    )
}
