import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Tools for Noobs Application",
        short_name: "ToolsForNoobs",
        description: "A toolset designed for many easy-to-hard use cases.",
        start_url: "/",
        display: "standalone",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    }
}
