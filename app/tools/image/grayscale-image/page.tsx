"use client"

import { useState } from "react"
// @ts-ignore
import Jimp from "jimp/es"
import { Breadcrumbs, SubmitButton } from "@/components"
import { FileInput, ImageDisplay } from "../components"

const Page = () => {
    const [convertedURL, setConvertedURL] = useState<string | null>(null)
    const [preview, setPreview] = useState<string>("")
    const [showConvertButton, setShowConvertButton] = useState<boolean>(false)
    const [showDownloadButton, setShowDownloadButton] = useState<boolean>(false)

    const pages = ["Home", "Image Tools", "Grayscale Image"]

    const handleDrop = (files: FileList) => {
        if (files.length > 0) {
            const file = files[0]

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
            image.grayscale()

            const convertedImageSrc = await image.getBase64Async(Jimp.MIME_JPEG)
            setConvertedURL(convertedImageSrc)
            setShowConvertButton(false)
            setShowDownloadButton(true) // Show download button after conversion
        } catch (error) {
            console.error("Image manipulation error:", error)
            // Provide user feedback for conversion errors
        }
    }

    const handleDownload = () => {
        if (convertedURL) {
            const link = document.createElement("a")
            link.href = convertedURL
            link.download = "grayscale-image.jpg" // Set appropriate file name and extension
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } else {
            console.error("No image to download.")
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
                        <div className="mt-4">
                            <h3>Grayscale Image:</h3>
                            <ImageDisplay
                                src={convertedURL}
                                alt="Grayscale Image"
                            />
                            {showDownloadButton && (
                                <SubmitButton
                                    text="Download Grayscale"
                                    handleClick={handleDownload}
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="tool-content mt-8">
                    <h2>About Grayscale Image Tool</h2>
                    <p>
                        The <b>Grayscale Image Tool</b> allows you to convert
                        color images to grayscale. This is useful for various
                        applications, including enhancing contrast and reducing
                        file sizes while maintaining image quality.
                    </p>
                    <h2>Who Would Use Grayscale Image Tool?</h2>
                    <ul>
                        <li>
                            <b>Photographers:</b> Adjusting images for artistic
                            or practical purposes.
                        </li>
                        <li>
                            <b>Graphic Designers:</b> Preparing images for print
                            or digital media with specific requirements.
                        </li>
                        <li>
                            <b>Developers:</b> Integrating grayscale image
                            processing into web applications.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Page
