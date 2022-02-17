const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
    content: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                darkprimary: {
                    DEFAULT: "#eff0f3",
                    100: "#cccccd",
                },
                darkaccent: {
                    DEFAULT: "#ff8e3c",
                },
                darksecondary: {
                    DEFAULT: "#0d0d0d",
                    100: "#2a2a2a",
                },
                primary: {
                    DEFAULT: "#1a1a1b",
                    100: "#27272b",
                },
                accent: {
                    DEFAULT: "#7f5af0",
                },
                secondary: {
                    DEFAULT: "#fffffe",
                    100: "#94a1b2",
                },
                codeblock: {
                    DEFAULT: "#22272e",
                },
            },
            fontFamily: {
                ...fontFamily,
                cabinet: ["CabinetGrotesk", "ui-sans-serif"],
                clash: ["ClashDisplay", "ui-sans-serif"],
                playfair: ["Playfair Display", "ui-sans-serif"],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
