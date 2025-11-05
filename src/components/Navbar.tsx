import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import { ThemeToggle } from "./ThemeToggle";
import { useParallaxReveal } from "../hooks/useParallaxReveal";
import { sections, useNaveBar } from "../hooks/useNavBar";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
    const { active, backgroundColor, controls } = useNaveBar();
    
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
            <Logo scrollToSection={scrollToSection} />

            <ul className=" hidden md:flex items-center gap-8 text-gray-300 font-medium">
            {sections.map((section) => 
                <NavBarSectionItem key={section} 
                    section={section} 
                    scrollToSection={scrollToSection} 
                    active={active} 
                />
            )}
            <ThemeToggle />
            </ul>

            <MobileMenuButton 
                open={mobileMenuOpen} 
                setOpen={setMobileMenuOpen}            
            />
            
            <MobileMenuOverlay 
                open={mobileMenuOpen} 
                scrollToSection={scrollToSection} 
                active={active}
            />
        </div>
        </motion.nav>
    )
}

interface LogoProps {
   scrollToSection: (id: string) => void
}

function Logo({
    scrollToSection
}: LogoProps ) {
    const location = useLocation();
    const navigate = useNavigate();
    const logo = useParallaxReveal({ offset: -20, delay: 0.3 });
    
    return (
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
        </motion.h1>
    )
}

interface MobileMenuButtonProps {
    open: boolean
   setOpen: (value: React.SetStateAction<boolean>) => void
}

function MobileMenuButton({
   open,
   setOpen 
}: MobileMenuButtonProps) {
    return (
        <div className="md:hidden">
            <ThemeToggle />
            <motion.button
                type="button"
                aria-label="Open Menu"
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 cursor-pointer ml-3 text-gray-300 hover:text-white transition-colors"
                onClick={() => setOpen(!open)}
            >
            {open ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
        </div>
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
                initial={{ opacity: 0, y: 0 }}
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
