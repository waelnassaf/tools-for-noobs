import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: `AI Tools`,
    description: "Use our large collection of AI tools.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
