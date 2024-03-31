"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const removeEmptyLines = () => {
        const text = textarea.current?.value

        // Check if the text is empty
        setIsEmpty(Boolean(!text?.trim().length))

        if (text !== undefined) {
            // Remove empty lines while preserving non-empty lines
            const nonEmptyLines = text
                ?.split(/\n/)
                .filter((line) => line.trim().length > 0)
                .join("\n")

            // Set the result
            setTextResult(nonEmptyLines)
        }

        // Show the alert
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }
    const pages = ["Home", "Text Tools", "Empty Lines Remover"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Empty Lines Remover</h1>
                <p>
                    Paste the text in the following input to get the resulting
                    text with empty lines removed:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Remove Empty Lines"}
                    handleClick={removeEmptyLines}
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
                    <h2>About Empty Lines Remover</h2>
                    <p>
                        This tool <b>Empty Lines Remover</b> is a practical
                        utility for anyone looking to clean up their text by
                        removing all empty lines. Whether you&apos;re refining
                        code, editing documents, or cleaning up data, this tool
                        helps you achieve a more compact and readable format by
                        eliminating unnecessary blank space.
                    </p>
                </div>
            </div>
        </>
    )
}
