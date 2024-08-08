import { Metadata } from "next"
import { getToolBySlug } from "@/utils"

const page = async ({ params }: { params: { slug: string[] } }) => {
    // const tool = await getToolBySlug(params.slug[1])
    const tool = await getToolBySlug("keyword-extractor")
    // @ts-ignore
    console.log(tool?.name, tool?.description)
}

export default page
