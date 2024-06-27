import "./globals.css"
import { Header, Navbar, Footer, Divider, GoogleAdsense } from "@/components"
import ThemeContextProvider from "@/contexts/ThemeContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const metadata = {
    title: {
        template: "%s - Tools for Noobs",
        default: "Tools for Noobs - A pro toolset, made simple.",
    },
    description: "A toolset designed for many easy-to-hard use cases.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeContextProvider>
            <html lang="en">
                <GoogleAdsense pId="5272830813458540" />

                <body className="font-inter dark:bg-white">
                    <main className="overflow-hidden">
                        <Header />
                        <Divider />
                        <Navbar />
                        <Divider />
                        {children}
                        <ToastContainer />
                        <Footer />
                    </main>
                </body>
            </html>
        </ThemeContextProvider>
    )
}
