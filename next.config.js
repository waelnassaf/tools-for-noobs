/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}
module.exports = (phase, { defaultConfig }) => {
    return {
        ...defaultConfig,
        ...nextConfig,

        webpack: (config) => {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    fs: false,
                    path: false,
                    os: false,
                },
            }
            return config
        },
    }
}
