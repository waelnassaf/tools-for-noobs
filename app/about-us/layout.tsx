import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "About Us",
    description: "Get to know our mission.",
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
