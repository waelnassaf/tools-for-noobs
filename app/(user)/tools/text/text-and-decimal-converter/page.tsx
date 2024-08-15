"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TextDecimalConverter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [activeConversion, setActiveConversion] =
        useState<string>("textToDecimal")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text & Decimal Converter"]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveConversion(e.target.id)
    }

    const convertText = () => {
        if (!textarea.current) return

        const text = textarea.current.value
        let convertedText: string

        if (activeConversion === "textToDecimal") {
            convertedText = textToDecimal(text)
        } else if (activeConversion === "decimalToText") {
            try {
                convertedText = decimalToText(text)
            } catch (error) {
                convertedText = "Invalid Decimal input"
            }
        } else {
            convertedText = text
        }

        setTextResult(convertedText)
        setShowAlert(true)
        setIsEmpty(convertedText.length === 0)
        scrollToAlert()
    }

    // Updated textToDecimal function to handle emojis and multi-byte characters
    const textToDecimal = (str: string) => {
        return Array.from(str)
            .map((char) => {
                return char.codePointAt(0)?.toString(10)
            })
            .join(" ")
    }

    // Updated decimalToText function to handle emojis and multi-byte characters
    const decimalToText = (decimal: string) => {
        return decimal
            .split(" ")
            .map((code) => String.fromCodePoint(parseInt(code, 10)))
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
                <h1>Text & Decimal Converter</h1>

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
                                    id="textToDecimal"
                                    onChange={handleRadioChange}
                                    checked={
                                        activeConversion === "textToDecimal"
                                    }
                                />
                                <label htmlFor="textToDecimal">
                                    Convert Text to Decimal
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
                                    id="decimalToText"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="decimalToText">
                                    Convert Decimal to Text
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
                    <h2>About Text & Decimal Converter</h2>
                    <p>
                        This tool, <b>Text & Decimal Converter</b>, allows you
                        to easily convert between plain text and decimal code.
                        Whether you&apos;re working on encoding projects or need
                        to switch between text and decimal formats, this tool
                        provides a simple interface for your conversion needs.
                    </p>
                </div>
            </div>
        </>
    )
}
