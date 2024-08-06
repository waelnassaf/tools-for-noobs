"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const shuffleLines = () => {
        const text = textarea.current?.value

        // Check if the text is empty
        setIsEmpty(Boolean(!text?.trim().length))

        if (text !== undefined) {
            // Shuffle lines
            const lines = text.split(/\n/)
            for (let i = lines.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[lines[i], lines[j]] = [lines[j], lines[i]]
            }
            const shuffledLines = lines.join("\n")

            // Set the result
            setTextResult(shuffledLines)
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

    const pages = ["Home", "Text Tools", "Shuffle Text Lines"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Shuffle Text Lines</h1>
                <p>
                    Paste the text in the following input to get the resulting
                    text with lines shuffled:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Shuffle Lines"}
                    handleClick={shuffleLines}
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
                    <h2>About Shuffle Text Lines</h2>
                    <p>
                        This tool <b>Shuffle Text Lines</b> is a handy utility
                        for programmers, writers, or just data entry people
                        looking to shuffle lines of text. Whether you&apos;re
                        dealing with lists, content, or data entries, this tool
                        helps randomize your text, leaving you with a shuffled
                        version of your content.
                    </p>
                </div>
            </div>
        </>
    )
}
