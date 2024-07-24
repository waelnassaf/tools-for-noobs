import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description: "Get to know our terms and conditions.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
