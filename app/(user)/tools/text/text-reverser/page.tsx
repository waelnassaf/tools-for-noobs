"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const reverseText = () => {
        const text = textarea.current?.value

        // Check if the text is empty
        setIsEmpty(Boolean(!text?.trim().length))

        if (text !== undefined) {
            // Reverse the text
            const reversedText = text.split("").reverse().join("")

            // Set the result
            setTextResult(reversedText)
        }

        // Show the alert
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Text Reverser"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Text Reverser</h1>
                <p>
                    Paste the text in the following input to get the reversed
                    text:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                  textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton text={"Reverse Text"} handleClick={reverseText} />

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
                    <h2>About Text Reverser</h2>
                    <p>
                        This tool <b>Text Reverser</b> is a handy utility for
                        programmers, writers or just data entry people looking
                        to reverse the order of characters in a certain text.
                        Whether you&apos;re dealing with text, lists, or data
                        entries, this tool helps streamline your text by
                        reversing the order of characters, leaving you with the
                        reversed text.
                    </p>
                </div>
            </div>
        </>
    )
}
