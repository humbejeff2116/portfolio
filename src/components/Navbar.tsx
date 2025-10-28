import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const sections = ["hero", "about", "projects"]

export default function Navbar() {
    const [active, setActive] = useState("hero")

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
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        section?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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
