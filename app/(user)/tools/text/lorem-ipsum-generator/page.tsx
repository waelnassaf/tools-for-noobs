"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

const loremIpsumTexts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
    "Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.",
    "Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
    "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.",
]

export default function Home() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [paragraphs, setParagraphs] = useState<number>(1)
    const alertDiv = useRef<HTMLDivElement>(null)

    const loremIpsumGenerator = () => {
        const resultText = loremIpsumTexts.slice(0, paragraphs).join("\n")
        setTextResult(resultText)
        setShowAlert(true)

        // By using setTimeout with a delay of 0 milliseconds,
        // we can ensure that the scrolling code is executed
        // after the state update has taken place and the alert div is rendered.
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Lorem Ipsum Generator"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Lorem Ipsum Generator</h1>
                <p>Select lorem ipsum&apos;s paragraph length</p>
                <input
                    type="range"
                    min={1}
                    max="10"
                    value={paragraphs}
                    className="range"
                    step="1"
                    onChange={(e) => setParagraphs(Number(e.target.value))}
                />
                <div className="w-full flex justify-between text-xs px-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                </div>

                <SubmitButton
                    text={"Generate"}
                    handleClick={loremIpsumGenerator}
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={!textResult}
                    message={`${textResult}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Lorem Ipsum Generator</h2>
                    <p>
                        This tool <b>Lorem Ipsum Generator</b> is a handy tool
                        for developers/designers who want to put a placeholder
                        text on some section of their website/app as a dummy
                        data until to showcase the final project before
                        it&apos;s replaced by real data
                    </p>
                </div>
            </div>
        </>
    )
}
