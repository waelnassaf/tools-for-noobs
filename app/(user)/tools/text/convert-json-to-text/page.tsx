"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function JsonToTextConverter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "JSON to Text Converter"]

    const convertJsonToText = () => {
        if (!textarea.current) return

        const jsonText = textarea.current.value
        let convertedText: string

        try {
            const jsonObject = JSON.parse(jsonText)
            convertedText = jsonToText(jsonObject)
        } catch (error) {
            convertedText = "Invalid JSON input"
        }

        setTextResult(convertedText)
        setShowAlert(true)
        setIsEmpty(convertedText.length === 0)
        scrollToAlert()
    }

    const jsonToText = (jsonObject: object, prefix = ""): string => {
        let textResult = ""
        for (const [key, value] of Object.entries(jsonObject)) {
            if (typeof value === "object" && value !== null) {
                textResult += `${prefix}${key}\n`
                textResult += jsonToText(value, prefix + "")
            } else {
                textResult += `${prefix}${key} ${value}\n`
            }
        }
        return textResult.trim()
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
                <h1>JSON to Text Converter</h1>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste JSON here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Convert"}
                    handleClick={convertJsonToText}
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
                    <h2>About JSON to Text Converter</h2>
                    <p>
                        This tool, <b>JSON to Text Converter</b>, allows you to
                        easily convert JSON objects into a readable text format.
                        Whether you&apos;re working with structured data or need
                        to quickly extract information, this tool provides a
                        simple interface for your conversion needs.
                    </p>
                </div>
            </div>
        </>
    )
}
