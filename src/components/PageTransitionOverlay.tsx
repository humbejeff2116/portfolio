import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransitionOverlay() {
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Trigger animation on route change
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 800); // 0.8s animation
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <AnimatePresence>
        {isAnimating && (
            <motion.div
            key={location.pathname}
            className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
            style={{
                background:
                "linear-gradient(120deg, #0a0a0a 0%, #1b1b1b 50%, #0a0a0a 100%)",
            }}
            >
            {/* Centered logo or name */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide text-3xl md:text-4xl"
            >
                <span className="bg-gradient-to-r from-indigo-400 to-sky-500 bg-clip-text text-transparent">
                {"<"}@jeff
                </span>{"."}
                <span className="hover:bg-gradient-to-r to-indigo-400 from-sky-500 bg-clip-text hover:text-transparent">
                codes
                </span>
                <span className="bg-gradient-to-r from-indigo-400 to-sky-500 bg-clip-text text-transparent">
                    {" />"}
                </span>

                {/* <img src="/logo.svg" alt="Humbe Jeffrey" className="w-16 h-16 opacity-90" /> */}
            </motion.h1>
            </motion.div>
        )}
        </AnimatePresence>
    )
}
