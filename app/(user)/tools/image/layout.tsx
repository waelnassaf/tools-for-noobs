import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: {
        template: "%s - Image Tools",
        default: "Image Tools",
    },
    description: "Use our large collection of image manipulation tools.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
