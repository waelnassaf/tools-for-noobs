const toolName: string = "Grayscale Image"
import type { Metadata } from "next"
import { getDesc } from "@/utils"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: toolName,
        description: await getDesc(toolName),
    }
}

//Weeks of the day
const weeks = []

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
