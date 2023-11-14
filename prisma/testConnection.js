const { PrismaClient, sql } = require("@prisma/client")

async function testConnection() {
    const prisma = new PrismaClient()

    try {
        await prisma.$connect()
        const result = await prisma.$queryRaw(sql`SELECT 1 + 1`)
        console.log("Connection test successful!")
        console.log("Result:", result)
    } catch (error) {
        console.error("Failed to connect to the database:", error)
    } finally {
        await prisma.$disconnect()
    }
}

testConnection()
