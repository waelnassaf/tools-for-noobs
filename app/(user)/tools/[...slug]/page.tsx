//Build upon this to fill metadata for tool in a layout file automatically....

export default function GeneralToolsLayout({
    params,
}: {
    params: { slug: string[] }
}) {
    return (
        <h1>
            {params.slug.map((param, idx) => (
                <p key={idx}> {param}</p>
            ))}
        </h1>
    )
}
