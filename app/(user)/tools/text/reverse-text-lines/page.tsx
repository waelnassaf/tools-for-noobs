"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [reversedText, setReversedText] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const reverseLines = () => {
        const text = textarea.current?.value

        if (!text) {
            setIsEmpty(true)
            setShowAlert(false)
            return
        }

        const lines = text.split("\n").filter(Boolean)
        const reversed = lines.reverse().join("\n")

        setIsEmpty(reversed.length === 0)
        setReversedText(reversed)
        setShowAlert(true)

        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Reverse Text Lines"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Reverse Text Lines</h1>
                <p>Paste the text to reverse the order of the lines:</p>

                <div className="lg:flex lg:gap-4 mb-4">
                    <textarea
                        className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                        placeholder="Paste text here"
                        ref={textarea}
                    ></textarea>
                </div>

                <SubmitButton
                    text={"Reverse Lines"}
                    handleClick={reverseLines}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={reversedText}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Reverse Text Lines</h2>
                    <p>
                        This tool <b>Reverse Text Lines</b> allows users to
                        paste a block of text and reverse the order of its
                        lines.
                    </p>
                </div>
            </div>
        </>
    )
}
