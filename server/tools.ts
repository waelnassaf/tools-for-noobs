"use server"

import db from "@/db/db"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { ToolSchema } from "@/schemas"
import { slugify } from "@/utils"

export async function createTool(prevState: unknown, formData: FormData) {
    const result = ToolSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!result.success) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    try {
        await db.tool.create({
            data: {
                id: await getLatestToolId(),
                isAvailableForPublic: true,
                name: data.name,
                description: data.description,
                slug: slugify(data.name),
                categoryId: data.categoryId,
            },
        })
    } catch (e) {
        console.log(e)
    }

    revalidatePath("/")
    revalidatePath("/admin/tools")
    redirect("/admin/tools")
}

export async function updateTool(
    id: number,
    prevState: unknown,
    formData: FormData
) {
    const result = ToolSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!result.success) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const tool = await db.tool.findUnique({ where: { id } })

    if (!tool) {
        notFound()
    }

    await db.tool.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
        },
    })

    revalidatePath("/")
    revalidatePath("/admin/tools")

    redirect("/admin/tools")
}

export async function toggleToolAvailability(
    slug: string,
    isAvailableForPublic: boolean
) {
    await db.tool.update({ where: { slug }, data: { isAvailableForPublic } })

    revalidatePath("/")
    revalidatePath("/products")
}

export async function deleteTool(slug: string) {
    const tool = await db.tool.delete({ where: { slug } })

    if (tool == null) return notFound()

    revalidatePath("/")
    revalidatePath("/admin/tools")
}

async function getLatestToolId() {
    try {
        // Retrieve the most recent tool based on the highest ID
        const latestTool = await db.tool.findFirst({
            orderBy: {
                id: "desc", // Sort by ID in descending order to get the latest
            },
        })

        // Check if a tool was found
        if (latestTool) {
            return latestTool.id + 1 // Increment the latest ID and return it
        } else {
            // If no tool is found, start with ID 1
            return 1
        }
    } catch (error) {
        console.error("Error fetching the latest tool ID:", error)
        throw error // Rethrow the error for handling by calling function or middleware
    }
}
