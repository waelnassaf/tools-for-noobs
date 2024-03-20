"use client"

import Image from "next/image"
import React, { useState } from "react"
import { SearchTool } from "@/components"
import { useRouter } from "next/navigation"

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
            src={"/magnifying-glass.svg"}
            alt={"magnifying glass"}
            width={40}
            height={40}
            className="object-contain"
        />
    </button>
)

const SearchBar = () => {
    const [query, setQuery] = useState("")

    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        updateSearchParams(query.toLowerCase())
    }

    const updateSearchParams = (q: string) => {
        const searchParams = new URLSearchParams(window.location.search)
        if (q) {
            searchParams.set("sq", q)
        } else {
            searchParams.delete("sq")
        }

        const newPathname = `${
            window.location.pathname
        }?${searchParams.toString()}`
        router.push(newPathname, { scroll: false })
    }

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchTool selected={query} setSelected={setQuery} />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    )
}

export default SearchBar
