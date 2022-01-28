const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                eerie: {
                    DEFAULT: "#242423",
                },
            },
            fontFamily: {
                ...fontFamily,
                cabinet: ["Cabinet Grotesk", "ui-sans-serif"],
                clash: ["Clash Display", "ui-sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
