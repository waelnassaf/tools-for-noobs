"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TextTrimmer() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [trimOptions, setTrimOptions] = useState({
        left: false,
        right: false,
        line: false,
    })

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text Trimmer"]

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setTrimOptions((prev) => ({ ...prev, [name]: checked }))
    }

    const applyTrimming = () => {
        if (textarea.current) {
            let text = textarea.current.value

            // Process each line independently if the 'Line by Line' option is selected
            if (trimOptions.line) {
                text = text
                    .split("\n")
                    .map((line) => {
                        if (trimOptions.left) {
                            line = line.trimStart() // Trim left side of each line if selected
                        }
                        if (trimOptions.right) {
                            line = line.trimEnd() // Trim right side of each line if selected
                        }
                        return line
                    })
                    .join("\n")
            } else {
                // Apply global left or right trimming (not line by line)
                if (trimOptions.left) {
                    text = text.trimStart()
                }
                if (trimOptions.right) {
                    text = text.trimEnd()
                }
            }

            setTextResult(text)
            setIsEmpty(text.length === 0)
            setShowAlert(true)
            setTimeout(() => {
                alertDiv.current?.scrollIntoView({ behavior: "smooth" })
            }, 0)
        }
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Text Trimmer</h1>
                <p>Select the trimming options and paste your text below:</p>
                <div className="w-full md:w-1/3 space-y-3 my-4">
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                            <span className="label-text">Trim Left Side</span>
                            <input
                                type="checkbox"
                                name="left"
                                checked={trimOptions.left}
                                onChange={handleOptionChange}
                                className="toggle toggle-primary"
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                            <span className="label-text">Trim Right Side</span>
                            <input
                                type="checkbox"
                                name="right"
                                checked={trimOptions.right}
                                onChange={handleOptionChange}
                                className="toggle toggle-secondary"
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                            <span className="label-text">
                                Trim Line by Line
                            </span>
                            <input
                                type="checkbox"
                                name="line"
                                checked={trimOptions.line}
                                onChange={handleOptionChange}
                                className="toggle toggle-accent"
                                disabled={
                                    !trimOptions.left && !trimOptions.right
                                } // Disable if neither left nor right are checked
                            />
                        </label>
                    </div>
                </div>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Trim"}
                    handleClick={applyTrimming}
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

                <div>
                    <h2>About Text Trimmer</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-600">
                        <p className="mb-4">
                            This tool <strong>Text Trimmer</strong> is a simple
                            tool built for people wanting to trim their long
                            text automatically.
                        </p>
                        <p className="mb-4">It has three options:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Left</li>
                            <li>Right</li>
                            <li>Line by line</li>
                        </ul>
                        <p>
                            You can use either right or left trimming, both, or
                            check all options to trim the whole text line by
                            line for a whole left and right trim.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
