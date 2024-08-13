"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"
var uuencode = require("uuencode")

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "UUencode and UUdecode Text"]

    const handleTextTransformation = (transformationType: string) => {
        if (textarea.current) {
            const text = textarea.current.value
            let transformedText: string

            switch (transformationType) {
                case "encode":
                    transformedText = uuencode.encode(text)
                    break
                case "decode":
                    try {
                        transformedText = uuencode.decode(text)
                    } catch (e) {
                        transformedText = "Invalid UUencoded string"
                    }
                    break
                default:
                    transformedText = text
            }
            setTextResult(transformedText)
            setShowAlert(true)
            setIsEmpty(false)
        }
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>UUencode and UUdecode Text</h1>
                <p>
                    Paste the text in the following input to encode or decode it
                    into/from UUencoded format:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap gap-4">
                    <SubmitButton
                        text={"Encode to UUencode"}
                        handleClick={() => handleTextTransformation("encode")}
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Decode from UUencode"}
                        handleClick={() => handleTextTransformation("decode")}
                        className="w-full sm:w-auto"
                    />
                </div>

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
                    <h2>About UUencode and UUdecode Text</h2>
                    <p>
                        This tool, <b>UUencode and UUdecode Text</b>, is a handy
                        utility for encoding text into UUencoded format and
                        decoding UUencoded text back to its original form.
                        Whether you&apos;re a programmer, data analyst, or just
                        dealing with text transformations, this tool helps you
                        effortlessly convert text to and from UUencoded format.
                    </p>
                </div>
            </div>
        </>
    )
}
