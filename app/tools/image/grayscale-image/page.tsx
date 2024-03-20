"use client"

import { useState } from "react"
// @ts-ignore
import Jimp from "jimp/es"
import { Breadcrumbs, SubmitButton } from "@/components"
import { FileInput, ImageDisplay } from "../components"

const Page = () => {
    const [convertedURL, setConvertedURL] = useState(null)
    const [preview, setPreview] = useState<string>("")
    const [showConvertButton, setShowConvertButton] = useState(false)

    const pages = ["Home", "Image Tools", "Grayscale Image"]

    const handleDrop = (files: FileList) => {
        // Handle dropped files
        if (files.length > 0) {
            const file = files[0]

            // Check if the file is an image
            if (!file.type.startsWith("image/")) {
                alert("Only image files are accepted.")
                return
            }

            const reader = new FileReader()

            reader.onload = () => {
                setPreview(reader.result as string)
                setShowConvertButton(true)
            }

            reader.readAsDataURL(file)
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
            image.grayscale()

            const convertedImageSrc = await image.getBase64Async(Jimp.MIME_JPEG)
            setConvertedURL(convertedImageSrc)
            setShowConvertButton(false)
        } catch (error) {
            console.error("Image manipulation error:", error)
            // Provide user feedback for conversion errors
        }
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Grayscale Image Tool</h1>
                <p>Choose or Drop Image file to transform it to grayscale:</p>

                <div className="max-w-xl mx-auto">
                    <FileInput onDrop={handleDrop} />
                    {preview && <ImageDisplay src={preview} alt="Image" />}

                    {showConvertButton && (
                        <SubmitButton
                            text="Grayscale Image"
                            handleClick={handleImageConversion}
                        />
                    )}

                    {convertedURL && (
                        <>
                            <h3>Grayscale Image:</h3>
                            <ImageDisplay
                                src={convertedURL}
                                alt="Grayscale Image"
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page
