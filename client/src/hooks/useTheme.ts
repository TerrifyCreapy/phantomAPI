import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext("light");

const useTheme = () => {
    const [theme, setTheme] = useState("light");
    const body = document.querySelector("body");

    function toggleTheme() {
        if (!body) return;
        body.classList.toggle("dark");
        localStorage.setItem("theme", theme === "light" ? "dark" : "light");
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    useEffect(() => {
        const themeLocalStorage = localStorage.getItem(theme);
        if (themeLocalStorage) {
            body && themeLocalStorage === "dark" && body.classList.add("dark");
            setTheme(themeLocalStorage);
        } else {
            if (window.matchMedia("prefers-color-theme: dark").matches) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        }
    }, [theme, body]);

    return {theme, toggleTheme};
};
export default useTheme;
