import { Breadcrumbs, ShowMore, ToolsByCat } from "@/components"
import { SearchParamsProps } from "@/types"
import { getTools } from "@/server/actions"
import { Metadata } from "next"
import { sitename } from "@/constants"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Text Tools - ${sitename}`,
        description: "Use our large collection of text manipulation tools.",
    }
}

export default async function Page({ searchParams }: SearchParamsProps) {
    const pages = ["Home", "Text Tools"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Text Tools</h1>
                    <p>Use our large collection of text manipulation tools.</p>
                </div>
                <ToolsByCat catId={1} limit={searchParams.limit} />
            </div>
        </>
    )
}
