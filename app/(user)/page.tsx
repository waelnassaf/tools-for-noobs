import { SearchParamsProps } from "@/types"
import { CustomFilter, SearchBar, ToolCard, ShowMore } from "@/components"
import { categoriesOfTools } from "@/constants"
import { getTools } from "@/server/actions"

//Using the searchParams prop on a Page will opt the page into dynamic rendering at request time.
export default async function Home({ searchParams }: SearchParamsProps) {
    const allTools = await getTools({
        sq: searchParams.sq,
        cat: Number(searchParams.cat),
        limit: searchParams.limit,
    })

    const isDataEmpty =
        !allTools || !Array.isArray(allTools) || allTools.length < 1

    return (
        <div className="mt-12 padding-x padding-y max-width">
            <div className="home__text-container">
                <h1 className="text-4xl font-extrabold">Search Tools</h1>
                <p>View and search our large collection of useful tools.</p>
            </div>

            <div className="home__filters px-6">
                <SearchBar />

                <div className="home__filter-container">
                    <CustomFilter title="cat" options={categoriesOfTools} />
                </div>
            </div>

            {!isDataEmpty ? (
                <section>
                    <div className="home__cards-wrapper">
                        {allTools?.map((tool, index) => (
                            <ToolCard key={index} tool={tool} />
                        ))}
                    </div>
                    <ShowMore
                        pageNumber={(searchParams.limit || 9) / 9}
                        isNext={(searchParams.limit || 9) > allTools.length}
                    />
                </section>
            ) : (
                <div className="home__error-container">
                    <h2 className="text-black text-xl font-bold">
                        Oops, no results! Try searching with different query.
                    </h2>
                </div>
            )}
        </div>
    )
}
