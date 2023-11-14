"use client"

import { useState, useRef } from "react"
import { ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [lineCount, setLineCount] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const countLines = () => {
        const lines = textarea.current?.value.split("\n")
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setLineCount(lines ? lines.length : 0)
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <div className="mt-12 padding-x padding-y max-width prose">
            <h1>Line Counter</h1>
            <p>Paste the text in the following input to get the line count:</p>
            <textarea
                className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                placeholder="Paste text here"
                ref={textarea}
            ></textarea>
            <SubmitButton text={"Count Lines"} handleClick={countLines} />

            <ResultAlert
                showAlert={showAlert}
                isEmpty={isEmpty}
                message={`Number of Lines: ${lineCount}`}
                hideAlert={() => setShowAlert(false)}
                alertDiv={alertDiv}
            />

            <div className="flex flex-col w-3/4 mx-auto my-4">
                <div className="divider"></div>
            </div>

            <div className="tool-content">
                <h2>
                    About <b>Line Counter</b>
                </h2>
                <p>
                    This tool <b>Line Counter</b> is used by people who want a
                    quick way to determine the number of lines in a specific
                    text.
                </p>
                <h2>
                    Who would use <b>Line Counter</b>?
                </h2>
                <ul>
                    <li>
                        <b>Software Developers:</b> Programmers wanting to gauge
                        the length of their code.
                    </li>
                    <li>
                        <b>Writers:</b> Writers who want to get a quick glance
                        on the complexity of their text.
                    </li>
                    <li>
                        <b>Students:</b> Some students are presented with the
                        problem to write a specific number of lines in their
                        essay so that&apos;s why they&apos;d use a line counter
                        service.
                    </li>
                </ul>
            </div>
        </div>
    )
}
