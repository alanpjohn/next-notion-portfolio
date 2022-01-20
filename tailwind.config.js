const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
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
