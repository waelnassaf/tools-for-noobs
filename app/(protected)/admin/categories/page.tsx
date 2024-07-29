import Link from "next/link"
import db from "@/db/db"
import { FaEllipsisVertical } from "react-icons/fa6"

export default function AdminCategoriesPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4 my-5">
                <h1 className="text-5xl font-bold">Categories</h1>
                <Link
                    href={"/admin/categories/new"}
                    className={"btn btn-primary"}
                >
                    Add Category
                </Link>
            </div>
            <CategoriesTable />
        </>
    )
}

async function CategoriesTable() {
    const categories = await db.category.findMany({
        select: {
            name: true,
            id: true,
            _count: {
                select: { tools: true },
            },
        },
        orderBy: { id: "asc" },
    })

    if (categories.length === 0) return <p>No Categories found</p>

    return (
        <div className="overflow-x-auto min-h-svh">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># tools</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.name}</td>
                            <td>{cat._count.tools}</td>{" "}
                            {/* Access tools count here */}
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
                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
                                    >
                                        <li>
                                            <Link
                                                href={`/admin/tools/${cat.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                        </li>
                                        {/*<ActiveToggleDropdownItem*/}
                                        {/*    slug={tool.slug}*/}
                                        {/*    isAvailableForPublic={*/}
                                        {/*        tool.isAvailableForPublic*/}
                                        {/*    }*/}
                                        {/*/>*/}
                                        {/*<DeleteDropdownItem slug={tool.slug} />*/}
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
