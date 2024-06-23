"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "XML Tags Remover"]

    const removeXmlTags = (text: string) => {
        return text.replace(/<[^>]*>/g, "")
    }

    const handleTextTransformation = () => {
        const text = textarea.current?.value
        if (text) {
            const transformedText = removeXmlTags(text).trim()
            // Split the transformed text into lines, trim each line, and join them back together
            const trimmedTransformedText = transformedText
                .split("\n")
                .map((line) => line.trim())
                .join("\n")

            setTextResult(trimmedTransformedText)
        }
        setIsEmpty(!text)
        setShowAlert(true)
        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>XML Tags Remover</h1>
                <p>Paste the text in the following input to remove XML tags:</p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Remove XML Tags"}
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
                    <h2>About XML Tags Remover</h2>
                    <p>
                        This tool <b>XML Tags Remover</b> is a handy utility for
                        programmers, writers, or anyone who wants to clean their
                        text from XML tags.
                    </p>
                </div>
            </div>
        </>
    )
}
