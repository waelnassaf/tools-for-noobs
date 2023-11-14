import { sitename } from "@/constants"
const toolName: string = "Grayscale Image"

import type { Metadata } from "next"
import { getDesc } from "@/utils"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${toolName} - ${sitename}`,
        description: await getDesc(toolName, 2),
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
