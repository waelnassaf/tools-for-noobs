"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [sentenceCount, setSentenceCount] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const countSentences = () => {
        const text = textarea.current?.value
        const sentences = text?.match(/[^.!?]*[.!?]/g)
        setIsEmpty(Boolean(!text?.trim().length))
        setSentenceCount(sentences ? sentences.length : 0)
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }
    const pages = ["Home", "Text Tools", "Sentence Counter"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Sentence Counter</h1>
                <p>
                    Paste the text in the following input to get the sentence
                    count:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>
                <SubmitButton
                    text={"Count Sentences"}
                    handleClick={countSentences}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`Number of Sentences: ${sentenceCount}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>
                        About <b>Sentence Counter</b>
                    </h2>
                    <p>
                        This tool <b>Sentence Counter</b> is used by people who
                        want a quick way to determine the number of sentences in
                        a specific text.
                    </p>
                    <h2>
                        Who would use <b>Sentence Counter</b>?
                    </h2>
                    <ul>
                        <li>
                            <b>Software Developers:</b> Programmers wanting to
                            gauge the length of their documentation or comments.
                        </li>
                        <li>
                            <b>Writers:</b> Writers who want to get a quick
                            glance on the complexity of their text.
                        </li>
                        <li>
                            <b>Students:</b> Students who need to write a
                            specific number of sentences in their essay.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
