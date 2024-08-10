"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

// UTF-8 encoding and decoding functions
const encode = (text: string): string => {
    // Convert the string to a Uint8Array of UTF-8 bytes
    const encoder = new TextEncoder()
    const encoded = encoder.encode(text)
    // Convert the byte array to a string with '\x' prefix for each byte
    return Array.from(encoded)
        .map((byte) => `\\x${byte.toString(16).padStart(2, "0")}`)
        .join("")
}

const decode = (encodedText: string): string => {
    // Convert the \x-prefixed string to a Uint8Array
    const byteArray = new Uint8Array(
        encodedText
            .match(/\\x([0-9a-fA-F]{2})/g)
            ?.map((hex) => parseInt(hex.replace("\\x", ""), 16)) || []
    )
    // Convert the byte array to a string using TextDecoder
    const decoder = new TextDecoder()
    return decoder.decode(byteArray)
}

export default function UTF8EncoderDecoder() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [operation, setOperation] = useState<string>("encode")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "UTF-8 Text Encoder and Decoder"]

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
                <h1>UTF-8 Text Encoder and Decoder</h1>
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
                            : "Enter \\x-prefixed UTF-8 bytes to decode..."
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
                    message={`${textResult}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About UTF-8 Text Encoder and Decoder</h2>
                    <p>
                        This tool <b>UTF-8 Text Encoder and Decoder</b> is
                        essential for encoding text into UTF-8 format and
                        decoding UTF-8 encoded data back into readable text.
                        This can be useful for web development, data storage,
                        and text processing tasks where consistent and accurate
                        text encoding is crucial.
                    </p>
                </div>
            </div>
        </>
    )
}
