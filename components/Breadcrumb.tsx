import React from "react"
import Link from "next/link"

interface BreadcrumbProps {
    pages: string[]
}

const breadcrumbLinks: { [key: string]: string } = {
    Home: "/",
    "Text Tools": "/tools/text",
    "Image Tools": "/tools/image",
    "Online Tools": "/tools/online",
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pages }) => (
    <div className="text-sm breadcrumbs mb-5">
        <ul>
            {pages.map((page, index) => (
                <li key={index}>
                    {index === pages.length - 1 ? (
                        <span>{page}</span>
                    ) : (
                        <Link href={breadcrumbLinks[page] || "/"}>{page}</Link>
                    )}
                </li>
            ))}
        </ul>
    </div>
)

export default Breadcrumb
