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
                    secondary: "#0D0E10",
                    primary: "#242526",
                },
                accent: {
                    DEFAULT: "#7f5af0",
                    alternate: "#2cb67d",
                    secondary: "#f25f4c",
                    primary: "#7f5af0",
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
