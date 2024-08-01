"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TextCaseInverter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text Case Inverter"]

    const handleTextInversion = () => {
        if (textarea.current) {
            const text = textarea.current.value
            const transformedText = Array.from(text)
                .map((char) =>
                    char === char.toUpperCase()
                        ? char.toLowerCase()
                        : char.toUpperCase()
                )
                .join("")
            setTextResult(transformedText)
            setShowAlert(true)
            setIsEmpty(false)
        }
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Text Case Inverter</h1>
                <p>
                    Paste the text in the following input to get the
                    case-inverted text:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Invert Case"}
                        handleClick={handleTextInversion}
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
                    <h2>About Text Case Inverter</h2>
                    <p>
                        This tool <b>Text Case Inverter</b> is a handy utility
                        for programmers, writers, or anyone looking to invert
                        the case of a certain text. Whether you&apos;re dealing
                        with text, lists, or data entries, this tool helps you
                        easily invert the text case.
                    </p>
                </div>
            </div>
        </>
    )
}
