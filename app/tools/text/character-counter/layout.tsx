import { sitename } from "@/constants"
const toolName = "Character Counter"
import { getDesc } from "@/utils"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${toolName} - ${sitename}`,
        description: await getDesc(toolName, 1),
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
