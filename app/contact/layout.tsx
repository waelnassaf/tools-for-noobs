import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Have a thought on your mind? Share it with us.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
