import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import FloatingParticles from "../components/FloatingParticles";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
    const ref = useRef(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    
    // Create depth by moving layers at different speeds
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, 50]);

    return (
        <div ref={ref} className="relative min-h-screen overflow-hidden text-center">
        {/* Hero section */}
        <section 
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center"
        >
            <FloatingParticles count={25} />
            {/* Parallax layers and hero content */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 bg-gradient-to-b from-[#0b0b0f] via-[#0b0b0f] to-[#050508] z-0"
            />

            <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,255,0.08),_transparent_70%)] blur-3xl z-0"
            />

 
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 px-6"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-6xl font-bold mb-4"
                >
                    <span className="text-accent">Hi, I'm</span> Humbe Jeffrey
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-xl md:text-2xl text-gray-400"
                >
                    Software Engineer • TypeScript • React • Node.js
                </motion.h2>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mt-10"
                >
                <Link
                    to="/projects"
                    className="border border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-background transition-all duration-300"
                >
                    View My Projects
                </Link>
                </motion.div>
            </motion.div>
        </section>
        {/* About section */}
        <SectionSeperator/>
        <About />
        <SectionSeperator/>
        <Projects/>
        <SectionSeperator/>
        <Contact/>
        </div>
    );
}


function SectionSeperator() {
    return (
        <div className="w-1/3 h-px mx-auto my-20 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    )
}
