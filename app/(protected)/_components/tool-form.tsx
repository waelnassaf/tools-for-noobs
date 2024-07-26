"use client"

import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTool, updateTool } from "@/server/tools"
import { formatCurrency } from "@/lib/formatters"
import { useFormState, useFormStatus } from "react-dom"
import { Tool } from ".prisma/client"
import Image from "next/image"

export const ToolForm = ({ tool }: { tool?: Tool | null }) => {
    const [error, action] = useFormState(
        tool == null ? createTool : updateTool.bind(null, tool.id),
        {}
    )

    const { pending } = useFormStatus()

    return (
        <form className="space-y-4 mb-5" action={action}>
            <label className="form-control w-full" htmlFor="name">
                <div className="label">
                    <span className="label-text">Tool Name</span>
                </div>
                <input
                    type="text"
                    id="name"
                    className={`input input-bordered w-full ${error.name && "input-error"}`}
                    placeholder="Line Counter"
                    name="name"
                    disabled={pending}
                    defaultValue={tool?.name || ""}
                />
                {error?.name && (
                    <p className="text-red-700 mt-2 text-sm">{error.name}</p>
                )}
            </label>
            <label className="form-control w-full" htmlFor="description">
                <div className="label">
                    <span className="label-text">Description</span>
                </div>
                <textarea
                    className={`textarea textarea-bordered w-full ${error.description && "textarea-error"}`}
                    placeholder="A tool that counts lines..."
                    name="description"
                    id="description"
                    disabled={pending}
                    defaultValue={tool?.description}
                />
                {error?.description && (
                    <p className="text-red-700 mt-2 text-sm">
                        {error.description}
                    </p>
                )}
            </label>
            <label className="form-control w-full" htmlFor="category">
                <div className="label">
                    <span className="label-text">Category</span>
                </div>
                <select
                    className="select select-primary w-full max-w-xs"
                    name="categoryId"
                    id="category"
                    disabled={pending}
                >
                    <option disabled selected>
                        Select Category
                    </option>
                    <option value="1" selected={tool?.categoryId == 1}>
                        Text
                    </option>
                    <option value="2" selected={tool?.categoryId == 2}>
                        Image
                    </option>
                    <option value="3" selected={tool?.categoryId == 3}>
                        AI
                    </option>
                </select>
                {error?.categoryId && (
                    <p className="text-red-700 mt-2 text-sm">
                        {error.categoryId}
                    </p>
                )}
            </label>
            {/*<FormError message={"There are errors"} />*/}
            {/*/!*<FormSuccess message={"Product added succesfully"} />*!/*/}
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className={`btn btn-neutral px-5`}
            disabled={pending}
        >
            {pending ? "Saving..." : "Save"}
        </button>
    )
}
