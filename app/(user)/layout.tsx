import "../globals.css"
import { Header, Navbar, Footer, Divider, GoogleAdsense } from "@/components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import React from "react"
import { GoogleAnalytics } from "@next/third-parties/google"

export const metadata = {
    title: {
        template: "%s - Tools for Noobs",
        default: "Tools for Noobs - A pro toolset, made simple",
    },
    description: "A toolset designed for many easy-to-hard use cases.",
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <main className="overflow-hidden">
                <Header />
                <Divider />
                <Navbar />
                <Divider />
                {children}
                <ToastContainer />
                <Footer />
            </main>
            <GoogleAnalytics gaId="G-P5T3KLEN4L" />
        </>
    )
}
