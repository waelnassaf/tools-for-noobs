import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Disclaimer",
    description:
        "Important message to visitors before they use tools on this site.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
