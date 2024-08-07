"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function ExtractTextFromRegex() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)
    const regexInput = useRef<HTMLInputElement>(null)

    const pages = ["Home", "Text Tools", "Extract Text From Regular Expression"]

    const applyRegex = () => {
        if (!textarea.current || !regexInput.current) return

        const text = textarea.current.value
        const regexPattern = regexInput.current.value

        try {
            const sanitizedPattern = regexPattern.replace(/^\/|\/$/g, "")
            const regex = new RegExp(sanitizedPattern, "gi")
            const matches = text.match(regex)

            if (matches) {
                setTextResult(matches.join(" "))
                setIsEmpty(false)
            } else {
                setTextResult("No matches found")
                setIsEmpty(true)
            }
            setShowAlert(true)
            scrollToAlert()
        } catch (error) {
            console.error("Invalid regex pattern", error)
            setShowAlert(true)
            setTextResult("Invalid regex pattern")
            setIsEmpty(true)
            scrollToAlert()
        }
    }

    const scrollToAlert = () => {
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Extract Text From Regular Expression</h1>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <h2>Tool Settings</h2>
                <div className="tool-settings">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text flex justify-center items-center gap-4">
                                <label htmlFor="regexInput">
                                    Regex Pattern
                                </label>
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter regex pattern"
                            className="input input-bordered w-full max-w-xs"
                            ref={regexInput}
                        />
                        <div className="label">
                            <span className="label-text-alt text-gray-500">
                                (Match text by a given regular expression. Enter
                                with or without forward slashes. e.g.,
                                /[0-9a-f]+/)
                            </span>
                        </div>
                    </label>
                </div>

                <SubmitButton
                    text={"Extract"}
                    handleClick={applyRegex}
                    className="w-full sm:w-auto"
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
                    <h2>About Extract Text From Regular Expression</h2>
                    <p className="mb-4">
                        This tool{" "}
                        <strong>Extract Text From Regular Expression</strong>{" "}
                        allows you to extract text from a given input based on a
                        specified regular expression pattern.
                    </p>
                    <p className="mb-4">It provides the following options:</p>
                    <ul className="list-disc list-inside mb-4">
                        <li>
                            Enter a regular expression to match specific text
                            patterns.
                        </li>
                    </ul>
                    <p>
                        This is a simple yet powerful tool for text extraction
                        using regex patterns.
                    </p>
                </div>
            </div>
        </>
    )
}
