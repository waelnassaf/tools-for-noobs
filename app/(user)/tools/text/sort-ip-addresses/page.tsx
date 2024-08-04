"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function IPSorter() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "IP Tools", "Sort IP Addresses"]

    const ipToNumber = (ip: string) => {
        return ip
            .split(".")
            .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0)
    }

    const handleIPSorting = (order: "ascending" | "descending") => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)

        if (textarea.current) {
            const text = textarea.current.value
            const lines = text.split("\n")
            const sortedLines = lines.sort((a, b) =>
                order === "ascending"
                    ? ipToNumber(a) - ipToNumber(b)
                    : ipToNumber(b) - ipToNumber(a)
            )
            setTextResult(sortedLines.join("\n"))
        }

        // Ensure the alert div is scrolled into view after state update
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Sort IP Addresses</h1>
                <p>
                    Paste the IP addresses in the following input to sort them:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste IP addresses here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap gap-4">
                    <SubmitButton
                        text={"Ascending"}
                        handleClick={() => handleIPSorting("ascending")}
                        className="w-full sm:w-auto"
                    />
                    <SubmitButton
                        text={"Descending"}
                        handleClick={() => handleIPSorting("descending")}
                        className="w-full sm:w-auto"
                    />
                </div>

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
                    <h2>About Sort IP Addresses</h2>
                    <p>
                        This tool <b>Sort IP Addresses</b> helps you to organize
                        a list of IP addresses by sorting them in either
                        ascending or descending order. Simply paste your list of
                        IP addresses, and choose the sorting order.
                    </p>
                </div>
            </div>
        </>
    )
}
