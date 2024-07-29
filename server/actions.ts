"use server"

import db from "@/db/db"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

interface ToolQuery {
    where: {
        name?: {
            contains: string
        }
        categoryId?: number
        isAvailableForPublic?: boolean
    }
    take?: number
}

interface GetToolsParams {
    sq?: string
    cat?: number
    limit?: number
    includeNonActive?: boolean
}

export const getTools = async ({
    sq,
    cat,
    limit = 9,
    includeNonActive = false,
}: GetToolsParams = {}) => {
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
        if (!includeNonActive) {
            query.where.isAvailableForPublic = true
        }

        if (!isNaN(Number(limit))) {
            query.take = Number(limit)
        }
        // throw new Error("Testing errors")

        // Fetching the tools from the database
        return await db.tool.findMany(query)
    } catch (error) {
        console.error("Error retrieving tools:", error)
        throw error
    }
}
