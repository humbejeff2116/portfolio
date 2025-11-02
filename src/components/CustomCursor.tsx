import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring motion for natural movement
    const springConfig = { damping: 25, stiffness: 250 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMove = (e: { clientX: number; clientY: number; }) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const hoverables = document.querySelectorAll("a, button, .hover-target");
        const handleEnter = () => setIsHovered(true);
        const handleLeave = () => setIsHovered(false);
        hoverables.forEach((el) => {
            el.addEventListener("mouseenter", handleEnter);
            el.addEventListener("mouseleave", handleLeave);
        });
        return () => {
            hoverables.forEach((el) => {
                el.removeEventListener("mouseenter", handleEnter);
                el.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, []);

    return (
        <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
        }}
        >
        <motion.div
            animate={{
                scale: isHovered ? 1.6 : 1,
                opacity: isHovered ? 0.6 : 0.9,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-5 h-5 rounded-full bg-primary-light/70 dark:bg-primary-dark/50 mix-blend-difference"
        />
        </motion.div>
    );
}
