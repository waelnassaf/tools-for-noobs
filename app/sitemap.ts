import { MetadataRoute } from "next"
import { ToolProps } from "@/types"
import { getTools } from "@/server/actions"
//page-sitemap
//tools-sitemap
//categories-sitemap

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // fetch data
    const data = await getTools({})

    const sitemap = [
        {
            url: "https://toolsfornoobs.com",
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/tools/text",
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/tools/image",
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/tools/online",
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/about-us",
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://toolsfornoobs.com/privacy-policy",
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://toolsfornoobs.com/terms-n-conditions",
            changeFrequency: "monthly",
            priority: 0.8,
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
                category = "online"
            }

            sitemap.push({
                url: `https://toolsfornoobs.com/tools/${category}/${tool.slug}`,
                changeFrequency: "weekly",
                priority: 1,
            })
        })
    // @ts-ignore
    return sitemap
}
