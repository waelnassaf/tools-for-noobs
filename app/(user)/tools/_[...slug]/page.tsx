// //Build upon this to fill metadata for tool in a layout file automatically....
//
// import { getToolBySlug } from "@/utils"
//
// export default async function GeneralToolsLayout({
//     params,
// }: {
//     params: { slug: string[] }
// }) {
//     const tool = await getToolBySlug("keyword-extractor")
//     const name = await getToolBySlug("keyword-extractor").name
//     const description = await getToolBySlug("keyword-extractor").description
//
//     return (
//         <>
//             <h1>
//                 {/*{params.slug.map((param, idx) => (*/}
//                 {/*    <p key={idx}> {param}</p>*/}
//                 {/*))}*/}
//                 {params.slug[1]}
//             </h1>
//             <p>{name}</p>
//             <p>{description}</p>
//         </>
//     )
// }
