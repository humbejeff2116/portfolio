import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useParallaxReveal } from "../hooks/useParallaxReveal";

export default function About() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3 });
    const headingText = useParallaxReveal({ offset: 30 });
    const subText = useParallaxReveal({ offset: 40, delay: 0.3 });
    const skillSet = useParallaxReveal({ offset: 40, delay: 0.6 });

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <section
        id="about"
        className="relative  min-h-screen flex items-center justify-center text-white px-6 md:px-12"
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
        className="bg-white/0.5 backdrop-blur-sm z-20 max-w-3xl text-center px-5 py-10 rounded shadow"
        >
            <motion.h2
                className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent mb-16"
                {...headingText}
                // viewport={{ once: true, amount: 0.6 }}
            >
                About Me
            </motion.h2>

            <motion.p
                className="max-w-2xl text-gray-400 leading-relaxed text-lg"
                {...subText}
                // viewport={{ once: true, amount: 0.6 }}
            >
                I’m <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent font-semibold">Humbe Jeffrey</span>, a software engineer who
                loves building elegant, performant, and user-focused applications.
                My work spans across full-stack development using
                <span className="text-accent"> React</span>, <span className="text-accent">TypeScript</span>, and <span className="text-accent">Node.js</span>.
                I enjoy turning complex ideas with scalable engineering practices into delightful, smooth user experiences
                — always with attention to detail and clean design.
            </motion.p>

            <motion.div
                className="mt-10 flex gap-4 flex-wrap justify-center"
                {...skillSet}
                // viewport={{ once: true, amount: 0.5 }}
            >
                {["React", "TypeScript", "Node.js", "Tailwind", "Framer Motion"].map((tech) => (
                <span
                    key={tech}
                    className="px-4 py-2 border border-gray-700 rounded-full text-gray-400 hover:border-accent hover:text-accent transition-all duration-300"
                >
                    {tech}
                </span>
                ))}
            </motion.div>
        </motion.div>
        </section>
    );
}
