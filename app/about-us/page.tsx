"use client"

import { SubmitButton } from "@/components"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()

    const handleNavigate = () => {
        router.push("/")
    }

    return (
        <div className="bg-gray-200">
            <div className="w-3/4 mx-auto p-5">
                <h1 className="text-3xl mb-4">
                    About <b>Tools for Noobs</b>
                </h1>
                <p className={"prose"}>
                    This site was built for people who want a quick and easy way
                    to perform many tasks from simple ones like counting
                    characters in a text to AI-Powered solutions like
                    summarizing an entire article by just pasting the link to
                    it.
                </p>
                <SubmitButton text="View Site" handleClick={handleNavigate} />
            </div>
        </div>
    )
}

export default Page
