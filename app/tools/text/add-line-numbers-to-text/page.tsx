"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const addLineNumbers = () => {
        const text = textarea.current?.value

        // Check if the text is empty
        setIsEmpty(Boolean(!text?.trim().length))

        if (text !== undefined) {
            // Add line numbers to each line of the text
            const numberedLines = text
                ?.split(/\n/)
                .map((line, index) => `${index + 1}: ${line}`)
                .join("\n")

            // Set the result
            setTextResult(numberedLines)
        }

        // Show the alert
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Add Line Numbers to Text"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Add Line Numbers to Text</h1>
                <p>
                    Paste the text in the following input to get the resulting
                    text with line numbers added:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Add Line Numbers"}
                    handleClick={addLineNumbers}
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
                    <h2>About Add Line Numbers to Text</h2>
                    <p>
                        This tool <b>Add Line Numbers to Text</b> is a practical
                        utility for anyone looking to number the lines of their
                        text. Whether you're editing documents, writing code, or
                        organizing data, this tool helps you achieve a more
                        structured format by adding line numbers to each line of
                        text.
                    </p>
                </div>
            </div>
        </>
    )
}
