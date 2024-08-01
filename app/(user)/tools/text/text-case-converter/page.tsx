"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text Case Converter"]

    const handleTextTransformation = (transformationType: string) => {
        if (textarea.current) {
            const text = textarea.current.value
            let transformedText: string

            switch (transformationType) {
                case "uppercase":
                    transformedText = text.toUpperCase()
                    break
                case "lowercase":
                    transformedText = text.toLowerCase()
                    break
                case "sentence":
                    transformedText =
                        text.charAt(0).toUpperCase() +
                        text.slice(1).toLowerCase()
                    break
                case "title":
                    transformedText = text.replace(
                        /\w\S*/g,
                        (txt) =>
                            txt.charAt(0).toUpperCase() +
                            txt.substr(1).toLowerCase()
                    )
                    break
                case "random":
                    transformedText = Array.from(text)
                        .map((char) =>
                            Math.random() > 0.5
                                ? char.toUpperCase()
                                : char.toLowerCase()
                        )
                        .join("")
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
                <h1>Text Case Converter</h1>
                <p>
                    Paste the text in the following input to get the transformed
                    text:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Uppercase Text"}
                        handleClick={() =>
                            handleTextTransformation("uppercase")
                        }
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Lowercase Text"}
                        handleClick={() =>
                            handleTextTransformation("lowercase")
                        }
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Sentence Case Text"}
                        handleClick={() => handleTextTransformation("sentence")}
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Title Case Text"}
                        handleClick={() => handleTextTransformation("title")}
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Random Case Text"}
                        handleClick={() => handleTextTransformation("random")}
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
                    <h2>About Text Case Converter</h2>
                    <p>
                        This tool <b>Text Case Converter</b> is a handy utility
                        for programmers, writers, or just data entry people
                        looking to transform the case of a certain text. Whether
                        you&apos;re dealing with text, lists, or data entries,
                        this tool helps streamline your text by transforming its
                        case, leaving you with the desired text format.
                    </p>
                </div>
            </div>
        </>
    )
}
