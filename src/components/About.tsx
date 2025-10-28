import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function About() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3 });

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <section
        id="about"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 md:px-12"
        // className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6"
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
        className="max-w-3xl text-center"
        >
            <motion.h2
                className="text-4xl font-bold mb-6 text-accent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.6 }}
            >
                About Me
            </motion.h2>

            <motion.p
                className="max-w-2xl text-gray-300 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true, amount: 0.6 }}
            >
                I’m <span className="text-accent font-semibold">Humbe Jeffrey</span>, a software engineer who
                loves building elegant, performant, and user-focused applications.
                My work spans across full-stack development using
                <span className="text-accent"> React</span>, <span className="text-accent">TypeScript</span>, and <span className="text-accent">Node.js</span>.
                I enjoy turning complex ideas into delightful, smooth user experiences
                — always with attention to detail and clean design.
            </motion.p>

            <motion.div
                className="mt-10 flex gap-4 flex-wrap justify-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                {["React", "TypeScript", "Node.js", "Tailwind", "Framer Motion"].map((tech) => (
                <span
                    key={tech}
                    className="px-4 py-2 border border-gray-700 rounded-full text-gray-300 hover:border-accent hover:text-accent transition-all duration-300"
                >
                    {tech}
                </span>
                ))}
            </motion.div>
        </motion.div>
        </section>
    );
}
