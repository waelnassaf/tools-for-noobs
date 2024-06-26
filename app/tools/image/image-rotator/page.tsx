"use client"

import { useState } from "react"
// @ts-ignore
import Jimp from "jimp/es"
import { SubmitButton, Breadcrumbs } from "@/components"
import { FileInput, ImageDisplay } from "../components"

const Page = () => {
    const [image, setImage] = useState<Jimp | null>(null)
    const [preview, setPreview] = useState<string>("")
    const [showRotateButtons, setShowRotateButtons] = useState(false)
    const [angle, setAngle] = useState<number>(0)
    const [rotatedImage, setRotatedImage] = useState<string>("")
    const [originalExtension, setOriginalExtension] = useState<string>("")

    const pages = ["Home", "Image Tools", "Image Rotator"]

    const handleDrop = (files: FileList) => {
        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            const ext = file.name.split(".").pop()

            reader.onload = async () => {
                const img = await Jimp.read(reader.result as string)
                setImage(img)
                setPreview(reader.result as string)
                setShowRotateButtons(true)
                setAngle(0) // Reset angle on new image upload
                if (ext) setOriginalExtension(ext) // Save the original file extension if it exists
            }

            reader.readAsDataURL(file)
        }
    }

    const handleRotate = (direction: "left" | "right") => {
        if (image) {
            const newAngle = direction === "left" ? angle - 90 : angle + 90
            setAngle(newAngle)
            image.rotate(direction === "left" ? -90 : 90)
            image.getBase64(Jimp.AUTO, (err: any, src: string) => {
                if (!err) {
                    setPreview(src)
                    setRotatedImage(src)
                }
            })
        }
    }

    const handleCustomRotate = () => {
        if (image) {
            image.rotate(angle)
            image.getBase64(Jimp.AUTO, (err: any, src: string) => {
                if (!err) {
                    setPreview(src)
                    setRotatedImage(src)
                }
            })
        }
    }

    const handleDownload = () => {
        if (rotatedImage) {
            const link = document.createElement("a")
            link.href = rotatedImage
            link.download = `rotated-image.${originalExtension}`
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
                <h1>Image Rotator</h1>
                <p>Upload an image to rotate it:</p>

                <div className="max-w-xl mx-auto">
                    <FileInput onDrop={handleDrop} accept="image/*" />
                    {preview && (
                        <ImageDisplay src={preview} alt="Uploaded Image" />
                    )}

                    {showRotateButtons && (
                        <>
                            <div className="flex gap-4 mt-4">
                                <SubmitButton
                                    text="Rotate Left"
                                    handleClick={() => handleRotate("left")}
                                />
                                <SubmitButton
                                    text="Rotate Right"
                                    handleClick={() => handleRotate("right")}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="number"
                                    className="input input-bordered"
                                    value={angle}
                                    onChange={(e) =>
                                        setAngle(Number(e.target.value))
                                    }
                                    placeholder="Enter angle"
                                />
                                <SubmitButton
                                    text="Rotate"
                                    handleClick={handleCustomRotate}
                                    className="ml-2"
                                />
                            </div>
                            <div className="mt-4">
                                <SubmitButton
                                    text="Download Image"
                                    handleClick={handleDownload}
                                />
                            </div>
                        </>
                    )}
                    <div className="divider"></div>
                </div>
                <div className="tool-content">
                    <h2>About Image Rotator</h2>
                    <p>
                        This tool <b>Image Rotator</b> is a convenient utility
                        for rotating images. Whether you&apos;re adjusting
                        photos, graphics, or any image files, this tool allows
                        you to rotate your images left or right by 90 degrees or
                        specify a custom angle. Simply upload your image, choose
                        the desired rotation, and download the rotated image
                        while preserving the original file extension.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Page
