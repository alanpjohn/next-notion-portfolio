const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
    content: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: "class",
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                codeblock: "#22272e",
                foreground: {
                    DEFAULT: "#F0EDE6",
                    primary: "#F0EDE6",
                    secondary: "#DAD7D2",
                },
                background: {
                    DEFAULT: "#242526",
                    secondary: "#242526",
                    primary: "#0D0E10",
                },
                accent: {
                    DEFAULT: "#e11d48",
                    alternate: "#e11d48",
                    secondary: "#f25f4c",
                    primary: "#2cb67d",
                },
            },
            fontFamily: {
                ...fontFamily,
                sans: ["Space Grotesk", "sans-serif"],
                mono: ["Space Mono", "monospace"],
                rubik: ["Rubik", "san-serif", "system-ui"],
            },
            minWidth: {
                xs: "320px",
            },
            minHeight: {
                64: "256px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
