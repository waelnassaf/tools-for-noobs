"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [repeatedText, setRepeatedText] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const repeatCountInput = useRef<HTMLInputElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const repeatText = () => {
        const text = textarea.current?.value
        const repeatCount = repeatCountInput.current?.value
        const count = repeatCount ? parseInt(repeatCount, 10) : 1
        const repeatedText = text ? text.repeat(count) : ""
        setIsEmpty(Boolean(!text?.trim().length))
        setRepeatedText(repeatedText)
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Text Repeater"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Text Repeater</h1>
                <p>
                    Paste the text and enter the number of repetitions to get
                    the repeated text:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-40"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>
                <input
                    type="number"
                    className="input input-bordered w-full md:w-1/4 my-4 md:mr-4"
                    placeholder="Enter number of repetitions"
                    ref={repeatCountInput}
                />
                <SubmitButton text={"Repeat Text"} handleClick={repeatText} />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={repeatedText}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Text Repeater</h2>
                    <p>
                        This tool <b>Text Repeater</b> is used by people who
                        want a quick way to repeat a specific text multiple
                        times.
                    </p>
                </div>
            </div>
        </>
    )
}
