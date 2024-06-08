import "./globals.css"
import { Header, Navbar, Footer, Divider } from "@/components"
import ThemeContextProvider from "@/contexts/ThemeContext"

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
                <body className="font-inter dark:bg-white">
                    <main className="overflow-hidden">
                        <Header />
                        <Divider />
                        <Navbar />
                        <Divider />
                        {children}
                        <Footer />
                    </main>
                </body>
            </html>
        </ThemeContextProvider>
    )
}
