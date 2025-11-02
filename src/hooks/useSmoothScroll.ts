import { useEffect } from "react";

export function useSmoothScroll() {
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    document.body.style.setProperty("--scrollY", `${window.scrollY}px`);
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
}