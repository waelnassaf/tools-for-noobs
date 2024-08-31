"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"
var sprintf = require("sprintf-js").sprintf

export default function PrintfOrSprintfText() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const formatInput = useRef<HTMLInputElement>(null)
    const numbersInput = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Printf or Sprintf Text"]

    const handleTextTransformation = () => {
        setIsEmpty(
            Boolean(
                !formatInput.current?.value.trim().length ||
                    !numbersInput.current?.value.trim().length
            )
        )
        setShowAlert(true)
        if (formatInput.current && numbersInput.current) {
            const format = formatInput.current.value.trim()
            const numbers = numbersInput.current.value.trim().split(/\s+/) // Split by any whitespace
            const transformedText = numbers
                .map((number) => sprintf(format, Number(number)))
                .join("\n")
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
                <h1>Printf or Sprintf Text</h1>
                <p>
                    Enter the format string and the list of numbers to format
                    the numbers according to the provided format:
                </p>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Enter numbers (one per line)"
                    ref={numbersInput}
                ></textarea>

                <label className="form-control w-full max-w-xs mt-5">
                    <div className="label">
                        <span className="label-text flex justify-center items-center gap-4">
                            <label htmlFor="regexInput">Sprintf format</label>
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter format string, e.g., %04d"
                        className="input input-bordered w-full max-w-xs"
                        ref={formatInput}
                    />
                    <div className="label">
                        <span className="label-text-alt text-gray-500">
                            (specify the sprintf format, e.g., %.2f)
                        </span>
                    </div>
                </label>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Format Text"}
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
                    <h2>About Printf or Sprintf Text</h2>
                    <p>
                        The <b>Printf or Sprintf Text</b> tool allows you to
                        format a list of numbers using the familiar{" "}
                        <code>printf</code> or <code>sprintf</code> format
                        specifiers, similar to those used in languages like C
                        and Python. Just provide a format string and a list of
                        numbers, and the tool will output the formatted results.
                        Whether you need to zero-pad numbers, format them as
                        hexadecimal, or apply any other formatting, this tool
                        makes it easy.
                    </p>
                </div>
            </div>
        </>
    )
}
