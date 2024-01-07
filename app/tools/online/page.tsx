import { getTools } from "@/server/actions"
import { ToolCard, ShowMore } from "@/components"

export default async function Page() {
    const allTools = await getTools({
        cat: 3,
    })

    const isDataEmpty =
        !allTools || !Array.isArray(allTools) || allTools.length < 1

    return (
        <div className="mt-12 padding-x padding-y max-width">
            <div className="home__text-container">
                <h1 className="text-4xl font-extrabold">Online Tools</h1>
                <p>Use our large collection of online tools.</p>
            </div>

            {!isDataEmpty ? (
                <section>
                    <div className="home__cards-wrapper">
                        {allTools?.map((tool, index) => (
                            <ToolCard key={index} tool={tool} />
                        ))}
                    </div>
                    {/*<ShowMore*/}
                    {/*    pageNumber={(searchParams.limit || 10) / 10}*/}
                    {/*    isNext={(searchParams.limit || 10) > allTools.length}*/}
                    {/*/>*/}
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
