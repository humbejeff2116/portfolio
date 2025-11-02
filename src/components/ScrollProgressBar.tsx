import { 
    motion, 
    useMotionValueEvent, 
    useScroll, 
    useSpring, 
    useTransform 
} from "framer-motion";
import { useState } from "react";

export default function ScrollProgressBar() {
    const [visible, setVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Add spring for smoother animation
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 20,
        restDelta: 0.001,
    })

    // Dynamically shift colors as the user scrolls
    const background = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            "linear-gradient(to right, #0d40adff, #8b5cf6)", // Indigo → Violet (top)
            "linear-gradient(to right, #8b5cf6, #4b66fcff)", // Violet → Pink (mid)
            "linear-gradient(to right, #4861ecff, rgba(24, 8, 16, 1))", // Pink → Orange (bottom)
        ]
    );

    // Track when user starts scrolling
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.01 && !visible) setVisible(true)
        if (latest <= 0.01 && visible) setVisible(false)
    });

    return (
        <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left filter brightness-110"
        style={{
            scaleX: scaleX,
            background,
            boxShadow: visible ? 
            "0 0 8px rgba(236, 72, 153, 0.6), 0 0 20px rgba(236, 72, 153, 0.3)"
            : "none",
        }}
        animate={{
            opacity: visible ? 1 : 0,
        }}
        transition={{
            opacity: { duration: 0.4, ease: "easeOut" },
        }}
        />
    );
}
