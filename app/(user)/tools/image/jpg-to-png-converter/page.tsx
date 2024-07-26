"use client"

import { useState } from "react"
// @ts-ignore
import Jimp from "jimp/es"
import { SubmitButton, Breadcrumbs } from "@/components"
import { FileInput, ImageDisplay } from "../_components"

const Page = () => {
    const [convertedURL, setConvertedURL] = useState<string | null>(null)
    const [preview, setPreview] = useState<string>("")
    const [showConvertButton, setShowConvertButton] = useState<boolean>(false)
    const [showDownloadButton, setShowDownloadButton] = useState<boolean>(false)

    const pages = ["Home", "Image Tools", "JPG to PNG Converter"]

    const handleDrop = (files: FileList) => {
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
                alert("Unsupported file type. Please choose a JPEG image.")
                console.error(
                    "Unsupported file type. Please choose a JPEG image."
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
            image.quality(80)

            const convertedImageSrc = await image.getBase64Async(Jimp.MIME_PNG)
            setConvertedURL(convertedImageSrc)
            setShowConvertButton(false)
            setShowDownloadButton(true)
        } catch (error) {
            console.error("Image manipulation error:", error)
        }
    }

    const handleDownload = () => {
        if (convertedURL) {
            const link = document.createElement("a")
            link.href = convertedURL
            link.download = "converted-image.png"
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
                <h1>JPG to PNG Converter</h1>
                <p>Choose or drop a JPEG file to convert it to PNG:</p>

                <div className="max-w-xl mx-auto">
                    <FileInput onDrop={handleDrop} accept=".jpg, .jpeg" />
                    {preview && <ImageDisplay src={preview} alt="JPEG Image" />}

                    {showConvertButton && (
                        <SubmitButton
                            text="Convert to PNG"
                            handleClick={handleImageConversion}
                        />
                    )}

                    {convertedURL && (
                        <>
                            <h3>PNG Image:</h3>
                            <ImageDisplay
                                src={convertedURL}
                                alt="Converted PNG"
                            />
                            {showDownloadButton && (
                                <SubmitButton
                                    text="Download PNG"
                                    handleClick={handleDownload}
                                />
                            )}
                        </>
                    )}
                </div>

                <div className="tool-content bg-gray-100 py-4 px-6 rounded-lg shadow-md mt-8">
                    <h2>About JPG to PNG Converter</h2>
                    <p>
                        The <b>JPG to PNG Converter</b> tool allows you to
                        easily convert JPEG images to PNG format. This is useful
                        when you need to maintain transparency or ensure
                        compatibility with applications that require PNG images.
                    </p>
                    <h2>Who Would Use JPG to PNG Converter?</h2>
                    <ul>
                        <li>
                            <b>Web Developers:</b> Developers optimizing images
                            for web performance.
                        </li>
                        <li>
                            <b>Graphic Designers:</b> Designers converting image
                            formats for different projects.
                        </li>
                        <li>
                            <b>Photographers:</b> Photographers preparing images
                            for digital distribution.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Page
