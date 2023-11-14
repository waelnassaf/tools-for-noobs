import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const category = await prisma.category.findUnique({
        where: {
            id: Number(params.id),
        },
    })
    return new Response(JSON.stringify(category), { status: 200 })
}
