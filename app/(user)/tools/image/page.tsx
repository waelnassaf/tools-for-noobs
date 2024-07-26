import { Breadcrumbs, ToolsByCat } from "@/components"
import { SearchParamsProps } from "@/types"

export default async function Page({ searchParams }: SearchParamsProps) {
    const pages = ["Home", "Image Tools"]

    return (
        <>
            <Breadcrumbs pages={pages} />

            <div className="mt-12 padding-x padding-b max-width">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Image Tools</h1>
                    <p>Use our large collection of image manipulation tools.</p>
                </div>
                <ToolsByCat catId={2} limit={searchParams.limit} />
            </div>
        </>
    )
}
