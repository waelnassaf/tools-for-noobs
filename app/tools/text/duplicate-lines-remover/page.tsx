"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const removeDupLines = () => {
        const text = textarea.current?.value

        // Check if the text is empty
        setIsEmpty(Boolean(!text?.trim().length))

        if (text !== undefined) {
            // Remove duplicate lines while preserving line breaks
            const uniqueLines = text
                ?.split(/\n/)
                .filter((line, index, lines) => lines.indexOf(line) === index)
                .join("\n")

            // Set the result
            setTextResult(uniqueLines)
        }

        // Show the alert
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }
    const pages = ["Home", "Text Tools", "Duplicate Lines Remover"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Duplicate Lines Remover</h1>
                <p>
                    Paste the text in the following input to get the resulting
                    text with duplicate lines removed:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Remove Duplicate Lines"}
                    handleClick={removeDupLines}
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

                <div>
                    <h2>About Duplicate Lines Remover</h2>
                    <p>
                        This tool <b>Duplicate Lines Remover</b> is a handy
                        utility for programmers, writers or just data entry
                        people looking to remove duplicate lines from a certain
                        text. Whether you&apos;re dealing with duplicated
                        content, lists, or data entries, this tool helps
                        streamline your text by removing redundant lines,
                        leaving you with clean and unique content.
                    </p>
                </div>
            </div>
        </>
    )
}
