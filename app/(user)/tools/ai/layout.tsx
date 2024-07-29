import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: {
        template: "%s - AI Tools",
        default: "AI Tools",
    },
    description: "Use our large collection of AI tools.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
