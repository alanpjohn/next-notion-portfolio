const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    images: {
        domains: ["s3.us-west-2.amazonaws.com"],
    },
});
