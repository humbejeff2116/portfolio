import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.3 })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <section
        id="contact"
        className="relative z-10 min-h-[60vh] bg-gradient-to-b from-gray-950 to-black text-white flex flex-col items-center justify-center px-6 py-24"
        >
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" },
                },
            }}
            className="text-center max-w-2xl"
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            I’m always open to discussing new projects, creative ideas, or
            opportunities to collaborate. Let’s build something great together.
            </p>

            <div className="flex justify-center gap-6">
            <a
                href="mailto:youremail@example.com"
                className="p-3 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300"
                aria-label="Email"
            >
                <Mail size={22} />
            </a>
            <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300"
                aria-label="GitHub"
            >
                <Github size={22} />
            </a>
            <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300"
                aria-label="LinkedIn"
            >
                <Linkedin size={22} />
            </a>
            </div>
        </motion.div>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 text-gray-600 text-sm"
        >
            © {new Date().getFullYear()} @jeff.codes — Crafted with ❤️ and React.js
        </motion.p>
        </section>
    )
}
