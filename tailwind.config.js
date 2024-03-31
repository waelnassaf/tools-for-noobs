/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "black-100": "#2B2C35",
                "primary-blue": {
                    DEFAULT: "#2B59FF",
                    100: "#F5F8FF",
                },
                "secondary-orange": "#f79761",
                "light-white": {
                    DEFAULT: "rgba(59,60,152,0.03)",
                    100: "rgba(59,60,152,0.02)",
                },
                grey: "#747A88",
                sun: "#fd6c21",
                space: "#414a4c",
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ["light"],
    },
    darkMode: "class",
}
