"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function GrepTool() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)
    const regexInput = useRef<HTMLInputElement>(null)
    const invertMatchInput = useRef<HTMLInputElement>(null)
    const ignoreCaseInput = useRef<HTMLInputElement>(null)
    const lineNumberInput = useRef<HTMLInputElement>(null)
    const onlyMatchingInput = useRef<HTMLInputElement>(null)
    const wholeLineInput = useRef<HTMLInputElement>(null)

    const pages = ["Home", "Text Tools", "Grep Tool"]

    const applyGrep = () => {
        if (!textarea.current || !regexInput.current) return

        const text = textarea.current.value.split("\n")
        const regexPattern = regexInput.current.value
        const flags = `${ignoreCaseInput.current?.checked ? "i" : ""}`
        const regex = new RegExp(
            wholeLineInput.current?.checked
                ? `^${regexPattern}$`
                : regexPattern,
            flags
        )

        const matches = text
            .map((line, index) => {
                if (invertMatchInput.current?.checked) {
                    if (regex.test(line)) return null
                    return line
                } else {
                    if (onlyMatchingInput.current?.checked) {
                        const match = line.match(regex)
                        return match ? match[0] : null
                    } else {
                        return regex.test(line) ? line : null
                    }
                }
            })
            .filter(Boolean) // Remove null values

        const formattedResult = matches
            .map((line, index) =>
                lineNumberInput.current?.checked
                    ? `${index + 1}: ${line}`
                    : line
            )
            .join("\n")

        setTextResult(formattedResult || "No matches found")
        setIsEmpty(!formattedResult.length)
        setShowAlert(true)
        scrollToAlert()
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
                <h1>Grep Tool</h1>

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
                                (Match text by a given regular expression
                                pattern. Enter without forward slashes. e.g.,
                                [0-9a-f]+)
                            </span>
                        </div>
                    </label>

                    <div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label cursor-pointer">
                                <span className="label-text">
                                    Invert Match (Display Non-Matching Lines)
                                </span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    ref={invertMatchInput}
                                />
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label cursor-pointer">
                                <span className="label-text">Ignore Case</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-secondary"
                                    ref={ignoreCaseInput}
                                />
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label cursor-pointer">
                                <span className="label-text">
                                    Line Number (as Output Prefix of Each Line)
                                </span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-accent"
                                    ref={lineNumberInput}
                                />
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label cursor-pointer">
                                <span className="label-text">
                                    Only Matching (Print only the part of
                                    matching lines that actually matches
                                    PATTERN)
                                </span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    ref={onlyMatchingInput}
                                />
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label cursor-pointer">
                                <span className="label-text">
                                    Whole Line (Select only those matches that
                                    exactly match the whole line)
                                </span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-secondary"
                                    ref={wholeLineInput}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <SubmitButton
                    text={"Apply Grep"}
                    handleClick={applyGrep}
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
                    <h2>About Grep Tool</h2>
                    <p className="mb-4">
                        The <strong>Grep Tool</strong> allows you to search and
                        filter text based on a regular expression pattern,
                        similar to the Unix `grep` command. With options to
                        invert matches, ignore case, add line numbers, and more,
                        this tool provides a flexible and powerful way to
                        process text.
                    </p>
                    <p>
                        Whether you&apos;re working with logs, code, or any text
                        data, this tool helps you quickly find and extract the
                        information you need.
                    </p>
                </div>
            </div>
        </>
    )
}
