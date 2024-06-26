import { Breadcrumbs } from "@/components"
import Link from "next/link"

const Page = () => {
    const pages = ["Home", "Disclaimer"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="bg-gray-100">
                <div className="container mx-auto p-8">
                    <h1 className="text-2xl font-semibold mb-4">
                        Disclaimer for ToolsForNoobs
                    </h1>
                    <div className="prose prose-lg">
                        <p>
                            Please read this disclaimer carefully before using
                            ToolsForNoobs website operated by Wael Assaf.
                        </p>

                        <h2>Introduction</h2>
                        <p>
                            By accessing and using the Service, you accept and
                            agree to be bound by the terms and conditions of
                            this disclaimer. If you disagree with any part of
                            this disclaimer, you must not use the Service.
                        </p>

                        <h2>No Warranties</h2>
                        <p>
                            The information and tools on the Service are
                            provided on an (as is) and as available basis.
                            ToolsForNoobs makes no warranties, expressed or
                            implied, and hereby disclaims and negates all other
                            warranties including, without limitation, implied
                            warranties or conditions of merchantability, fitness
                            for a particular purpose, or non-infringement of
                            intellectual property or other violation of rights.
                        </p>

                        <h2>Limitation of Liability</h2>
                        <p>
                            In no event shall ToolsForNoobs be liable for any
                            indirect, incidental, special, consequential or
                            punitive damages, including without limitation, loss
                            of profits, data, use, goodwill, or other intangible
                            losses, resulting from (i) your access to or use of
                            or inability to access or use the Service; (ii) any
                            conduct or content of any third party on the
                            Service; (iii) any content obtained from the
                            Service; and (iv) unauthorized access, use or
                            alteration of your transmissions or content, whether
                            based on warranty, contract, tort (including
                            negligence) or any other legal theory, whether or
                            not we have been informed of the possibility of such
                            damage, and even if a remedy set forth herein is
                            found to have failed of its essential purpose.
                        </p>

                        <h2>Changes</h2>
                        <p>
                            ToolsForNoobs reserves the right, at our sole
                            discretion, to modify or replace this disclaimer at
                            any time. If a revision is material we will try to
                            provide at least 30 days notice prior to any new
                            terms taking effect. What constitutes a material
                            change will be determined at our sole discretion.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this disclaimer,
                            please contact us: at{" "}
                            <Link href="/contact">Contact us page</Link>
                            <br />
                            Or directly at Email: contact@toolsfornoobs.com
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
