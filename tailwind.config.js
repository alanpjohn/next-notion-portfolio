const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
    content: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#242423",
                    100: "#333533",
                },
                accent: {
                    DEFAULT: "#f2542d",
                },
                secondary: {
                    DEFAULT: "#fffcf2",
                },
            },
            fontFamily: {
                ...fontFamily,
                cabinet: ["CabinetGrotesk", "ui-sans-serif"],
                clash: ["ClashDisplay", "ui-sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
