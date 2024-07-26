import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Text Tools",
    description: "Use our large collection of text manipulation tools.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
