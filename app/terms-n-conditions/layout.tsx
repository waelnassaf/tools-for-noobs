import { Metadata } from "next"
import React from "react"
import { sitename } from "@/constants"

export const metadata: Metadata = {
    title: `${sitename} - Terms & Conditions`,
    description: "Get to know our terms and conditions.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
