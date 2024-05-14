export const navLinks = [
    { label: "Home", path: "/", targetSegment: null },
    {
        label: "Text Tools",
        path: "/tools/text",
    },
    {
        label: "Image Tools",
        path: "/tools/image",
    },
    {
        label: "AI Tools",
        path: "/tools/ai",
    },
]

export const footerLinks = [
    {
        title: "About",
        links: [
            { title: "About Us", url: "/about-us" },
            // { title: "How it works", url: "/how-it-works" },
            // { title: "FAQ", url: "/faq" },
        ],
    },
    {
        title: "Contact",
        links: [
            { title: "Contact Us", url: "/contact" },
            { title: "Twitter", url: "/" },
        ],
    },
]

export const categoriesOfTools = [
    {
        title: "All",
        value: "",
        catID: 0,
    },
    {
        title: "Text",
        value: "text",
        catID: 1,
    },
    {
        title: "Image",
        value: "image",
        catID: 2,
    },
    {
        title: "AI",
        value: "ai",
        catID: 3,
    },
]

export const tools = [
    "Line Counter",
    "Space Remover",
    "Code Formatter",
    "Text Analyzer",
    "Image Resizer",
    "Duplicate Finder",
    "Character Counter",
    "File Renamer",
    "Regex Tester",
    "Syntax Highlighter",
]

export const sitename = "Tools for Noobs"
