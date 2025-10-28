import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

const sections = ["hero", "about", "projects"]

export default function Navbar() {
    const [active, setActive] = useState("hero");
    const [scrolled, setScrolled] = useState(false);
    const controls = useAnimation();

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
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    // Animate navbar height and background tone
    useEffect(() => {
        controls.start({
            opacity: 1, 
            y: 0,
            height: scrolled ? "60px" : "80px",
            backgroundColor: scrolled
                ? "rgba(17, 17, 17, 0.9)"
                : "rgba(17, 17, 17, 0.5)",
            transition: { duration: 0.3, ease: "easeInOut" },
        })
    }, [scrolled, controls])

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
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold text-white cursor-pointer hover:text-blue-400 transition-colors"
            >
            @Jeff.codes
            </h1>

            <ul className="flex gap-8 text-gray-300 font-medium">
            {sections.map((section) => (
                <li
                key={section}
                onClick={() => scrollToSection(section)}
                className={`cursor-pointer capitalize transition-colors duration-300 ${
                    active === section ? "text-blue-400" : "hover:text-blue-400"
                }`}
                >
                {section}
                </li>
            ))}
            </ul>
        </div>
        </motion.nav>
    )
}
