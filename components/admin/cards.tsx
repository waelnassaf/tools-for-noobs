import db from "@/db/db"
import { GrGroup, GrTools, GrCatalog } from "react-icons/gr"
import { formatNumber } from "@/lib/formatters"
import { wait } from "@/lib/helpers"

const iconMap = {
    users: GrGroup,
    tools: GrTools,
    categories: GrCatalog,
}

async function getUserData() {
    const userCount = await db.user.count()
    return { userCount }
}

async function getToolData() {
    const toolCount = await db.tool.count()
    return { toolCount }
}

async function getCategoryData() {
    const categoryCount = await db.category.count()
    return { categoryCount }
}

export default async function Cards() {
    const [userData, toolData, categoryData] = await Promise.all([
        getUserData(),
        getToolData(),
        getCategoryData(),
    ])

    return (
        <>
            <DashboardCard
                title="Users"
                subtitle="Total Users"
                body={formatNumber(userData.userCount)}
                type="users"
            />
            <DashboardCard
                title="Tools"
                subtitle="Total Tools"
                body={formatNumber(toolData.toolCount)}
                type="tools"
            />
            <DashboardCard
                title="Categories"
                subtitle="Total Categories"
                body={formatNumber(categoryData.categoryCount)}
                type="categories"
            />
        </>
    )
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
    type: "users" | "tools" | "categories"
}

const DashboardCard = ({ title, subtitle, body, type }: DashboardCardProps) => {
    const Icon = iconMap[type]

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                {body}
            </p>
            <p className="text-sm text-gray-400 mt-3">{subtitle}</p>
        </div>
    )
}
