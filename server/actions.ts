"use server"

import prisma from "@/prisma/client"

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

export const getTools = async ({ sq, cat, limit }: GetToolsParams) => {
    try {
        // Building the query
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

        // Fetching the tools from the database
        return await prisma.tool.findMany(query)
    } catch (error) {
        console.error("Error retrieving tools:", error)
        throw error
    }
}
