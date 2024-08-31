"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function EscapeText() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Escape Text"]

    const handleTextTransformation = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value
            const transformedText = JSON.stringify(text).slice(1, -1) // Escape using JSON.stringify
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
                <h1>Escape Text</h1>
                <p>
                    Paste the text in the following input to escape special
                    characters like tabs and newlines:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Escape Text"}
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
                    <h2>About Escape Text</h2>
                    <p>
                        This tool <b>Escape Text</b> uses a streamlined approach
                        to escape special characters in text. By leveraging the
                        built-in <code>JSON.stringify</code> function, it
                        automatically handles escaping for a wide range of
                        characters, including backslashes, double quotes, single
                        quotes, and more. This method is both powerful and
                        reliable, making it ideal for developers and writers who
                        need to ensure that their text is safely processed in
                        programming or data contexts.
                    </p>
                </div>
            </div>
        </>
    )
}
