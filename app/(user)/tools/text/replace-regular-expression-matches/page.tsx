"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function ReplaceRegexMatches() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)
    const regexInput = useRef<HTMLInputElement>(null)
    const replacementInput = useRef<HTMLInputElement>(null)

    const pages = ["Home", "Text Tools", "Replace Regular Expression Matches"]

    const applyReplacement = () => {
        if (
            !textarea.current ||
            !regexInput.current ||
            !replacementInput.current
        )
            return

        const text = textarea.current.value
        const regexPattern = regexInput.current.value
        const replacement = replacementInput.current.value

        try {
            const sanitizedPattern = regexPattern.replace(/^\/|\/$/g, "")
            const regex = new RegExp(sanitizedPattern, "gi")
            const result = text.replace(regex, replacement)

            setTextResult(result)
            setIsEmpty(result.length === 0)
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
                <h1>Replace Regular Expression Matches</h1>

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
                                (Enter a regular expression pattern. You can use
                                forward slashes, e.g., /pattern/)
                            </span>
                        </div>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text flex justify-center items-center gap-4">
                                <label htmlFor="replacementInput">
                                    Replacement
                                </label>
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter replacement text"
                            className="input input-bordered w-full max-w-xs"
                            ref={replacementInput}
                        />
                        <div className="label">
                            <span className="label-text-alt text-gray-500">
                                (Enter the text that will replace the regex
                                matches)
                            </span>
                        </div>
                    </label>
                </div>

                <SubmitButton
                    text={"Replace"}
                    handleClick={applyReplacement}
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
                    <h2>About Replace Regular Expression Matches</h2>
                    <p className="mb-4">
                        This tool{" "}
                        <strong>Replace Regular Expression Matches</strong>{" "}
                        allows you to replace text matches in the original text
                        based on a specified regular expression pattern and
                        replacement string.
                    </p>
                    <p className="mb-4">It provides the following options:</p>
                    <ul className="list-disc list-inside mb-4">
                        <li>
                            Enter a regular expression to match specific text
                            patterns.
                        </li>
                        <li>
                            Enter a replacement string to replace the matched
                            patterns.
                        </li>
                    </ul>
                    <p>
                        This is a simple yet powerful tool for replacing text
                        using regex patterns.
                    </p>
                </div>
            </div>
        </>
    )
}
