"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    // Access the router hook
    const router = useRouter()

    return (
        <main className="flex h-screen flex-col items-center justify-start mt-10">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={() => router.refresh()}
            >
                Try again
            </button>
        </main>
    )
}
