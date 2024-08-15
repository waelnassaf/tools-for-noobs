"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TextHexConverter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [activeConversion, setActiveConversion] =
        useState<string>("textToHex")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text & Hex Converter"]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveConversion(e.target.id)
    }

    const convertText = () => {
        if (!textarea.current) return

        const text = textarea.current.value
        let convertedText: string

        if (activeConversion === "textToHex") {
            convertedText = textToHex(text)
        } else if (activeConversion === "hexToText") {
            try {
                convertedText = hexToText(text)
            } catch (error) {
                convertedText = "Invalid Hex input"
            }
        } else {
            convertedText = text
        }

        setTextResult(convertedText)
        setShowAlert(true)
        setIsEmpty(convertedText.length === 0)
        scrollToAlert()
    }

    // Updated textToHex function to handle emojis and multi-byte characters
    const textToHex = (str: string) => {
        return Array.from(str)
            .map((char) => {
                return char.codePointAt(0)?.toString(16)
            })
            .join(" ")
    }

    // Updated hexToText function to handle emojis and multi-byte characters
    const hexToText = (hex: string) => {
        return hex
            .split(" ")
            .map((code) => String.fromCodePoint(parseInt(code, 16)))
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
                <h1>Text & Hex Converter</h1>

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
                                    id="textToHex"
                                    onChange={handleRadioChange}
                                    checked={activeConversion === "textToHex"}
                                />
                                <label htmlFor="textToHex">
                                    Convert Text to Hex
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
                                    id="hexToText"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="hexToText">
                                    Convert Hex to Text
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
                    <h2>About Text & Hex Converter</h2>
                    <p>
                        This tool, <b>Text & Hex Converter</b>, allows you to
                        easily convert between plain text and hexadecimal code.
                        Whether you&apos;re working on encoding projects or need
                        to switch between text and hex formats, this tool
                        provides a simple interface for your conversion needs.
                    </p>
                </div>
            </div>
        </>
    )
}
