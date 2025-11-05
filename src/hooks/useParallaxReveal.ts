import { useRef, useEffect } from "react";
import { 
    useMotionValue, 
    useReducedMotion, 
    useSpring, 
    useTransform 
} from "framer-motion";
import { useIsMobile } from "./useIsMobile";

export function useParallaxReveal({ 
    offset = 50, 
    delay = 0,
    duration = 0.3 
} = {}) {
    const ref = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const y = useMotionValue(0);
    const smoothY = useSpring(y, { damping: 25, stiffness: 120 });
    const transformY = useTransform(smoothY, [-100, 100], [offset, -offset]);
    const isSmallScreen = useIsMobile();

    useEffect(() => {
        const handleMouseMove = (e: { clientX: number; }) => {
            const centerX = window.innerWidth / 2;
            const delta = (e.clientX - centerX) / centerX;
            y.set(delta * 50);
        }

        if (!isSmallScreen) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [isSmallScreen, y]);


    return prefersReducedMotion ? ({
        ref,
        initial: { opacity: 0, y: offset },
        transition: { duration: 0 },
        animate: {},
    }) : ({
        ref,
        initial: { opacity: 0, y: offset },
        whileInView: { opacity: 1, y: 0 },
        transition: { 
            duration: duration, 
            delay, 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ease: "easeInOut" as any 
        },
        style: isSmallScreen ? {} : { y: transformY },
        // viewport: { once: true, amount: 0.2 }
    });
}