"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

const TextWrapTool = () => {
    const [wrappedText, setWrappedText] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [wrapOption, setWrapOption] = useState("word")
    const [wrapWidth, setWrapWidth] = useState<number>(80)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text Wrap"]

    const applyWrapping = () => {
        if (textarea.current) {
            let text = textarea.current.value
            let wrapped = ""

            switch (wrapOption) {
                case "word":
                    wrapped = wordWrap(text, wrapWidth)
                    break
                case "character":
                    wrapped = characterWrap(text, wrapWidth)
                    break
                default:
                    break
            }

            setWrappedText(wrapped)
            setShowAlert(true)
            setTimeout(() => {
                alertDiv.current?.scrollIntoView({ behavior: "smooth" })
            }, 0)
        }
    }

    const wordWrap = (text: string, maxWidth: number): string => {
        let lines = []
        let words = text.split(" ")
        let line = ""

        for (let word of words) {
            if ((line + word).length <= maxWidth) {
                line += word + " "
            } else {
                lines.push(line.trim())
                line = word + " "
            }
        }
        lines.push(line.trim())

        return lines.join("\n")
    }

    const characterWrap = (text: string, maxWidth: number): string => {
        let lines = []
        for (let i = 0; i < text.length; i += maxWidth) {
            lines.push(text.substring(i, i + maxWidth))
        }
        return lines.join("\n")
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Text Wrap</h1>
                <p>Select the wrapping options and paste your text below:</p>
                <div className="form-control w-full md:w-1/3 my-4">
                    {["word", "character"].map((option) => (
                        <label
                            className="label cursor-pointer space-x-2"
                            key={option}
                        >
                            <span className="label-text">
                                {option.charAt(0).toUpperCase() +
                                    option.slice(1)}
                            </span>
                            <input
                                type="radio"
                                name="wrapOption"
                                value={option}
                                checked={wrapOption === option}
                                onChange={() => setWrapOption(option)}
                                className="radio radio-primary"
                            />
                        </label>
                    ))}
                </div>

                <div className="form-control w-full md:w-1/3 my-4">
                    <label className="label">
                        <span className="label-text">Wrap Width</span>
                        <input
                            type="number"
                            className="input input-bordered"
                            value={wrapWidth}
                            onChange={(e) =>
                                setWrapWidth(parseInt(e.target.value))
                            }
                            min="1"
                        />
                    </label>
                </div>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Wrap"}
                    handleClick={applyWrapping}
                    className="w-full sm:w-auto"
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={wrappedText.length === 0}
                    message={`${wrappedText}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Text Wrap</h2>
                    <div>
                        <p>
                            The <strong>Text Wrap</strong> is a free tool for
                            wrapping text based on word or character count.
                        </p>
                        <p>
                            There are two options for wrapping text: by word and
                            by character. You can specify the wrap width to
                            control how the text is wrapped.
                        </p>
                        <p>
                            This tool is useful for formatting text for various
                            use cases, ensuring readability and proper text
                            alignment.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TextWrapTool
