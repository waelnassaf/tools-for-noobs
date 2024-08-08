"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function ExtractEmails() {
    const [emailResult, setEmailResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Extract Emails"]

    const handleEmailExtraction = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value
            const extractedEmails = text.match(
                /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
            )
            setEmailResult(
                extractedEmails
                    ? extractedEmails.join("\n")
                    : "No emails found."
            )
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
                <h1>Extract Emails</h1>
                <p>
                    Paste the text in the following input to extract any email
                    addresses contained within it:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Extract Emails"}
                        handleClick={handleEmailExtraction}
                        className="w-full sm:w-auto"
                    />
                </div>

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`${emailResult}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Extract Emails</h2>
                    <p>
                        The <b>Extract Emails</b> tool is a simple and efficient
                        utility for identifying and extracting email addresses
                        from a block of text. Just paste your text, and the tool
                        will find and display any email addresses present.
                    </p>
                </div>
            </div>
        </>
    )
}
