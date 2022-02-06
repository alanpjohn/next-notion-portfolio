const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([withBundleAnalyzer], {
    images: {
        domains: ["s3.us-west-2.amazonaws.com"],
    },
});
