import { FilterProps } from "@/types"
import prisma from "@/prisma/client"

export function slugify(str: string) {
    return String(str)
        .normalize("NFKD") // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-") // remove consecutive hyphens
}

export const updateSearchParams = (type: string, value: any) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(type, value)
    return `${window.location.pathname}?${searchParams.toString()}`
}

export const getSearchParam = (name: string) => {
    if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get(name)
    }
}

export const deleteSearchParams = (type: string) => {
    const newSearchParams = new URLSearchParams(window.location.search)

    alert(newSearchParams)

    newSearchParams.delete(type.toLocaleLowerCase())

    return `${window.location.pathname}?${newSearchParams.toString()}`
}

export async function getDesc(toolName: string) {
    const tool = await prisma.tool.findUnique({
        where: {
            name: toolName,
        },
    })

    return tool ? tool.desc : null
}
