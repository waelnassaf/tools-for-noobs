import { Breadcrumbs, ToolsByCat } from "@/components"
import { SearchParamsProps } from "@/types"
import { Metadata } from "next"
import { sitename } from "@/constants"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Online Tools - ${sitename}`,
        description: "Use our large collection of online tools.",
    }
}

export default async function Page({ searchParams }: SearchParamsProps) {
    const pages = ["Home", "Online Tools"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Online Tools</h1>
                    <p>Use our large collection of online tools.</p>
                </div>

                <ToolsByCat catId={3} limit={searchParams.limit} />
            </div>
        </>
    )
}
