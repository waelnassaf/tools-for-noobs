"use client"

import { useState, useRef } from "react"
import { ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [characterCount, setCharacterCount] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const countCharacters = () => {
        const text = textarea.current?.value
        const characterCount = text ? text.length : 0
        setIsEmpty(Boolean(!text?.trim().length))
        setCharacterCount(characterCount)
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <div className="mt-12 padding-x padding-y max-width prose">
            <h1>Character Counter</h1>
            <p>
                Paste the text in the following input to get the character
                count:
            </p>
            <textarea
                className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                placeholder="Paste text here"
                ref={textarea}
            ></textarea>

            <SubmitButton
                text={"Count Characters"}
                handleClick={countCharacters}
            />

            <ResultAlert
                showAlert={showAlert}
                isEmpty={isEmpty}
                message={`Number of Character: ${characterCount}`}
                hideAlert={() => setShowAlert(false)}
                alertDiv={alertDiv}
            />

            <div className="flex flex-col w-3/4 mx-auto my-4">
                <div className="divider"></div>
            </div>

            <div className="tool-content">
                <h2>About Character Counter</h2>
                <p>
                    This tool <b>Character Counter</b> is used by people who
                    want a quick way to determine the number of characters in a
                    specific text.
                </p>
            </div>
        </div>
    )
}
