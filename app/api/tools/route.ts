import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client"
import { slugify } from "@/utils"

interface ToolQuery {
    where: {
        name?: {
            contains: string
        }
        categoryId?: number
    }
}

const getAllTools = async (
    sq: string | null,
    cat: string | null,
    limit: string | number
) => {
    try {
        const query: ToolQuery = {
            where: {},
        }

        if (sq !== null) {
            query.where.name = {
                contains: sq,
            }
        }

        if (cat !== null && !isNaN(Number(cat)) && Number(cat) !== 0) {
            query.where.categoryId = Number(cat)
        }

        return await prisma.tool.findMany(query)
    } catch (error) {
        console.error("Error retrieving tools:", error)
        throw error
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const { name, description, categoryId } = await req.json()

    try {
        const newTool = await prisma.tool.create({
            data: {
                name,
                description,
                slug: slugify(name),
                categoryId,
            },
        })
        return NextResponse.json({ cat: newTool, error: null }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, user: null })
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const sq = url.searchParams.get("sq") || null
        const cat = url.searchParams.get("cat") || null
        const limit = url.searchParams.get("limit") || 10
        const tools = await getAllTools(sq, cat, limit)
        return NextResponse.json(tools, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message, user: null })
    }
}
