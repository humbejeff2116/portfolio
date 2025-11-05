import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

const springConfig = { stiffness: 100, damping: 20 };

export default function DynamicLight() {
    const [isHovering, setIsHovering] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);
    const lightX = useTransform(smoothX, (val) => `${val}px`);
    const lightY = useTransform(smoothY, (val) => `${val}px`);
    const isSmallScreen = useIsMobile();

    const handleMouseMove = (e: React.MouseEvent) => {
        x.set(e.clientX);
        y.set(e.clientY);
        setIsHovering(true);
    };

    const handleMouseLeave = () => setIsHovering(false);

    return (
        <motion.div
            onMouseMove={isSmallScreen ? undefined : handleMouseMove}
            onMouseLeave={isSmallScreen ? undefined : handleMouseLeave}
            className="motion-layer fixed z-1000 pointer-events-none overflow-hidden"
        >
        <motion.div
            className="absolute rounded-full blur-[120px] opacity-40 bg-gradient-to-r from-blue-500  to-pink-500"
            style={isSmallScreen ? {} : {
                x: lightX,
                y: lightY,
                width: isHovering ? 400 : 200,
                height: isHovering ? 400 : 200,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={isSmallScreen ? {} : {
                opacity: isHovering ? 0.5 : 0.25,
                scale: isHovering ? 1 : 0.9,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        />
        </motion.div>
    )
}