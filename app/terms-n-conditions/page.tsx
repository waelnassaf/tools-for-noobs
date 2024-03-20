import { Breadcrumbs } from "@/components"
const Page = () => {
    const pages = ["Home", "Terms & Conditions"]

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="bg-gray-100">
                <div className="container mx-auto p-8">
                    <h1 className="text-2xl font-semibold mb-4">
                        Terms & Conditions
                    </h1>
                    <div className="prose prose-lg">
                        <h2>Introduction</h2>
                        <p>
                            PLEASE READ ALL OF THE FOLLOWING TERMS CAREFULLY AS
                            THEY CONTAIN INFORMATION REGARDING YOUR LEGAL
                            RIGHTS, REMEDIES, AND OBLIGATIONS. THIS AGREEMENT
                            CONTAINS A MANDATORY ARBITRATION OF DISPUTES
                            PROVISION IN SECTION 14 THAT REQUIRES THE USE OF
                            ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE
                            DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS.
                        </p>

                        <h2>Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Services, User hereby
                            READS, UNDERSTANDS, ACCEPTS, and AGREES to be bound
                            by this Agreement&apos;s terms and conditions.
                            Should User NOT accept these terms and conditions,
                            User must neither access nor otherwise use any part
                            of the Services or content or information available
                            therewith. To the extent permitted by law,
                            ToolsForNoobs may amend, at any time and from time
                            to time, this Agreement by posting a version of this
                            Agreement to https://toolsfornoobs.com/terms.
                            ToolsForNoobs will notify User on its website and/or
                            via email that amended terms have been posted. User
                            agrees that its continued use of the Services
                            constitutes an acceptance of such amendments. User
                            shall have the opportunity to refuse said amendments
                            solely by ceasing access to and utilization of the
                            Services.
                        </p>

                        <h2>Termination</h2>
                        <p>
                            This Agreement remains effective from the moment
                            User accesses or uses the Services until terminated.
                            This Agreement will terminate automatically without
                            notice from the ToolsForNoobs if User fails to
                            comply with any provision of this Agreement.
                            ToolsForNoobs reserves the right, in its sole
                            discretion and without prior notice to User, at any
                            time and for any reason, to: (i) remove or disable
                            access to all or any portion of the Services; (ii)
                            suspend User&apos;s access to or use of all or any
                            portion of the Services; and (iii) terminate this
                            Agreement.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
