"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const findShortestLine = () => {
        const text = textarea.current?.value

        // Check if the text is empty
        setIsEmpty(Boolean(!text?.trim().length))

        if (text !== undefined) {
            // Find the shortest line in the text
            const shortestLine = text?.split(/\n/).reduce(
                (shortest, current) =>
                    current.length < shortest.length && current.trim()
                        ? current
                        : shortest,
                text.split(/\n/)[0] // Initialize with the first line
            )

            // Set the result
            setTextResult(shortestLine)
        }

        // Show the alert
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Find Shortest Line"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Find Shortest Line In A Text</h1>
                <p>
                    Paste the text in the following input to get the shortest
                    line:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Find Shortest Line"}
                    handleClick={findShortestLine}
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
                    <h2>About Find Shortest Line</h2>
                    <p>
                        This tool <b>Find Shortest Line In A Text</b> is a
                        practical utility for anyone looking to identify the
                        shortest line in their text. Whether you're analyzing
                        logs, reviewing code, or examining any form of text,
                        this tool helps you quickly find the shortest single
                        line, aiding in various text-processing tasks.
                    </p>
                </div>
            </div>
        </>
    )
}
