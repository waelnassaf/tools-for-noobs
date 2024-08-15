"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function TabsSpacesConverter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [activeConversion, setActiveConversion] =
        useState<string>("spacesToTabs")
    const [tabWidth, setTabWidth] = useState<number>(4)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Tabs & Spaces Converter"]

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveConversion(e.target.id)
    }

    const handleTabWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTabWidth(parseInt(e.target.value, 10))
    }

    const convertText = () => {
        if (!textarea.current) return

        const text = textarea.current.value
        let convertedText: string

        try {
            if (activeConversion === "spacesToTabs") {
                convertedText = spacesToTabs(text, tabWidth)
            } else if (activeConversion === "tabsToSpaces") {
                convertedText = tabsToSpaces(text, tabWidth)
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

    const spacesToTabs = (str: string, tabWidth: number) => {
        const spaces = " ".repeat(tabWidth)
        return str.replace(new RegExp(spaces, "g"), "\t")
    }

    const tabsToSpaces = (str: string, tabWidth: number) => {
        return str.replace(/\t/g, " ".repeat(tabWidth))
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
                <h1>Tabs & Spaces Converter</h1>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste your text here"
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
                                    id="spacesToTabs"
                                    onChange={handleRadioChange}
                                    checked={
                                        activeConversion === "spacesToTabs"
                                    }
                                />
                                <label htmlFor="spacesToTabs">
                                    Convert Spaces to Tabs
                                </label>
                            </span>
                        </div>
                    </label>

                    {activeConversion === "spacesToTabs" && (
                        <div className="my-4">
                            <label className="label">
                                Tab Width:
                                <input
                                    type="number"
                                    className="input input-bordered w-20 ml-2"
                                    value={tabWidth}
                                    onChange={handleTabWidthChange}
                                    min={1}
                                />
                            </label>
                        </div>
                    )}

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text flex justify-center items-center gap-4">
                                <input
                                    type="radio"
                                    name="conversionType"
                                    className="radio"
                                    id="tabsToSpaces"
                                    onChange={handleRadioChange}
                                    checked={
                                        activeConversion === "tabsToSpaces"
                                    }
                                />
                                <label htmlFor="tabsToSpaces">
                                    Convert Tabs to Spaces
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
                    additionalStyling="font-mono whitespace-pre"
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Tabs & Spaces Converter</h2>
                    <p>
                        This tool, <b>Tabs & Spaces Converter</b>, allows you to
                        easily convert between spaces and tabs in your text. You
                        can specify the tab width when converting spaces to
                        tabs, or convert tabs back to spaces for consistent
                        formatting in your code or text files.
                    </p>
                </div>
            </div>
        </>
    )
}
