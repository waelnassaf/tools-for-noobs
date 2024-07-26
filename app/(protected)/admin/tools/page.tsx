import Link from "next/link"
import db from "@/db/db"
import { FaEllipsisVertical } from "react-icons/fa6"
import {
    ActiveToggleDropdownItem,
    DeleteDropdownItem,
} from "../../_components/tool-actions"

export default function AdminToolsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4 my-5">
                <h1 className="text-5xl font-bold">Tools</h1>
                <Link href={"/admin/tools/new"} className={"btn btn-primary"}>
                    Add tool
                </Link>
            </div>
            <ToolsTable />
        </>
    )
}

async function ToolsTable() {
    const tools = await db.tool.findMany({
        select: {
            slug: true,
            name: true,
            isAvailableForPublic: true,
        },
        orderBy: { id: "desc" },
    })

    if (tools.length === 0) return <p>No tools found</p>

    return (
        <div className="overflow-x-auto min-h-svh">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Available</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.map((tool) => (
                        <tr key={tool.slug}>
                            <th>
                                {tool.isAvailableForPublic ? (
                                    <>
                                        <span className="sr-only">
                                            Available
                                        </span>
                                        ✅
                                    </>
                                ) : (
                                    <>
                                        <span className="sr-only">
                                            Unavailable
                                        </span>
                                        ❌
                                    </>
                                )}
                            </th>
                            <td>{tool.name}</td>

                            <td>
                                <div className="dropdown dropdown-hover">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn m-1"
                                    >
                                        <FaEllipsisVertical />{" "}
                                        <span className="sr-only">Actions</span>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                    >
                                        <li>
                                            <Link
                                                href={`/admin/tools/${tool.slug}/edit`}
                                            >
                                                Edit
                                            </Link>
                                        </li>
                                        <ActiveToggleDropdownItem
                                            slug={tool.slug}
                                            isAvailableForPublic={
                                                tool.isAvailableForPublic
                                            }
                                        />
                                        <DeleteDropdownItem slug={tool.slug} />
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
