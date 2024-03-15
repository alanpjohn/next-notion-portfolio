const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
module.exports = () => {
    const plugins = [withBundleAnalyzer];
    return plugins.reduce((acc, next) => next(acc, { silent: true }), {
        webpack(config) {
            return config;
        },
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "s3.us-west-2.amazonaws.com",
                },
                {
                    protocol: "https",
                    hostname: "images.unsplash.com",
                },
                {
                    protocol: "https",
                    hostname: "dev-to-uploads.s3.amazonaws.com",
                },
                {
                    protocol: "https",
                    hostname: "www.notion.so",
                },
            ],
        },
    });
};
