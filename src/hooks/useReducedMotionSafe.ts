import { useReducedMotion } from "framer-motion";

export function useReducedMotionSafe() {
    const prefersReducedMotion = useReducedMotion();

    return prefersReducedMotion ? ({
        transition: { duration: 0 },
        animate: {},
    }) : ({
        transition: { duration: 0.3, ease: "easeInOut" },
        animate: { opacity: 1, y: 0 },
    });
}