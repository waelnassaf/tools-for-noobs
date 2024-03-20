import { Metadata } from "next"
import React from "react"
import { sitename } from "@/constants"

export const metadata: Metadata = {
    title: `${sitename} - Privacy Policy`,
    description: "Get to know our policies.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
