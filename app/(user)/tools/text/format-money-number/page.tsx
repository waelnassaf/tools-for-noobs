"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

export default function FormatMoneyNumber() {
    const [textResult, setTextResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Number Tools", "Format Money Number"]

    const handleNumberTransformation = () => {
        setIsEmpty(Boolean(!textarea.current?.value.trim().length))
        setShowAlert(true)
        if (textarea.current) {
            const text = textarea.current.value
            const numbers = text.split(/\s+/).map(Number)
            const formattedNumbers = numbers
                .map((num) => (!isNaN(num) ? formatCurrency(num) : num))
                .join("\n")
            setTextResult(formattedNumbers)
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
                <h1>Format Money Number</h1>
                <p>
                    Paste your numbers in the input below to format them as
                    currency:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                 textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Paste numbers here"
                    ref={textarea}
                ></textarea>

                <div className="flex flex-wrap justify-between gap-4">
                    <SubmitButton
                        text={"Format Numbers"}
                        handleClick={handleNumberTransformation}
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
                    <h2>About Format Money Number</h2>
                    <p>
                        This tool <b>Format Money Number</b> is a useful utility
                        for anyone who needs to format numbers as currency.
                        Whether you're dealing with financial data, reports, or
                        any kind of numeric input, this tool helps you easily
                        transform raw numbers into properly formatted currency
                        values.
                    </p>
                </div>
            </div>
        </>
    )
}
