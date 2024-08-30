import { PrismaClient } from "@prisma/client"

declare global {
    namespace NodeJS {
        interface Global {}
    }
}

// Add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development" || "production")
    global.prisma = prisma

export default prisma
