import db from "@/db/db"

import { ToolForm } from "@/app/(protected)/_components/tool-form"

export default async function EditProductPage({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const tool = await db.tool.findUnique({ where: { slug } })

    return (
        <>
            <h1 className="text-5xl my-5 font-bold">Edit Tool</h1>
            <ToolForm tool={tool} />
        </>
    )
}
