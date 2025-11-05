import { useEffect, useState } from "react";
import { useAnimation, useScroll, useTransform } from "framer-motion";


export const sections = ["home", "about", "projects", "contact"];

export function useNaveBar() {
    const [active, setActive] = useState(sections[0]);
    const [scrolled, setScrolled] = useState(false);
    const [hide, setHide] = useState(false);
    const { scrollY } = useScroll();
    const controls = useAnimation();
    // Background transition: transparent → brand tint → solid dark
    const backgroundColor = useTransform(
        scrollY,
        [0, 200, 700],
        [
            "rgba(10,10,10,0)",      // top of page
            "rgba(12, 3, 44, 0.15)", // brand-tinted midpoint
            "rgba(10,10,10,0.85)"    // deep solid near footer
        ]
    );

    // Animate navbar height and background tone
    useEffect(() => {
        controls.start({
            opacity: 1, 
            y:  0,
            height: scrolled ? "70px" : "82px",
            backgroundColor: scrolled
                ? "rgba(17, 17, 17, 0.9)"
                : "rgba(17, 17, 17, 0.5)",
            transition: { 
                type: "spring", stiffness: 200, damping: 25, 
                duration: 0.3, 
                ease: "easeInOut" 
            },
        })
    }, [hide, scrolled, controls]);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);

                if (section && scrollY + windowHeight / 2 >= section.offsetTop) {
                    setActive(sections[i]);
                    break;
                }
            }
            // Detect scroll for shrink effect
            setScrolled(scrollY > 50);
            if (scrollY > 100) {
                setHide(true);
            } else {
                setHide(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return ({active, scrolled, hide, controls, backgroundColor });
}