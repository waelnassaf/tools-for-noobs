"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function ParagraphCounter() {
    const [paragraphCount, setParagraphCount] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const countParagraphs = () => {
        const text = textarea.current?.value.trim() || ""
        const paragraphs = text.split(/\n\s*\n/).filter(Boolean) // Split by one or more empty lines and filter out empty paragraphs
        setIsEmpty(text.length === 0)
        setParagraphCount(paragraphs.length)
        setShowAlert(true)

        // Ensure the alert div is scrolled into view after state update
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Paragraph Counter"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Paragraph Counter</h1>
                <p>
                    Paste the text in the following input to get the paragraph
                    count:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>
                <SubmitButton
                    text={"Count Paragraphs"}
                    handleClick={countParagraphs}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`Number of Paragraphs: ${paragraphCount}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>
                        About <b>Paragraph Counter</b>
                    </h2>
                    <p>
                        This tool <b>Paragraph Counter</b> is used by people who
                        want a quick way to determine the number of paragraphs
                        in a specific text.
                    </p>
                    <h2>
                        Who would use <b>Paragraph Counter</b>?
                    </h2>
                    <ul>
                        <li>
                            <b>Writers:</b> Writers who want to gauge the
                            structure and length of their text.
                        </li>
                        <li>
                            <b>Editors:</b> Editors who need to analyze the
                            paragraph structure of documents.
                        </li>
                        <li>
                            <b>Students:</b> Students who need to ensure their
                            essays and reports meet paragraph requirements.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
