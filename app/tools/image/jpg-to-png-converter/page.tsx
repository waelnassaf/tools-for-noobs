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

            if (file.type === "image/jpeg") {
                reader.onload = () => {
                    setPreview(reader.result as string)
                    setShowConvertButton(true)
                }

                reader.readAsDataURL(file)
            } else {
                // Provide user feedback for unsupported file types
                alert("Unsupported file type. Please choose a JPEG image.")
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

            const convertedImageSrc = await image.getBase64Async(Jimp.MIME_PNG)
            setConvertedURL(convertedImageSrc)
            setShowConvertButton(false)
        } catch (error) {
            console.error("Image manipulation error:", error)
            // Provide user feedback for conversion errors
        }
    }

    return (
        <div className="mt-12 padding-x padding-y max-width prose">
            <h1>JPG to PNG Converter</h1>
            <p>Choose or Drop JPG file to change its type to PNG:</p>

            <div className="max-w-xl mx-auto">
                <FileInput onDrop={handleDrop} accept=".jpg" />
                {preview && (
                    <ImageDisplay src={preview} alt="Converted PNG Image" />
                )}

                {showConvertButton && (
                    <SubmitButton
                        text="Convert to PNG"
                        handleClick={handleImageConversion}
                    />
                )}

                {convertedURL && (
                    <>
                        <h3>PNG Image:</h3>
                        <ImageDisplay src={convertedURL} alt="Converted PNG" />
                    </>
                )}
            </div>
        </div>
    )
}

export default Page
