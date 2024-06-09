import React from "react"
import Link from "next/link"

interface BreadcrumbsProps {
    pages: string[]
}

const breadcrumbsLinks: { [key: string]: string } = {
    Home: "/",
    "Text Tools": "/tools/text",
    "Image Tools": "/tools/image",
    "AI Tools": "/tools/ai",
}

const Breadcrumbs = ({ pages }: BreadcrumbsProps) => (
    <div className="text-sm breadcrumbs mb-5 mt-12 padding-x padding-b max-width">
        <ul className="flex-wrap">
            {pages.map((page, index) => (
                <li key={index}>
                    {index === pages.length - 1 ? (
                        <span>{page}</span>
                    ) : (
                        <Link href={breadcrumbsLinks[page] || "/"}>{page}</Link>
                    )}
                </li>
            ))}
        </ul>
    </div>
)

export default Breadcrumbs
