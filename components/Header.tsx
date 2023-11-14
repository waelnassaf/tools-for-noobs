import Link from "next/link"
import Image from "next/image"

import Logo from "@/public/logo.png"
import AdBanner from "@/public/adsense.png"

const Header = () => {
    return (
        <header className="py-3">
            <div className="flex-between max-w-[1440px] mx-auto px-6">
                <Link href="/" className="mx-auto pt-4 lg:mx-0">
                    <Image
                        src={Logo}
                        alt="Website Logo"
                        height={150}
                        width={250}
                        priority
                    />
                </Link>

                <Link
                    href="https://google.com"
                    className="hidden lg:block col-span-2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src={AdBanner}
                        alt="Header Logo"
                        height={90}
                        width={730}
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header
