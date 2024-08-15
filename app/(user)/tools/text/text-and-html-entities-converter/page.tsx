"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"
const he = require("he")

export default function TextHtmlEntitiesConverter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [activeConversion, setActiveConversion] =
        useState<string>("textToHtmlEntities")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text & HTML Entities Converter"]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveConversion(e.target.id)
    }

    const convertText = () => {
        if (!textarea.current) return

        const text = textarea.current.value
        let convertedText: string

        try {
            if (activeConversion === "textToHtmlEntities") {
                convertedText = textToHtmlEntities(text)
            } else if (activeConversion === "htmlEntitiesToText") {
                convertedText = htmlEntitiesToText(text)
            } else {
                convertedText = text
            }
        } catch (error) {
            convertedText = "Conversion Error: Invalid input"
        }

        setTextResult(convertedText)
        setShowAlert(true)
        setIsEmpty(convertedText.length === 0)
        scrollToAlert()
    }

    const textToHtmlEntities = (str: string) => {
        return he.encode(str, { useNamedReferences: true })
    }

    const htmlEntitiesToText = (str: string) => {
        return he.decode(str)
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
                <h1>Text & HTML Entities Converter</h1>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text or HTML entities here"
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
                                    id="textToHtmlEntities"
                                    onChange={handleRadioChange}
                                    checked={
                                        activeConversion ===
                                        "textToHtmlEntities"
                                    }
                                />
                                <label htmlFor="textToHtmlEntities">
                                    Convert Text to HTML Entities
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
                                    id="htmlEntitiesToText"
                                    onChange={handleRadioChange}
                                    checked={
                                        activeConversion ===
                                        "htmlEntitiesToText"
                                    }
                                />
                                <label htmlFor="htmlEntitiesToText">
                                    Convert HTML Entities to Text
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
                    <h2>About Text & HTML Entities Converter</h2>
                    <p>
                        This tool, <b>Text & HTML Entities Converter</b>, allows
                        you to easily convert between plain text and HTML
                        entities. Whether you&apos;re encoding text for HTML or
                        decoding HTML entities back to plain text, this tool
                        provides a simple interface for your conversion needs.
                    </p>
                </div>
            </div>
        </>
    )
}
