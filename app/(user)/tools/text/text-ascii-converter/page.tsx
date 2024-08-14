"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TextAsciiConverter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [activeConversion, setActiveConversion] =
        useState<string>("textToAscii")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text & ASCII Converter"]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveConversion(e.target.id)
    }

    const convertText = () => {
        if (!textarea.current) return

        const text = textarea.current.value
        let convertedText: string

        if (activeConversion === "textToAscii") {
            convertedText = textToAscii(text)
        } else if (activeConversion === "asciiToText") {
            try {
                convertedText = asciiToText(text)
            } catch (error) {
                convertedText = "Invalid ASCII input"
            }
        } else {
            convertedText = text
        }

        setTextResult(convertedText)
        setShowAlert(true)
        setIsEmpty(convertedText.length === 0)
        scrollToAlert()
    }

    const textToAscii = (str: string) => {
        return str
            .split("")
            .map((char) => char.charCodeAt(0).toString())
            .join(" ")
    }

    const asciiToText = (ascii: string) => {
        return ascii
            .split(" ")
            .map((code) => String.fromCharCode(parseInt(code, 10)))
            .join("")
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
                <h1>Text & ASCII Converter</h1>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <h2>Conversion Settings</h2>
                <div className="conversion-settings">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text flex justify-center items-center gap-4">
                                <input
                                    type="radio"
                                    name="conversionType"
                                    className="radio"
                                    id="textToAscii"
                                    onChange={handleRadioChange}
                                    checked={activeConversion === "textToAscii"}
                                />
                                <label htmlFor="textToAscii">
                                    Convert Text to ASCII
                                </label>
                            </span>
                        </div>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text flex justify-center items-center gap-4">
                                <input
                                    type="radio"
                                    name="conversionType"
                                    className="radio"
                                    id="asciiToText"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="asciiToText">
                                    Convert ASCII to Text
                                </label>
                            </span>
                        </div>
                    </label>
                </div>

                <SubmitButton
                    text={"Convert"}
                    handleClick={convertText}
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
                    <h2>About Text & ASCII Converter</h2>
                    <p>
                        This tool, <b>Text & ASCII Converter</b>, allows you to
                        easily convert between plain text and ASCII code.
                        Whether you&apos;re working on encoding projects or need
                        to switch between text and ASCII formats, this tool
                        provides a simple interface for your conversion needs.
                    </p>
                </div>
            </div>
        </>
    )
}
