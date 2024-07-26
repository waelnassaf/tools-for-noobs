import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Get to know our policies.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
