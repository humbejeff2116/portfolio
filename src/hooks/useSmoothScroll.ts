import { useEffect } from "react";
import { useIsMobile } from "./useIsMobile";

export function useSmoothScroll() {
    const isSmallScreen = useIsMobile();
    
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

        if (isSmallScreen) {
            window.removeEventListener("scroll", handleScroll);
        } else {
            window.addEventListener("scroll", handleScroll);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isSmallScreen]);
}