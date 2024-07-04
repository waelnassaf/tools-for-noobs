"use client"

import { useState, useRef, useEffect } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function SentenceExtractor() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [filterOptions, setFilterOptions] = useState({
        duplicateRemove: false,
        caseSensitive: false,
        outputLines: false,
        reverseMatches: false,
    })
    const [activeFilter, setActiveFilter] = useState<string>("wordFilter")

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)
    const wordFilterInput = useRef<HTMLTextAreaElement>(null)
    const charFilterInput = useRef<HTMLInputElement>(null)
    const regexFilterInput = useRef<HTMLInputElement>(null)

    const pages = ["Home", "Text Tools", "Advanced Sentence Extractor"]

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFilterOptions((prev) => ({ ...prev, [name]: checked }))
    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveFilter(e.target.id)
    }

    useEffect(() => {
        if (wordFilterInput.current)
            wordFilterInput.current.disabled = activeFilter !== "wordFilter"
        if (charFilterInput.current)
            charFilterInput.current.disabled = activeFilter !== "charFilter"
        if (regexFilterInput.current)
            regexFilterInput.current.disabled = activeFilter !== "regexFilter"
    }, [activeFilter])

    const applyFiltering = () => {
        if (!textarea.current) return

        const text = textarea.current.value
        let sentences = text.split(/(?<=\.)\s+/)
        let filteredSentences: string[] = []

        if (activeFilter === "wordFilter" && wordFilterInput.current) {
            const filterWords = wordFilterInput.current.value
                .split("\n")
                .map((word) => word.trim())
                .filter((word) => word.length > 0)
            filteredSentences = sentences.filter((sentence) =>
                filterWords.some((word) =>
                    filterOptions.caseSensitive
                        ? sentence.includes(word)
                        : sentence.toLowerCase().includes(word.toLowerCase())
                )
            )
        } else if (activeFilter === "charFilter" && charFilterInput.current) {
            const charSet = charFilterInput.current.value
            const regex = new RegExp(
                `^[${charSet}]+$`,
                filterOptions.caseSensitive ? "" : "i"
            )
            filteredSentences = sentences.filter((sentence) =>
                sentence
                    .replace(/\s/g, "")
                    .split("")
                    .every((char) => regex.test(char))
            )
        } else if (activeFilter === "regexFilter" && regexFilterInput.current) {
            const regexPattern = regexFilterInput.current.value
            try {
                const regex = new RegExp(
                    regexPattern,
                    filterOptions.caseSensitive ? "" : "i"
                )
                filteredSentences = sentences.filter((sentence) =>
                    regex.test(sentence)
                )
            } catch (error) {
                console.error("Invalid regex pattern", error)
                setShowAlert(true)
                setTextResult("Invalid regex pattern")
                setIsEmpty(true)
                scrollToAlert()
                return
            }
        }

        if (filterOptions.reverseMatches) {
            const originalSentences = new Set(filteredSentences)
            filteredSentences = sentences.filter(
                (sentence) => !originalSentences.has(sentence)
            )
        }

        if (filterOptions.duplicateRemove) {
            const uniqueSentences = new Set<string>()
            filteredSentences = filteredSentences.filter((sentence) => {
                const normalizedSentence = filterOptions.caseSensitive
                    ? sentence.trim()
                    : sentence.trim().toLowerCase()
                if (uniqueSentences.has(normalizedSentence)) {
                    return false
                } else {
                    uniqueSentences.add(normalizedSentence)
                    return true
                }
            })
        }

        const result = filterOptions.outputLines
            ? filteredSentences.join("\n")
            : filteredSentences.join(" ")
        setTextResult(result)
        setShowAlert(true)
        setIsEmpty(filteredSentences.length === 0)
        scrollToAlert()
    }

    const scrollToAlert = () => {
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Advanced Sentence Extractor</h1>

                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste text here"
                    ref={textarea}
                ></textarea>

                <h2>Tool Settings</h2>
                <div className="tool-settings">
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text flex justify-center items-center gap-4">
                                    <input
                                        type="radio"
                                        name="inputFilter"
                                        className="radio"
                                        id="wordFilter"
                                        onChange={handleRadioChange}
                                        checked={activeFilter === "wordFilter"}
                                    />
                                    <label htmlFor="wordFilter">
                                        Filter by words
                                    </label>
                                </span>
                            </div>
                            <textarea
                                placeholder="Type here"
                                className="textarea textarea-bordered w-full max-w-xs"
                                ref={wordFilterInput}
                            />
                            <div className="form-control">
                                <label className="label cursor-pointer space-x-2">
                                    <span className="label-text">
                                        Case-Sensitive Input
                                    </span>
                                    <input
                                        type="checkbox"
                                        name="caseSensitive"
                                        checked={filterOptions.caseSensitive}
                                        onChange={handleOptionChange}
                                        className="toggle toggle-accent"
                                        disabled={activeFilter !== "wordFilter"}
                                    />
                                </label>
                            </div>
                            <div className="label">
                                <span className="label-text-alt text-gray-500">
                                    (Match sentences by specific words with
                                    regard to case sensitivity) Put each word on
                                    a new line
                                </span>
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text flex justify-center items-center gap-4">
                                    <input
                                        type="radio"
                                        name="inputFilter"
                                        className="radio"
                                        id="charFilter"
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="charFilter">
                                        Filter by character set
                                    </label>
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                ref={charFilterInput}
                            />
                            <div className="label">
                                <span className="label-text-alt text-gray-500">
                                    (Match sentences by specific character set,
                                    sentence extracted will consist only of the
                                    provided character set)
                                </span>
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text flex justify-center items-center gap-4">
                                    <input
                                        type="radio"
                                        name="inputFilter"
                                        className="radio"
                                        id="regexFilter"
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="regexFilter">
                                        Filter by a Regex
                                    </label>
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                ref={regexFilterInput}
                            />
                            <div className="label">
                                <span className="label-text-alt text-gray-500">
                                    (Match sentences by a given regular
                                    expression) Use this without forward
                                    slashes. ex: [0-9]
                                </span>
                            </div>
                        </label>
                    </div>
                    <div>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-2">
                                <span className="label-text">
                                    Delete Duplicate Sentences
                                </span>
                                <input
                                    type="checkbox"
                                    name="duplicateRemove"
                                    checked={filterOptions.duplicateRemove}
                                    onChange={handleOptionChange}
                                    className="toggle toggle-primary"
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-2">
                                <span className="label-text">
                                    One sentence per line
                                </span>
                                <input
                                    type="checkbox"
                                    name="outputLines"
                                    checked={filterOptions.outputLines}
                                    onChange={handleOptionChange}
                                    className="toggle toggle-secondary"
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer space-x-2">
                                <span className="label-text">
                                    Reverse Matches
                                </span>
                                <input
                                    type="checkbox"
                                    name="reverseMatches"
                                    checked={filterOptions.reverseMatches}
                                    onChange={handleOptionChange}
                                    className="toggle toggle-error"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <SubmitButton
                    text={"Extract"}
                    handleClick={applyFiltering}
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
                    <h2>About Advanced Sentence Extractor</h2>
                    <p className="mb-4">
                        This tool <strong>Advanced Sentence Extractor</strong>{" "}
                        is a comprehensive tool for extracting sentences from a
                        given text based on various filters.
                    </p>
                    <p className="mb-4">It provides the following options:</p>
                    <ul className="list-disc list-inside mb-4">
                        <li>
                            Filter by words: Extract sentences containing
                            specific words.
                        </li>
                        <li>
                            Filter by character set: Extract sentences
                            containing only specific characters.
                        </li>
                        <li>
                            Filter by regular expression: Extract sentences
                            matching a given regex pattern.
                        </li>
                    </ul>
                    <p>
                        Additional options include removing duplicate sentences,
                        ensuring one sentence per line, case-sensitive input,
                        and reversing the matches.
                    </p>
                </div>
            </div>
        </>
    )
}
