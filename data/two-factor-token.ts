import db from "@/db/db"

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        return await db.twoFactorToken.findUnique({
            where: { token },
        })
    } catch (error) {
        return null
    }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        return await db.twoFactorToken.findFirst({
            where: { email },
        })
    } catch (error) {
        return null
    }
}
