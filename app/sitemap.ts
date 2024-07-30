import { MetadataRoute } from "next"
import { ToolProps } from "@/types"
import { getTools } from "@/server/actions"

//page-sitemap
//tools-sitemap
//categories-sitemap
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data = await getTools({ limit: 1000 })

    const sitemap = [
        {
            url: "https://toolsfornoobs.com",
        },
        {
            url: "https://toolsfornoobs.com/tools/text",
        },
        {
            url: "https://toolsfornoobs.com/tools/image",
        },
        {
            url: "https://toolsfornoobs.com/tools/ai",
        },
        {
            url: "https://toolsfornoobs.com/about-us",
        },
        {
            url: "https://toolsfornoobs.com/privacy-policy",
        },
        {
            url: "https://toolsfornoobs.com/terms-n-conditions",
        },
    ]

    // Map through the data array and append new objects to the sitemap array
    data &&
        data.forEach((tool: ToolProps) => {
            let category = ""

            if (tool.categoryId === 1) {
                category = "text"
            } else if (tool.categoryId === 2) {
                category = "image"
            } else if (tool.categoryId === 3) {
                category = "ai"
            }

            sitemap.push({
                url: `https://toolsfornoobs.com/tools/${category}/${tool.slug}`,
            })
        })
    // @ts-ignore
    return sitemap
}
