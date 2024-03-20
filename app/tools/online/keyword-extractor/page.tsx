"use client"

import { useState, useRef } from "react"
import { ResultAlert, SubmitButton, Breadcrumbs } from "@/components"

interface Keyword {
    name: string
    category: string
    start: number
    end: number
}

export default function Home() {
    const [keywords, setKeywords] = useState<string[]>([])
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const extractKeywords = async () => {
        const text = textarea.current?.value

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": `${process.env["NEXT_PUBLIC_RAPID_API_KEY"]}`,
                "X-RapidAPI-Host": "text-keyword-extractor.p.rapidapi.com",
            },
            body: JSON.stringify({
                text: text,
            }),
        }

        try {
            const response = await fetch(
                "https://text-keyword-extractor.p.rapidapi.com/keyword-extractor",
                options
            )
            const result = await response.json()
            const keywordNames = result.body.keywords.map(
                (keyword: Keyword) => keyword.name
            )
            setKeywords(keywordNames)
        } catch (error) {
            console.error(error)
        }
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Online Tools", "Keyword Extractor"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Keyword Extractor</h1>
                <p>
                    Paste the text in the following input to get the line count:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>
                <SubmitButton
                    text={"Extract Keywords"}
                    handleClick={extractKeywords}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`Keywords: ${keywords.join(", ")}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>
                        About <b>Keyword Extractor</b>
                    </h2>
                    <p>
                        This tool <b>Line Counter</b> is used by people who want
                        a quick way to determine the number of lines in a
                        specific text.
                    </p>
                    <h2>
                        Who would use <b>Keyword Extractor</b>?
                    </h2>
                    <ul>
                        <li>
                            <b>Search Engine Optimizers SEOs: </b>
                            SEO experts who want to ensure the existence of
                            keywords in their article to better optimize it for
                            Search Engines search like Google, Bing, etc.
                        </li>
                        <li>
                            <b>Writers:</b> Writers who want to get a few
                            keywords to add as tags to their blog/report/etc.
                        </li>
                        <li>
                            <b>Data Analysts:</b> Data Analysts need to extract
                            keywords from a random text. This helps them to
                            preprocess textual data and conduct sentiment
                            analysis, topic modeling, or document clustering.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
