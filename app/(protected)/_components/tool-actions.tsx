"use client"

import { useTransition } from "react"
import { deleteTool, toggleToolAvailability } from "@/server/tools"
import { useRouter } from "next/navigation"
import clsx from "clsx"

export function ActiveToggleDropdownItem({
    slug,
    isAvailableForPublic,
}: {
    slug: string
    isAvailableForPublic: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <li
            onClick={() => {
                startTransition(async () => {
                    await toggleToolAvailability(slug, !isAvailableForPublic)
                    router.refresh()
                })
            }}
            className={clsx(
                isPending && "pointer-events-none opacity-20",
                "py-2 cursor-pointer"
            )}
        >
            {isAvailableForPublic ? "Deactivate" : "Activate"}
        </li>
    )
}

export function DeleteDropdownItem({ slug }: { slug: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <li
            onClick={() => {
                startTransition(async () => {
                    await deleteTool(slug)
                    router.refresh()
                })
            }}
            className={clsx(
                isPending && "pointer-events-none opacity-20",
                "text-red-500 py-2 cursor-pointer"
            )}
        >
            Delete
        </li>
    )
}
