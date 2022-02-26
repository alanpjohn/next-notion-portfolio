const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([withBundleAnalyzer], {
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(
            (rule) => rule.test && rule.test.test(".svg"),
        );
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.push({
            test: /\.svg$/,
            loader: require.resolve("@svgr/webpack"),
        });
        return config;
    },
    images: {
        domains: ["s3.us-west-2.amazonaws.com", "images.unsplash.com"],
    },
});
