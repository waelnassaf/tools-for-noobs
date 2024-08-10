"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"
var ascii85 = require("ascii85")

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Ascii85 Text Encoder and Decoder"]

    const handleTextTransformation = (transformationType: string) => {
        if (textarea.current) {
            const text = textarea.current.value
            let transformedText: string

            switch (transformationType) {
                case "encode":
                    transformedText = ascii85.encode(text).toString()
                    break
                case "decode":
                    try {
                        transformedText = ascii85.decode(text).toString() // Decode using base85
                    } catch (e) {
                        transformedText = "Invalid Ascii85 string"
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
                <h1>Ascii85 Text Encoder and Decoder</h1>
                <p>
                    Paste the text in the following input to encode or decode it
                    into/from Ascii85 format:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap gap-4">
                    <SubmitButton
                        text={"Encode to Ascii85"}
                        handleClick={() => handleTextTransformation("encode")}
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Decode from Ascii85"}
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
                    <h2>About Ascii85 Text Encoder and Decoder</h2>
                    <p>
                        This tool, <b>Ascii85 Text Encoder and Decoder</b>, is a
                        handy utility for encoding text into Ascii85 format and
                        decoding Ascii85 text back to its original form. Whether
                        you&apos;re a programmer, data analyst, or just dealing
                        with text transformations, this tool helps you
                        effortlessly convert text to and from Ascii85.
                    </p>
                </div>
            </div>
        </>
    )
}
