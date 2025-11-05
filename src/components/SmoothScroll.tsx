import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useIsMobile } from "../hooks/useIsMobile";

export function SmoothScroll({ 
    children 
}: { 
    children: ReactNode   
}) {
    const isSmallScreen = useIsMobile();
    
    useEffect(() => {
        let lenis: Lenis;

        if (!isSmallScreen) {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });

            const raf = (time: number) => {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        }

        return () => {
            if (lenis) {
                lenis.destroy();
            }    
        }
    }, [isSmallScreen]);

    return (
        <>
        {children}
        </>
    )
}