"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"
const punycode = require("punycode/")

export default function PunycodeEncoderDecoder() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [operation, setOperation] = useState<string>("encode")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Punycode Encoder and Decoder"]

    const handleOperationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOperation(e.target.value)
    }

    const handleTextTransformation = () => {
        if (textarea.current) {
            const text = textarea.current.value
            let transformedText: string

            if (operation === "encode") {
                transformedText = punycode.toASCII(text)
            } else {
                transformedText = punycode.toUnicode(text)
            }

            setTextResult(transformedText)
            setIsEmpty(transformedText.length === 0)
            setShowAlert(true)
        }
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Punycode Encoder and Decoder</h1>
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
                            ? "Enter text to encode to Punycode..."
                            : "Enter Punycode to decode..."
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
                    <h2>About Punycode Encoder and Decoder</h2>
                    <p>
                        This tool <b>Punycode Encoder and Decoder</b> is
                        essential for encoding text to Punycode format and
                        decoding Punycode data back into readable text. Punycode
                        is used to represent Internationalized Domain Names
                        (IDNs) and other non-ASCII text in ASCII-compatible
                        encoding.
                    </p>
                </div>
            </div>
        </>
    )
}
