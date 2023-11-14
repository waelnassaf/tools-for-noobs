import { MetadataRoute } from "next"
import { fetchTools } from "@/utils"
import { ToolProps } from "@/types"
//page-sitemap
//tools-sitemap
//categories-sitemap

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // fetch data
    const data = await fetch(`http://localhost:3000/api/tools`).then((res) =>
        res.json()
    )

    const sitemap = [
        {
            url: "https://toolsfornoobs.com",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/tools/text",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/tools/image",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/tools/online",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://toolsfornoobs.com/about-us",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://toolsfornoobs.com/privacy-policy",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://toolsfornoobs.com/terms-n-conditions",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ]

    // Map through the data array and append new objects to the sitemap array
    // @ts-ignore
    data.forEach((tool) => {
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
            lastModified: new Date(tool.updatedAt),
            changeFrequency: "weekly",
            priority: 1,
        })
    })
    // @ts-ignore
    return sitemap
}
