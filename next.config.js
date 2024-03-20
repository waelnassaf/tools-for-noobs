/** @type {import('next').NextConfig} */
const nextConfig = {}
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
