"use client"

import { useState, useRef, RefObject } from "react"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

const dictionary = {
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    "-.-.--": "!",
    ".-.-.-": ".",
    "--..--": ",",
} as const

type Dictionary = typeof dictionary
type MorseCodeChar = keyof Dictionary
type TextChar = Dictionary[MorseCodeChar]

// Creating inverse dictionary for decoding
const inverseDictionary: Record<TextChar, MorseCodeChar> = Object.entries(
    dictionary
).reduce(
    (acc, [key, value]) => {
        acc[value] = key as MorseCodeChar
        return acc
    },
    {} as Record<TextChar, MorseCodeChar>
)

const textToMorse = (text: string): string => {
    return text
        .toLowerCase()
        .split("")
        .map((char) => {
            if (char in inverseDictionary) {
                return inverseDictionary[char as TextChar]
            }
            return ""
        })
        .join(" ")
}

const morseToText = (morse: string): string => {
    return morse
        .split(" ")
        .map((code) => dictionary[code as MorseCodeChar] || "")
        .join("")
}

export default function Home() {
    const [result, setResult] = useState<string>("")
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const textarea: RefObject<HTMLTextAreaElement> =
        useRef<HTMLTextAreaElement>(null)
    const alertDiv: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

    const handleEncode = () => {
        const text = textarea.current?.value || ""
        setIsEmpty(Boolean(!text.trim().length))
        const morse = textToMorse(text)
        setResult(morse)
        setShowAlert(true)
        scrollToAlert()
    }

    const handleDecode = () => {
        const morse = textarea.current?.value || ""
        setIsEmpty(Boolean(!morse.trim().length))
        const text = morseToText(morse)
        setResult(text)
        setShowAlert(true)
        scrollToAlert()
    }

    const scrollToAlert = () => {
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Text Tools", "Morse Code Encoder/Decoder"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Morse Code Encoder/Decoder</h1>
                <p>
                    Enter text to encode to Morse code or Morse code to decode
                    to text:
                </p>
                <textarea
                    className="textarea textarea-lg block textarea-bordered
                    textarea-ghost w-full md:w-3/4 h-80"
                    placeholder="Enter text or Morse code here"
                    ref={textarea}
                ></textarea>
                <div className="flex gap-3 justify-start">
                    <SubmitButton
                        text={"Encode to Morse"}
                        handleClick={handleEncode}
                    />
                    <SubmitButton
                        text={"Decode to Text"}
                        handleClick={handleDecode}
                    />
                </div>
                <ResultAlert
                    showAlert={showAlert}
                    isEmpty={isEmpty}
                    message={`Result: ${result}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>
                        About <b>Morse Code Encoder/Decoder</b>
                    </h2>
                    <p>This tool converts text to Morse code and vice versa.</p>
                    <h2>
                        Who would use <b>Morse Code Encoder/Decoder</b>?
                    </h2>
                    <ul>
                        <li>
                            <b>Amateur Radio Enthusiasts:</b> People practicing
                            Morse code communication.
                        </li>
                        <li>
                            <b>Historians:</b> Those studying historical
                            communication methods.
                        </li>
                        <li>
                            <b>Curious Minds:</b> Anyone interested in learning
                            about Morse code.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
