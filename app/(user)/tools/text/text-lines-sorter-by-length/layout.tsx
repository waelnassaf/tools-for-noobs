import React from "react"

const toolName = "Text Lines Sorter By Length"
import { getDesc } from "@/utils"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: toolName,
        description: await getDesc(toolName),
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
