import { Metadata } from "next"
import React from "react"
import { sitename } from "@/constants"

export const metadata: Metadata = {
    title: `AI Tools - ${sitename}`,
    description: "Use our large collection of AI tools.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
