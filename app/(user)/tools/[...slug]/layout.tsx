// import React from "react"
//
// import type { Metadata } from "next"
// import { getToolBySlug } from "@/utils"
// const tool = await getToolBySlug("keyword-extractor")
//
// const { name, description } = tool
// a
// export async function generateMetadata(): Promise<Metadata> {
//     return {
//         title: name,
//         description: description,
//     }
// }
//
// export default async function RootLayout({
//     children,
//     params,
// }: {
//     children: React.ReactNode
//     params: { slug: string[] }
// }) {
//     return (
//         <>
//             <h1>
//                 {/*{params.slug.map((param, idx) => (*/}
//                 {/*    <p key={idx}> {param}</p>*/}
//                 {/*))}*/}
//                 {params.slug[1]}
//             </h1>
//             {children}
//         </>
//     )
// }
