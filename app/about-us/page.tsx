"use client"

import { Breadcrumbs, SubmitButton } from "@/components"
import { useRouter } from "next/navigation"

const AboutPage = () => {
    const router = useRouter()

    const handleNavigate = () => {
        router.push("/")
    }

    const pages = ["Home", "About Us"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="bg-gray-200 h-screen">
                <div className="w-3/4 mx-auto py-6">
                    <h1 className="text-3xl mb-4">
                        About <b>Tools for Noobs</b>
                    </h1>
                    <p className="prose">
                        characters in a text to AI-Powered solutions like
                        summarizing an entire article by just pasting the link
                        to it.
                    </p>
                    &nbsp;
                    <p>
                        This site was built for people who want a quick and easy
                        way to perform many tasks from simple ones like counting
                        lines to powerful tools like an essay summarizer
                    </p>{" "}
                    <SubmitButton
                        text="View Site"
                        handleClick={handleNavigate}
                    />
                </div>
            </div>
        </>
    )
}

export default AboutPage
