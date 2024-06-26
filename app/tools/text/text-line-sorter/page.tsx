"use client"

import React, { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

const calculateEntropy = (text: string): number => {
    const freq: Record<string, number> = {}
    for (let char of text) {
        if (freq[char]) {
            freq[char]++
        } else {
            freq[char] = 1
        }
    }
    const totalChars = text.length
    let entropy = 0
    for (let char of Object.keys(freq)) {
        const p = freq[char] / totalChars
        entropy -= p * Math.log2(p)
    }
    return entropy
}

const TextLineSorter = () => {
    const [sortedText, setSortedText] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [sortOption, setSortOption] = useState("alphabetical")
    const [sortOrder, setSortOrder] = useState("ascending")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Text Line Sorter"]

    const applySorting = () => {
        if (textarea.current) {
            let lines = textarea.current.value.split("\n")
            switch (sortOption) {
                case "alphabetical":
                    lines.sort()
                    break
                case "numerical":
                    lines.sort((a, b) => parseFloat(a) - parseFloat(b))
                    break
                case "length":
                    lines.sort((a, b) => a.length - b.length)
                    break
                case "complexity":
                    lines.sort(
                        (a, b) => calculateEntropy(a) - calculateEntropy(b)
                    )
                    break
                default:
                    break
            }
            if (sortOrder === "descending") {
                lines.reverse()
            }
            const result = lines.join("\n")
            setSortedText(result)
            setIsEmpty(result.length === 0)
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
                <h1>Text Line Sorter</h1>
                <p>Select the sorting options and paste your text below:</p>

                <div className="form-control w-full md:w-1/3 my-4">
                    {["alphabetical", "numerical", "length", "complexity"].map(
                        (option) => (
                            <label
                                className="label cursor-pointer space-x-2"
                                key={option}
                            >
                                <span className="label-text">
                                    {option.charAt(0).toUpperCase() +
                                        option.slice(1)}
                                </span>
                                <input
                                    type="radio"
                                    name="sortOption"
                                    value={option}
                                    checked={sortOption === option}
                                    onChange={() => setSortOption(option)}
                                    className="radio radio-primary"
                                />
                            </label>
                        )
                    )}
                </div>

                <div className="form-control w-full md:w-1/3 my-4">
                    {["ascending", "descending"].map((order) => (
                        <label
                            className="label cursor-pointer space-x-2"
                            key={order}
                        >
                            <span className="label-text">
                                {order.charAt(0).toUpperCase() + order.slice(1)}
                            </span>
                            <input
                                type="radio"
                                name="sortOrder"
                                value={order}
                                checked={sortOrder === order}
                                onChange={() => setSortOrder(order)}
                                className="radio radio-secondary"
                            />
                        </label>
                    ))}
                </div>

                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Sort"}
                    handleClick={applySorting}
                    className="w-full sm:w-auto"
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`${sortedText}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Text Line Sorter</h2>
                    <div>
                        <p>
                            The <strong>Text Line Sorter</strong> is a free tool
                            for sorting a text, however of its size, line by
                            line depending on the sorting option
                        </p>
                        <p>
                            There are four options for sorting text:
                            alphabetically, numerically, by length, and by
                            complexity (best for passwords).
                        </p>
                        <p>
                            Each option can be applied in either ascending or
                            descending order, providing flexibility and control
                            over how your text is sorted.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TextLineSorter
