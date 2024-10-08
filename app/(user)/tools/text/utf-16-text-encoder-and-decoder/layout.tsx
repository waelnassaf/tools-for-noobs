const toolName = "UTF-16 Text Encoder and Decoder"
import type { Metadata } from "next"
import { getDesc } from "@/utils"

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
