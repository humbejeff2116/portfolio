import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Magnetic from "./Magnetic";

export function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const triggerHeight = window.innerHeight * 0.3 // 30% down
            setVisible(scrollPosition > triggerHeight);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <Magnetic className="fixed bottom-6 right-6 z-50">
        <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.8,
        }}
        transition={{
            duration: 0.3,
            ease: "easeOut",
        }}
        className="cursor-pointer  p-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600  backdrop-blur-md border border-gray-700 hover:bg-gray-500 transition-all duration-300"
        >
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowUp className="w-5 h-5" />
            </motion.div>
        </motion.button>
        </Magnetic>
    )
}