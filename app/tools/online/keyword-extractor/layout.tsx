import { sitename } from "@/constants"
const toolName: string = "Keyword Extractor"

import type { Metadata } from "next"
import { getDesc } from "@/utils"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${toolName} - ${sitename}`,
        description: await getDesc(toolName, 3),
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
