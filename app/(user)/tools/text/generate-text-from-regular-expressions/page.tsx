"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"
import RandExp from "randexp" // Ensure you have randexp library installed

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [numStrings, setNumStrings] = useState<number>(1)

    const regexInput = useRef<HTMLInputElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const generateText = () => {
        const regexPattern = regexInput.current?.value

        if (!regexPattern) {
            setIsEmpty(true)
            setShowAlert(false)
            return
        }

        try {
            const randexp = new RandExp(regexPattern)
            const generatedTexts = Array.from({ length: numStrings }, () =>
                randexp.gen()
            ).join("\n")

            setIsEmpty(generatedTexts.length === 0)
            setTextResult(generatedTexts)
            setShowAlert(true)
        } catch (error) {
            setIsEmpty(true)
            setTextResult(`Error: Invalid regular expression`)
            setShowAlert(true)
        }

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = [
        "Home",
        "Text Tools",
        "Generate Text From Regular Expressions",
    ]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Generate Text From Regular Expressions</h1>
                <p>Enter a regular expression pattern to generate text:</p>
                <input
                    className="input input-bordered input-lg w-full mb-4"
                    placeholder="Enter regular expression"
                    ref={regexInput}
                />
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Number of strings?</span>
                        <span className="label-text-alt">{numStrings}</span>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max="100"
                        value={numStrings}
                        className="range range-primary"
                        onChange={(e) => setNumStrings(Number(e.target.value))}
                    />
                </label>

                <SubmitButton
                    text={"Generate Text"}
                    handleClick={generateText}
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
                    <h2>About Generate Text From Regular Expressions</h2>
                    <p>
                        This tool <b>Generate Text From Regular Expressions</b>{" "}
                        allows users to enter a regular expression pattern and
                        generate corresponding text based on that pattern.
                    </p>
                </div>
            </div>
        </>
    )
}
