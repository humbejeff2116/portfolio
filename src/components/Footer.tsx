import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

// TODO... remove, not in use
export default function Footer() {
    return (
        <motion.footer
            className="relative w-full text-gray-300 py-10 px-6 md:px-20 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
        {/* Subtle gradient gloss and glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950 to-neutral-900/70" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent blur-sm" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-white">Humbe Jeffrey</h2>
            <p className="text-sm text-gray-400">
                Software Engineer • Crafting elegant web experiences
            </p>
            </div>

            <div className="flex gap-6">
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

            <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded text-sm bg-gray-800 text-gray-400 hover:bg-blue-500 transition-all duration-300"
            //   className="p-3 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300"
            >
            ↑ Back to top
            </button>
        </div>

        <p className="relative text-center text-xs text-slate-400 mt-8">
            © {new Date().getFullYear()} @jeff.codes{<sup className="mx-0.2">TM</sup>}. Built with ❤️ using React & Framer Motion
        </p>
        </motion.footer>
    )
}