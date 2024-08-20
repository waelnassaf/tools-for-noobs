"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function RemoveArabicTextPunctuation() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Remove Arabic Text Punctuation"]

    const handleTextTransformation = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value
            // Remove Arabic text punctuation from the text
            const transformedText = text.replace(/[!؟.,،:]/g, "")
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
                <h1>Remove Arabic Text Punctuation</h1>
                <p>
                    Paste the text in the following input to remove all Arabic
                    punctuation:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Remove Arabic Text Punctuation"}
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
                    <h2>About Remove Arabic Text Punctuation</h2>
                    <p>
                        This tool <b>Remove Arabic Text Punctuation</b> is a
                        useful utility for anyone needing to strip Arabic
                        punctuation marks from a block of text. It helps in
                        cleaning up text for processing or standardization by
                        removing specific punctuation marks.
                    </p>
                </div>
            </div>
        </>
    )
}
