"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function LineBreaker() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [interval, setInterval] = useState<number>(0)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Line Breaker"]

    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterval(Number(e.target.value))
    }

    const applyLineBreaks = () => {
        if (textarea.current) {
            const text = textarea.current.value
            let formattedText = ""

            if (interval > 0) {
                for (let i = 0; i < text.length; i += interval) {
                    formattedText += text.slice(i, i + interval) + "\n"
                }
            } else {
                formattedText = text
            }

            setTextResult(formattedText)
            setIsEmpty(formattedText.length === 0)
            setShowAlert(true)
            setTimeout(() => {
                alertDiv.current?.scrollIntoView({ behavior: "smooth" })
            }, 0)
        }
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Line Breaker</h1>
                <p>
                    Enter the interval for line breaks and paste your text
                    below:
                </p>
                <div className="w-full md:w-1/3 space-y-3 my-4">
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-2">
                            <span className="label-text">Interval</span>
                            <input
                                type="number"
                                className="input input-bordered"
                                value={interval}
                                onChange={handleIntervalChange}
                                min="1"
                                placeholder="Enter interval"
                            />
                        </label>
                    </div>
                </div>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Apply Line Breaks"}
                    handleClick={applyLineBreaks}
                    className="w-full sm:w-auto"
                />

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
                    <h2>About Line Breaker</h2>
                    <p>
                        This tool <b>Line Breaker</b> is a handy utility for
                        inserting line breaks at specified intervals, making it
                        perfect for formatting long texts into readable blocks.
                        Whether you&apos;re formatting documents, code, or any
                        long text, this tool helps improve readability by
                        automatically adding line breaks at the desired
                        intervals.
                    </p>
                    <p>
                        The interval in this context refers to the number of
                        characters after which a line break is inserted into the
                        text. For example, if the interval is set to 10, the
                        tool will insert a line break after every 10 characters
                        in the provided text, formatting it into more readable
                        blocks.
                    </p>
                </div>
            </div>
        </>
    )
}
