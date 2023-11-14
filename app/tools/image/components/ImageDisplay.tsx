import React from "react"
import Image from "next/image"

interface ImageDisplayProps {
    src: string
    alt: string
}

//TODO:: Check how to remove unnecessary with/height
const ImageDisplay = ({ src, alt }: ImageDisplayProps) => {
    return (
        <>
            <Image
                src={src}
                alt={alt}
                width={"100"}
                height={"100"}
                style={{
                    objectFit: "cover",
                    height: "300px",
                    width: "100%",
                }}
            />
        </>
    )
}

export default ImageDisplay
