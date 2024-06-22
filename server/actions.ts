"use server"

import prisma from "@/prisma/client"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

interface ToolQuery {
    where: {
        name?: {
            contains: string
        }
        categoryId?: number
    }
    take?: number
}

interface GetToolsParams {
    sq?: string
    cat?: number
    limit?: number
}

export const getTools = async ({ sq, cat, limit = 9 }: GetToolsParams = {}) => {
    try {
        const query: ToolQuery = {
            where: {},
        }

        if (sq) {
            query.where.name = {
                contains: sq,
            }
        }
        if (cat && !isNaN(Number(cat)) && Number(cat) !== 0) {
            query.where.categoryId = Number(cat)
        }

        if (!isNaN(Number(limit))) {
            query.take = Number(limit)
        }
        // throw new Error("Testing errors")

        // Fetching the tools from the database
        return await prisma.tool.findMany(query)
    } catch (error) {
        console.error("Error retrieving tools:", error)
        throw error
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials."
                default:
                    return "Something went wrong."
            }
        }
        throw error
    }
}
