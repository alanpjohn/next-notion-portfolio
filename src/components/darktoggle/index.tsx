import { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export const isDark = (): boolean =>
    (localStorage && localStorage.theme === "dark") ||
    (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

const getThemeString = (isDark: boolean): string => (isDark ? "dark" : "light");

type darkprops = {
    className?: string;
};

export const DarkModeToggle: React.FC<darkprops> = ({
    className = "",
}: darkprops) => {
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleMode = (): void => {
        localStorage.theme = getThemeString(!isDarkMode);
        if (localStorage.theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.remove("dark-mode");
        }
        setDarkMode(!isDarkMode);
    };

    useEffect(() => {
        setDarkMode(isDark());
        if (isDark()) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.add("dark-mode");
        }
    }, []);

    return (
        <div
            className={`text-2xl hover:text-orange dark:hover:text-purple sm:text-3xl cursor-pointer ${className}`}
            onClick={() => toggleMode()}
            key={isDarkMode ? "dark-icon" : "light-icon"}
        >
            {!isDarkMode ? <BsSunFill /> : <BsMoonFill />}
        </div>
    );
};
