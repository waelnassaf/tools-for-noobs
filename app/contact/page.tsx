"use client"

import { Breadcrumbs, SubmitButton } from "@/components"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const handleClick = () => {
        toast.success("Your message is received! We'll get to you soon")
        router.push("/")
    }
    const pages = ["Home", "Contact Us"]

    return (
        <>
            <Breadcrumbs pages={pages} />

            <section className="bg-camel-100 py-5 px-3 my-5 w-1/2 mx-auto">
                <h1 className="text-2xl">
                    Wanna tell us something? Send us an email about it.
                </h1>

                <form className="my-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="block w-full
                        focus:outline-0 py-4 px-2
                        rounded my-5
                        border-black-100
                        border"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="block w-full
                        focus:outline-0 py-4 px-2
                        rounded my-5
                        border-black-100
                        border"
                    />
                    <textarea
                        placeholder="Your Message..."
                        className="block w-full
                        focus:outline-0
                        h-[200px]
                        p-2
                        rounded my-5
                        border-black-100
                        border"
                    />
                    <SubmitButton
                        text="Send"
                        handleClick={handleClick}
                        type="submit"
                    />
                </form>
            </section>
        </>
    )
}

export default Page
