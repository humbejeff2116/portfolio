import { AnimatePresence, motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Magnetic from "./Magnetic";
import { useParallaxReveal } from "../hooks/useParallaxReveal";

const sections = ["home", "about", "projects", "contact"];

export default function Navbar() {
    const [active, setActive] = useState(sections[0]);
    const [scrolled, setScrolled] = useState(false);
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const controls = useAnimation();
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const logo = useParallaxReveal({ offset: -20, delay: 0.3 });
    // Background transition: transparent → brand tint → solid dark
    const backgroundColor = useTransform(
        scrollY,
        [0, 200, 700],
        [
            "rgba(10,10,10,0)",      // top of page
            "rgba(12, 3, 44, 0.15)", // brand-tinted midpoint
            "rgba(10,10,10,0.85)"    // deep solid near footer
        ]
    )
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const windowHeight = window.innerHeight

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section && scrollY + windowHeight / 2 >= section.offsetTop) {
                    setActive(sections[i])
                    break
                }
            }
            // Detect scroll for shrink effect
            setScrolled(scrollY > 50)
            if (scrollY > 100) {
                setHide(true);
            } else {
                setHide(false);
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

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
    }, [hide, scrolled, controls])

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        section?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <motion.nav
        style={{ backgroundColor }}
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="transition-all fixed top-0 left-0 w-full z-50 bg-gray-950/70 backdrop-blur-md border-b border-gray-800"
        >
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
            <motion.h1
            {...logo}
            onClick={() => {
                if (location.pathname !== '/') {
                    navigate('/');
                } else {
                    scrollToSection("home");
                }
            }}
            className="text-2xl font-bold text-white cursor-pointer transition-colors"
            >
                <Magnetic>
                <span className="bg-gradient-to-r from-indigo-400 to-sky-500 bg-clip-text text-transparent">
                {"<"}@jeff
                </span>{"."}
                <span className="hover:bg-gradient-to-r to-indigo-400 from-sky-500 bg-clip-text hover:text-transparent">
                codes
                </span>
                <span className="bg-gradient-to-r from-indigo-400 to-sky-500 bg-clip-text text-transparent">
                    {" />"}
                </span>
                </Magnetic>
                
                {/* <sup className="text-sm font-normal ml-1">TM</sup> */}
            </motion.h1>

            <ul className=" hidden md:flex items-center gap-8 text-gray-300 font-medium">
            {sections.map((section) => 
                <NavBarSectionItem key={section} 
                section={section} 
                scrollToSection={scrollToSection} 
                active={active} />
            )}
            <ThemeToggle />
            </ul>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <ThemeToggle />
                <motion.button
                type="button"
                aria-label="Open Menu"
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-zinc-700 hover:bg-zinc-800 cursor-pointer ml-3 text-gray-300 hover:text-white transition-colors"
                onClick={() => setOpen(!open)}
                >
                {open ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>
            
            {/* Mobile Menu Overlay */}
            <MobileMenuOverlay 
            open={open} 
            scrollToSection={scrollToSection} 
            active={active}
            />
        </div>
        </motion.nav>
    )
}


interface NavBarSectionItemProps {
   section: string 
   scrollToSection: (id: string) => void
   active: string
}

function NavBarSectionItem({
    section,
    scrollToSection,
    active,
}: NavBarSectionItemProps) {
    const navigate = useNavigate();
    return (
        <Magnetic>
        <li
        onClick={() => {
            if (section === 'home') {
                if (location.pathname !== '/') {
                    navigate('/');
                } else {
                    scrollToSection(section);
                }  
            }
            scrollToSection(section);
        }}
        className={`relative cursor-pointer capitalize transition-colors hover:bg-gradient-to-r to-indigo-400 from-sky-500 bg-clip-text hover:text-transparent ${
            active === section ? "bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent" : "text-gray-300"
        }`}
        >
        {section}
        {active === section && (
            <motion.span
            layoutId="underline"
            className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-indigo-600 to-sky-700 rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        )}
        </li>
        </Magnetic>
    )
}

interface MobileMenuOverlayProps {
    open: boolean
    scrollToSection: (id: string) => void
    active: string   
}

function MobileMenuOverlay({
    open,
    scrollToSection,
    active,
}: MobileMenuOverlayProps) {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
        {open && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-neutral-950/70 backdrop-blur-2xl border-b border-t border-neutral-800 rounded-b-2xl space-y-4 md:hidden"
            >
                <ul className="flex flex-col items-center py-6 gap-6">
                {sections.map((section) => (
                    <li
                    key={section}
                    onClick={() => {
                        if (section === 'home') {
                            if (location.pathname !== '/') {
                                navigate('/');
                            } else {
                                scrollToSection(section);
                            }  
                        }
                        scrollToSection(section);
                    }}
                    className={`relative cursor-pointer capitalize transition-colors hover:bg-gradient-to-r to-indigo-400 from-sky-500 bg-clip-text hover:text-transparent ${
                        active === section ? "bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent" : "text-gray-300"
                    }`}
                    >
                    {section}
                    {active === section && (
                        <motion.span
                        layoutId="underline"
                        className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-indigo-600 to-sky-700 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    </li>
                ))}
                </ul>
            </motion.div>
        )}
        </AnimatePresence>
    )
}
