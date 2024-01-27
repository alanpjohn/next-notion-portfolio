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
            domains: [
                "s3.us-west-2.amazonaws.com",
                "images.unsplash.com",
                "dev-to-uploads.s3.amazonaws.com",
                "www.notion.so",
            ],
        },
    });
};
