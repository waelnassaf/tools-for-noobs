"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

// UTF-16 encoding function
const encode = (text: string): string => {
    // Convert the string to an array of UTF-16 code units
    const codeUnits = Array.from(text).map((char) => char.charCodeAt(0))
    // Convert the code unit array to a string with '\u{xxxx}' format for each code unit
    return codeUnits
        .map((codeUnit) => `\\u{${codeUnit.toString(16).padStart(4, "0")}}`)
        .join("")
}

// UTF-16 decoding function
const decode = (encodedText: string): string => {
    // Convert the \u{xxxx} prefixed string to an array of UTF-16 code units
    const codeUnitArray = (
        encodedText.match(/\\u\{([0-9a-fA-F]{4})\}/g) || []
    ).map((hex) => parseInt(hex.replace("\\u{", "").replace("}", ""), 16))
    // Convert the array of code units to a string
    return String.fromCharCode(...codeUnitArray)
}

export default function UTF16EncoderDecoder() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [operation, setOperation] = useState<string>("encode")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "UTF-16 Text Encoder and Decoder"]

    const handleOperationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOperation(e.target.value)
    }

    const handleTextTransformation = () => {
        if (textarea.current) {
            const text = textarea.current.value
            let transformedText: string

            if (operation === "encode") {
                transformedText = encode(text)
            } else {
                transformedText = decode(text)
            }

            setTextResult(transformedText)
            setIsEmpty(transformedText.length === 0)
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
                <h1>UTF-16 Text Encoder and Decoder</h1>
                <p>Select an operation and paste your text below:</p>
                <div className="w-full md:w-1/3 space-y-3 my-4">
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                            <span className="label-text">Encode</span>
                            <input
                                type="radio"
                                name="operation"
                                value="encode"
                                checked={operation === "encode"}
                                onChange={handleOperationChange}
                                className="radio radio-primary"
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                            <span className="label-text">Decode</span>
                            <input
                                type="radio"
                                name="operation"
                                value="decode"
                                checked={operation === "decode"}
                                onChange={handleOperationChange}
                                className="radio radio-secondary"
                            />
                        </label>
                    </div>
                </div>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder={
                        operation === "encode"
                            ? "Enter text to encode..."
                            : "Enter \\u{xxxx} prefixed UTF-16 code units to decode..."
                    }
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={operation === "encode" ? "Encode" : "Decode"}
                    handleClick={handleTextTransformation}
                    className="w-full sm:w-auto"
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={textResult}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About UTF-16 Text Encoder and Decoder</h2>
                    <p>
                        This tool <b>UTF-16 Text Encoder and Decoder</b> is
                        essential for encoding text into UTF-16 format and
                        decoding UTF-16 encoded data back into readable text.
                        UTF-16 encoding is often used in environments that
                        require support for a wide range of characters, such as
                        certain programming languages and file formats.
                    </p>
                </div>
            </div>
        </>
    )
}
