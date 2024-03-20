import { getTools } from "@/server/actions"
import { ShowMore, ToolCard } from "@/components"

const ToolsByCat = async ({
    catId,
    limit,
}: {
    catId: number
    limit?: number
}) => {
    const tools = await getTools({
        cat: catId,
        limit: limit,
    })

    const isDataEmpty = !tools || !Array.isArray(tools) || tools.length < 1

    return (
        <>
            {!isDataEmpty ? (
                <section>
                    <div className="home__cards-wrapper">
                        {tools?.map((tool, index) => (
                            <ToolCard key={index} tool={tool} />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="home__error-container">
                    <h2 className="text-black text-xl font-bold">
                        Oops, no results!
                    </h2>
                </div>
            )}
            <ShowMore
                pageNumber={(limit || 9) / 9}
                isNext={(limit || 9) > tools.length}
            />
        </>
    )
}

export default ToolsByCat
