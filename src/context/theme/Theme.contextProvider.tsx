import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ThemeContext } from "./theme.context";

export function ThemeProvider({ 
    children 
}: {
    children: React.ReactNode
}) {
    const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");
    const [theme, setTheme] = useState("light");
    const [showTransition, setShowTransition] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme(systemPrefersDark ? "dark" : "light");
        }
    }, [systemPrefersDark]);

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        
    }, [theme]);

    useEffect(() => {
        return () => {
            if (showTransition) {
                setShowTransition(false);
            }
        } 
    }, [showTransition]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
        if (!showTransition) {
            setShowTransition(true);
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, showTransition, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}