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
                eerie: "#16161A",
                jet: "#2a2a2a",
                purple: "#7f5af0",
                mint: "#2cb67d",
                orange: "#ff8e3c",
                razzmatazz: "#f25f4c",
                cultured: "#b9beca",
                white: "#fffffe",
            },
            fontFamily: {
                ...fontFamily,
                sans: ["uncut-sans", "system-ui"],
                grotesk: ["space-grotesk", "system-ui"],
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
