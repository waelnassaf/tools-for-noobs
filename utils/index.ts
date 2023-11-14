// imageConverter.js

import { FilterProps } from "@/types"

export async function fetchTools(filters: FilterProps) {
    const { sq, cat, limit } = filters

    let url = "http://localhost:3000/api/tools"

    if (sq || cat || limit) {
        url += "?"

        if (sq) {
            url += `sq=${sq}&`
        }

        if (cat) {
            url += `cat=${cat}&`
        }

        if (limit) {
            url += `limit=${limit}&`
        }

        // Remove the trailing '&' character
        url = url.slice(0, -1)
    }

    const response = await fetch(url, {})
    return await response.json()
}

export async function findCat(id: number) {
    const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
        cache: "no-cache",
    })

    const data = await response.json()
    return data.name
}

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
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search)

    // Set the specified search parameter to the given value
    searchParams.set(type, value)

    // Set the specified search parameter to the given value
    return `${window.location.pathname}?${searchParams.toString()}`
}

export const getSearchParam = (name: string) => {
    if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get(name)
    }
}

export const deleteSearchParams = (type: string) => {
    // Set the specified search parameter to the given value
    const newSearchParams = new URLSearchParams(window.location.search)

    alert(newSearchParams)

    // Delete the specified search parameter
    newSearchParams.delete(type.toLocaleLowerCase())

    // Construct the updated URL pathname with the deleted search parameter
    return `${window.location.pathname}?${newSearchParams.toString()}`
}

export async function getDesc(toolName: string, toolCat: number) {
    const data = await fetch(
        `http://localhost:3000/api/tools?sq=${toolName}&cat=${toolCat}`
    ).then((res) => res.json())

    return data[0].desc
}
