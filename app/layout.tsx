import "./globals.css"
import { GoogleAdsense } from "@/components"
import ThemeContextProvider from "@/contexts/ThemeContext"
import "react-toastify/dist/ReactToastify.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import React from "react"
import NextTopLoader from "nextjs-toploader"

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <ThemeContextProvider>
                <html lang="en">
                    <GoogleAdsense pId="5272830813458540" />
                    <body className="font-inter dark:bg-white">
                        <NextTopLoader
                            color="#0099de"
                            height={2}
                            shadow="0 0 3px #0099de,0 0 1px #0099de"
                            showSpinner={false}
                        />
                        {children}
                    </body>
                </html>
            </ThemeContextProvider>
        </SessionProvider>
    )
}
