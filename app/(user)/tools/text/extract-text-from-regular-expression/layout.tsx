import React from "react"

const toolName = "Extract Text From Regular Expression"
import { getDesc } from "@/utils"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${toolName} Online`,
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
