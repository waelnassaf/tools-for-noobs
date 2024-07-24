import Link from "next/link"
import { Breadcrumbs } from "@/components"

const Page = () => {
    const pages = ["Home", "Privacy Policy"]

    return (
        <>
            <Breadcrumbs pages={pages} />

            <div className="bg-gray-100">
                <div className="container mx-auto p-8">
                    <h1 className="text-2xl font-semibold mb-4">
                        Privacy Policy
                    </h1>
                    <div className="prose prose-lg mb-8">
                        <h2>General</h2>
                        <p>
                            We do not sell, rent or share collected information
                            from this website in ways different from what is
                            written here.
                        </p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>Google Analytics</h2>
                        <p>
                            ToolsForNoobs uses Google Analytics to monitor site
                            usage in order to improve the quality of the pages.
                            Google Analytics uses cookies. Google Analytics
                            collects statistical, non-personal data.
                        </p>
                        <p>
                            Read how Google uses data when you use our
                            partners&apos; sites or apps.
                        </p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>Google AdSense</h2>
                        <p>
                            Third-party vendors, including Google, use cookies
                            to serve ads based on a user&apos;s prior visits to
                            this website or other websites.
                        </p>
                        <p>
                            See:
                            <a
                                target="_blank"
                                href="https://developers.google.com/third-party-ads/googleads-vendors"
                            >
                                Google Ads Certified External Vendors
                            </a>
                        </p>
                        <p>
                            Google&apos;s use of advertising cookies enables it
                            and its partners to serve ads to the users based on
                            their visit to your sites and/or other sites on the
                            Internet.
                        </p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>Content Delivery</h2>
                        <p>
                            toolsfornoobs.com uses Cloudflare for website
                            content delivery. Cloudflare may use several cookies
                            to support its functionality. See:{" "}
                            <a
                                target="_blank"
                                href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/"
                            >
                                Cloudflare Cookies
                            </a>
                            .
                        </p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>Application Data</h2>
                        <p>
                            ToolsForNoobs may save user&apos;s settings or
                            user&apos;s application data in the browser&apos;s
                            local storage and not in our server, so next time
                            the user will enter the page, the data will be
                            available to the user. The Application data can be
                            deleted by the user by clearing the input data or by
                            clearing the browser&apos;s Cache.
                        </p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>User&apos;s Feedback</h2>
                        <p>
                            User&apos;s feedback is only used to improve
                            toolsfornoobs.com.
                        </p>
                        <p>The feedback is stored in Gmail account.</p>
                        <p>
                            The user&apos;s feedback about the website will not
                            be given to any third party and will be deleted
                            after handling.
                        </p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>Social Share Buttons</h2>
                        <p>
                            ToolsForNoobs pages may contain social share
                            buttons. When the user presses the share button, it
                            will share information, like URL and other user
                            contents to the social web.
                        </p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>Changes to this Privacy Policy</h2>
                        <p>This privacy policy may change from time to time.</p>
                    </div>

                    <div className="prose prose-lg mb-8">
                        <h2>Contact Information</h2>
                        <p>
                            For questions about this privacy policy, you may
                            contact us on: <Link href="/contact">Contact</Link>{" "}
                            page.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
