"use client"

import { useState } from "react"
// @ts-ignore
import Jimp from "jimp/es"
import { SubmitButton } from "@/components" // You may need to create these components
import { FileInput, ImageDisplay } from "@/app/tools/image/components"

const Page = () => {
    const [convertedURL, setConvertedURL] = useState(null)
    const [preview, setPreview] = useState<string>("")
    const [showConvertButton, setShowConvertButton] = useState(false)

    const handleDrop = (files: FileList) => {
        // Handle dropped files
        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()

            if (file.type === "image/png") {
                reader.onload = () => {
                    setPreview(reader.result as string)
                    setShowConvertButton(true)
                }

                reader.readAsDataURL(file)
            } else {
                // Provide user feedback for unsupported file types
                alert("Unsupported file type. Please choose a PNG image.")
                console.error(
                    "Unsupported file type. Please choose a PNG image."
                )
            }
        }
    }

    const handleImageConversion = async () => {
        if (!preview) {
            console.error("No image to convert.")
            return
        }

        try {
            const image = await Jimp.read(preview)

            // Adjust quality to a reasonable value (e.g., 80)
            image.quality(80)

            const convertedImageSrc = await image.getBase64Async(Jimp.MIME_JPEG)
            setConvertedURL(convertedImageSrc)
            setShowConvertButton(false)
        } catch (error) {
            console.error("Image manipulation error:", error)
            // Provide user feedback for conversion errors
        }
    }

    return (
        <div className="mt-12 padding-x padding-y max-width prose">
            <h1>PNG to JPG Converter</h1>
            <p>Choose or Drop PNG file to change its type to JPG:</p>

            <div className="max-w-xl mx-auto">
                <FileInput onDrop={handleDrop} accept=".png" />
                {preview && <ImageDisplay src={preview} alt="PNG Image" />}

                {showConvertButton && (
                    <SubmitButton
                        text="Convert to JPG"
                        handleClick={handleImageConversion}
                    />
                )}

                {convertedURL && (
                    <>
                        <h3>JPG Image:</h3>
                        <ImageDisplay src={convertedURL} alt="Converted JPG" />
                    </>
                )}
            </div>
        </div>
    )
}

export default Page
