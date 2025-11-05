import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../context/theme/theme.context";

export function ThemeTransitionOverlay() {
    const { theme } = useThemeContext();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger overlay whenever theme changes
        setVisible(true);
        const timeout = setTimeout(() => setVisible(false), 700);
        return () => clearTimeout(timeout);
    }, [theme]);

    return (
        <AnimatePresence>
        {visible && (
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="fixed inset-0 pointer-events-none z-[9999]"
            >
            <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 5, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-full ${
                    theme === "light" ? "bg-white" : "bg-zinc-900"
                }`}
                style={{
                    top: "50%",
                    left: "50%",
                    width: "200px",
                    height: "200px",
                    transform: "translate(-50%, -50%)",
                }}
            />
            </motion.div>
        )}
        </AnimatePresence>
    )
}