"use client"

import { useState, useRef } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

export default function SlugGenerator() {
    const [slug, setSlug] = useState<string>("")
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)

    const textarea = useRef<HTMLTextAreaElement>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "Text Tools", "Slug Generator"]

    const generateSlug = () => {
        if (textarea.current) {
            const text = textarea.current.value
            const trimmedText = text.trim()
            const processedSlug = generateURLSlug(trimmedText)
            setSlug(processedSlug)
            setShowAlert(true)
            setIsEmpty(processedSlug.length === 0)
            setTimeout(() => {
                alertDiv.current?.scrollIntoView({ behavior: "smooth" })
            }, 0)
        }
    }

    const generateURLSlug = (text: string): string => {
        return text
            .toLowerCase() // Convert to lowercase
            .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/--+/g, "-") // Replace multiple consecutive hyphens with single hyphen
            .trim() // Trim leading/trailing hyphens
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Slug Generator</h1>
                <p>Enter text below to generate a SEO-friendly URL slug:</p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Enter text here"
                    ref={textarea}
                ></textarea>

                <SubmitButton
                    text={"Sluggify"}
                    handleClick={generateSlug}
                    className="w-full sm:w-auto"
                />

                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`${slug}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>About Slug Generator</h2>
                    <p>
                        This tool <b>Slug Generator</b> converts text into a
                        SEO-friendly URL slug by removing special characters,
                        converting spaces to hyphens, and ensuring the text is
                        in lowercase. It&apos;s useful for generating clean and
                        readable URLs for web pages, blog posts, and other
                        content.
                    </p>
                </div>
            </div>
        </>
    )
}
