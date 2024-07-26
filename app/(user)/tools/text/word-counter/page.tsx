"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function Home() {
    const [wordCount, setWordCount] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const countWords = () => {
        const words = textarea.current?.value.trim().split(/\b\W+\b/g)
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setWordCount(words ? words.length : 0)
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Word Counter"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Word Counter</h1>
                <p>
                    Paste the text in the following input to get the word count:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton text={"Count Words"} handleClick={countWords} />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`Number of Words: ${wordCount}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Word Counter</h2>
                    <p>
                        This tool <b>Word Counter</b> is used by people who want
                        a quick way to determine the number of words in a
                        specific text.
                    </p>
                    <h2>
                        Who would use <b>Word Counter</b>?
                    </h2>
                    <ul>
                        <li>
                            <b>Writers and Authors:</b> Writers usually want to
                            get a glance at the count of words in their essay,
                            article, report, etc.
                        </li>
                        <li>
                            <b>Students:</b> Some students are presented with
                            the problem to write a specific number of words in
                            their essay or research paper so that&apos;s why
                            they&apos;d use a word counter service.
                        </li>
                        <li>
                            <b>SEO Professionals:</b> Some parts of a website
                            can only accept a recommended number of words for
                            the page to be optimized for search engines like
                            Google, Bing, etc.
                        </li>
                        <li>
                            <b>Language Learners:</b> A language learner may
                            want to use a word counter to assess the complexity
                            of the studied text.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
