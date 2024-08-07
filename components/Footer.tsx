import Image from "next/image"
import Link from "next/link"
import { footerLinks } from "@/constants"
import { Mode } from "@/components/"

const Footer = () => (
    <footer className="flex flex-col text-black-100  mt-5 border-t border-gray-100">
        <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
            <div className="flex flex-col justify-start items-start gap-6">
                <Link href={"/"}>
                    <Image
                        src="/bottom-logo.svg"
                        alt="logo"
                        width={300}
                        height={50}
                        className="object-contain"
                    />
                </Link>
                <p className="text-base text-gray-700">
                    Made with ❤️ by
                    <Link
                        href={"https://x.com/waelnassaf"}
                        className="text-blue-400"
                        target="_blank"
                    >
                        {" "}
                        Wael Assaf
                    </Link>
                </p>
            </div>

            <div className="footer__links">
                {footerLinks.map((item) => (
                    <div key={item.title} className="footer__link">
                        <h3 className="font-bold">{item.title}</h3>
                        <div className="flex flex-col gap-5">
                            {item.links.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.url}
                                    className="text-gray-500"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
            <p>
                @{new Date().getFullYear()} ToolsForNoobs. All rights reserved
            </p>

            <div className="footer__copyrights-link">
                <Link href="/privacy-policy" className="text-gray-500">
                    Privacy Policy
                </Link>
                <Link href="/terms-n-conditions" className="text-gray-500">
                    Terms & Condition
                </Link>
                <Link href="/disclaimer" className="text-gray-500">
                    Disclaimer
                </Link>
            </div>
        </div>
        {/*<Mode />*/}
    </footer>
)

export default Footer
