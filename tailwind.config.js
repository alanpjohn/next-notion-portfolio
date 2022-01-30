const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                eerie: {
                    DEFAULT: "#242423",
                },
                accent: {
                    DEFAULT: "#f2542d",
                },
                timberwolf: {
                    DEFAULT: "#fffcf2",
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
    plugins: [require("@tailwindcss/typography")],
};
