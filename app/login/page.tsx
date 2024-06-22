// "use client"

import Logo from "@/public/top-logo.svg"
import { LoginForm } from "@/components"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login",
    description: "Log in to save your work",
}

export default function Page() {
    return (
        <main className="flex items-center justify-center md:h-screen mt-12">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-36 w-full items-end rounded-lg bg-light-white-100 p-3">
                    <div className="w-32 text-white md:w-36 mx-auto">
                        <Link href="/">
                            <Image
                                src={Logo}
                                alt="Website Logo"
                                height={0}
                                width={0}
                                className="h-[100px] w-[250px]"
                                priority
                            />
                        </Link>
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    )
}
