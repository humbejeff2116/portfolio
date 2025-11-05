import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeContext } from "../context/theme/theme.context";

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <motion.button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 cursor-pointer  transition-colors"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
        >
        {theme === "light" ? (
            <Moon size={24} className="text-zinc-300" />
        ) : (
            <Sun size={24} className="text-yellow-400" />
        )}
        </motion.button>
    )
}
