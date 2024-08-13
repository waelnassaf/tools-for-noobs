"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function HexUtf8Converter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [activeConversion, setActiveConversion] =
        useState<string>("utf8ToHex")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Hex & UTF-8 Converter"]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveConversion(e.target.id)
    }

    const convertText = () => {
        if (!textarea.current) return

        const text = textarea.current.value
        let convertedText: string

        if (activeConversion === "utf8ToHex") {
            convertedText = utf8ToHex(text)
        } else if (activeConversion === "hexToUtf8") {
            try {
                convertedText = hexToUtf8(text)
            } catch (error) {
                convertedText = "Invalid Hex string"
            }
        } else {
            convertedText = text
        }

        setTextResult(convertedText)
        setShowAlert(true)
        setIsEmpty(convertedText.length === 0)
        scrollToAlert()
    }

    const utf8ToHex = (str: string) => {
        const encoder = new TextEncoder()
        const bytes = encoder.encode(str)
        let hex = ""
        for (let i = 0; i < bytes.length; i++) {
            hex += bytes[i].toString(16).padStart(2, "0")
        }
        return hex
    }

    const hexToUtf8 = (hex: string) => {
        // Remove '0x' prefixes and split by spaces
        const bytes = hex
            .replace(/0x/g, "")
            .split(" ")
            .map((byte) => parseInt(byte, 16))
        const decoder = new TextDecoder()
        return decoder.decode(new Uint8Array(bytes))
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
                <h1>Hex & UTF-8 Converter</h1>

                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
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
                                    id="utf8ToHex"
                                    onChange={handleRadioChange}
                                    checked={activeConversion === "utf8ToHex"}
                                />
                                <label htmlFor="utf8ToHex">
                                    Convert UTF-8 to Hex
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
                                    id="hexToUtf8"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="hexToUtf8">
                                    Convert Hex to UTF-8
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
                    <h2>About Hex & UTF-8 Converter</h2>
                    <p>
                        This tool, <b>Hex & UTF-8 Converter</b>, allows you to
                        easily convert text between Hexadecimal and UTF-8
                        encoding. Whether you&apos;re a developer working with
                        low-level data encoding or just need to switch between
                        text formats, this tool provides a simple interface for
                        your conversion needs.
                    </p>
                </div>
            </div>
        </>
    )
}
