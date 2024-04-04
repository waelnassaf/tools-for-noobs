import { sitename } from "@/constants"
const toolName = "Text Case Converter"
import { getDesc } from "@/utils"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${toolName} - ${sitename}`,
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
