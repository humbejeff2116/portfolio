import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useParallaxReveal } from "../hooks/useParallaxReveal";

export default function Contact() {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.3 });
    const headingText = useParallaxReveal({ offset: 40 });
    const subText = useParallaxReveal({ offset: 40, delay: 0.3 });

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <footer>
        <section
        id="contact"
        className="relative w-full z-10 min-h-[60vh] bg-gradient-to-b from-gray-950 to-black text-gray-300 flex flex-col items-center justify-center px-6 py-24 md:px-20 overflow-hidden"
        // className="relative w-full text-gray-300 py-10 px-6 md:px-20 overflow-hidden"
        >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950 to-neutral-900/70" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent blur-sm" />

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
            className="relative text-center max-w-2xl"
        >
            <motion.h2
            // initial={{ opacity: 0, y: 40 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.6 }}
            {...headingText}
            className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent mb-16"
            >
                Get in Touch
            </motion.h2>
            
            <motion.p
                className="max-w-2xl text-gray-400 mb-8 leading-relaxed text-lg"
                {...subText}
                // viewport={{ once: true, amount: 0.6 }}
            >
                I'm always open to discussing new projects, creative ideas, or
                opportunities to collaborate. Let's build something great together.
            </motion.p>

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
            className="relative mt-16 text-gray-600 text-sm"
        >
            © {new Date().getFullYear()} @jeff.codes — Crafted with ❤️ and React.js
        </motion.p>
        </section>
        </footer>
    )
}
