import React from "react"

import type { Metadata } from "next"
import { getToolBySlug } from "@/utils"

export const generateMetadata = async ({
    params,
}: {
    params: { slug: string[] }
}): Promise<Metadata> => {
    const tool = await getToolBySlug(params.slug[1])
    // @ts-ignore
    // const { name, description } = tool

    return {
        title: tool?.name,
        description: tool?.description,
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
