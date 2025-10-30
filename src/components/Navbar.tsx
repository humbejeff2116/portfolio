import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Magnetic from "./Magnetic";

const sections = ["home", "about", "projects", "contact"]
//  const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Projects", path: "/projects" },
//   ];
export default function Navbar() {
    const [active, setActive] = useState("hero");
    const [scrolled, setScrolled] = useState(false);
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const controls = useAnimation();
    const navigate = useNavigate();
    

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const windowHeight = window.innerHeight

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i])
                if (section && scrollY + windowHeight / 2 >= section.offsetTop) {
                    // if (location.pathname !== '/') {

                    // }
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
            // y: hide ? -80 : 0,
            height: scrolled ? "70px" : "82px",
            // animate={{ y: hidden ? -80 : 0 }}
            backgroundColor: scrolled
                ? "rgba(17, 17, 17, 0.9)"
                : "rgba(17, 17, 17, 0.5)",
            transition: { duration: 0.3, ease: "easeInOut" },
        })
    }, [hide, scrolled, controls])

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        section?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <motion.nav
        animate={controls}
        initial={{ opacity: 0, y: -20 }}
        // animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-gray-950/70 backdrop-blur-md border-b border-gray-800"
        >
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
            <h1
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
            </h1>

            <ul className=" hidden md:flex items-center gap-8 text-gray-300 font-medium">
            {sections.map((section) => (
                <Magnetic key={section}>
                <li
                // key={section}
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
            ))}
            <ThemeToggle />
            </ul>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <ThemeToggle />
                <button
                type="button"
                className="cursor-pointer ml-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setOpen(!open)}
                >
                {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full bg-neutral-950/70 backdrop-blur-2xl border-b border-t border-neutral-800 rounded-b-2xl space-y-4 md:hidden"
                    >
                        {/* <div className="flex flex-col items-center py-6 gap-6"> */}
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
        </div>
        </motion.nav>
    )
}
