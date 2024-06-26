"use client"
import { useState, useRef, ChangeEvent } from "react"
import { Breadcrumbs, SubmitButton, ResultAlert } from "@/components"

const StrongPasswordGenerator = () => {
    const [password, setPassword] = useState("")
    const [passwordLength, setPasswordLength] = useState(12) // Default password length
    const [passwordStrength, setPasswordStrength] = useState("medium") // Default password strength
    const [showAlert, setShowAlert] = useState(false)

    const alertDiv = useRef<HTMLDivElement>(null)

    const handlePasswordLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordLength(parseInt(e.target.value))
    }

    const handleStrengthChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordStrength(e.target.value)
    }

    const generatePassword = () => {
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const numericChars = "0123456789"
        const specialChars = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"

        let validChars = lowercaseChars
        if (passwordStrength === "medium") {
            validChars += uppercaseChars
        } else if (passwordStrength === "strong") {
            validChars += uppercaseChars + numericChars
        } else if (passwordStrength === "very-strong") {
            validChars += uppercaseChars + numericChars + specialChars
        }

        let generatedPassword = ""
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * validChars.length)
            generatedPassword += validChars[randomIndex]
        }

        setPassword(generatedPassword)
        setShowAlert(true)
        setTimeout(() => {
            alertDiv.current?.scrollIntoView({ behavior: "smooth" })
        }, 0)
    }

    const pages = ["Home", "Password Tools", "Strong Password Generator"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1 className="text-3xl font-bold mb-6">
                    Strong Password Generator
                </h1>

                <div className="space-y-4 mb-6">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Medium</span>
                            <input
                                type="radio"
                                name="strength"
                                className="radio checked:bg-red-500"
                                value="medium"
                                checked={passwordStrength === "medium"}
                                onChange={handleStrengthChange}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Strong</span>
                            <input
                                type="radio"
                                name="strength"
                                className="radio checked:bg-blue-500"
                                value="strong"
                                checked={passwordStrength === "strong"}
                                onChange={handleStrengthChange}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Very Strong</span>
                            <input
                                type="radio"
                                name="strength"
                                className="radio checked:bg-green-500"
                                value="very-strong"
                                checked={passwordStrength === "very-strong"}
                                onChange={handleStrengthChange}
                            />
                        </label>
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="text-lg font-medium">
                            Password Length: {passwordLength}
                        </label>
                        <input
                            type="range"
                            min={6}
                            max={50}
                            value={passwordLength}
                            onChange={handlePasswordLengthChange}
                            className="range range-info"
                        />
                    </div>
                </div>

                <SubmitButton
                    text="Generate Password"
                    handleClick={generatePassword}
                />

                <ResultAlert
                    showAlert={showAlert}
                    message={`${password}`}
                    hideAlert={() => setShowAlert(false)}
                    alertDiv={alertDiv}
                />
            </div>
        </>
    )
}

export default StrongPasswordGenerator
