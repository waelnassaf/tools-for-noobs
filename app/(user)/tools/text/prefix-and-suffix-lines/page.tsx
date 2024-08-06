"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const prefixInput = useRef<HTMLInputElement>(null)
    const suffixInput = useRef<HTMLInputElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const addPrefixSuffix = () => {
        const text = textarea.current?.value
        const prefix = prefixInput.current?.value || ""
        const suffix = suffixInput.current?.value || ""

        // Check if the text is empty
        setIsEmpty(Boolean(!text?.trim().length))

        if (text !== undefined) {
            // Add prefix and suffix to each line of the text
            const modifiedLines = text
                .split(/\n/)
                .map((line) => `${prefix}${line}${suffix}`)
                .join("\n")

            // Set the result
            setTextResult(modifiedLines)
        }

        // Show the alert
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Prefix and Suffix Lines"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Prefix and Suffix Lines</h1>
                <p>
                    Paste the text in the following input to get the resulting
                    text with a prefix and suffix added to each line:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>
                <div className="my-4">
                    <input
                        className="input input-bordered w-full md:w-3/4"
                        placeholder="Enter prefix here"
                        ref={prefixInput}
                    />
                </div>
                <div className="my-4">
                    <input
                        className="input input-bordered w-full md:w-3/4"
                        placeholder="Enter suffix here"
                        ref={suffixInput}
                    />
                </div>
                <SubmitButton
                    text={"Add Prefix and Suffix"}
                    handleClick={addPrefixSuffix}
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
                    <h2>About Prefix and Suffix Lines</h2>
                    <p>
                        This tool <b>Prefix and Suffix Lines</b> is a practical
                        utility for anyone looking to add a consistent prefix
                        and suffix to each line of their text. Whether
                        you&apos;re editing documents, writing code, or
                        organizing data, this tool helps you achieve a more
                        structured format by adding a specified prefix and
                        suffix to each line of text.
                    </p>
                </div>
            </div>
        </>
    )
}
