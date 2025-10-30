import { motion, useScroll, useTransform } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useParallaxReveal } from "../hooks/useParallaxReveal";
import Magnetic from "./Magnetic";



export default function Hero() {
    const ref = useRef(null);
    const heroText = useParallaxReveal({ offset: 20 });
    const subText = useParallaxReveal({ offset: 20, delay: 0.3 });
    const link = useParallaxReveal({ offset: 0, delay: 0.6 });
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    
    // Create depth by moving layers at different speeds
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, 50]);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        section?.scrollIntoView({ behavior: "smooth" })
    }
    return (
        // <div ref={ref} className="relative min-h-screen overflow-hidden text-center transition-colors duration-700 ease-in-out">
        <section 
        id="home"
        ref={ref}
        className="motion-layer relative min-h-screen overflow-hidden text-center transition-colors duration-700 ease-in-out min-h-screen flex flex-col justify-center items-center"
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
                    {...heroText}
                    // className="text-5xl md:text-6xl font-bold mb-4"
                    className="text-5xl md:text-7xl font-bold bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent"
                >
                    <span>Hi, I'm</span> Humbe Jeffrey
                </motion.h1>
                <motion.h2
                    {...subText}
                    className="text-xl md:text-2xl text-gray-400"
                    // className="mt-4 text-lg text-slate-300 max-w-xl"
                >
                    Software Engineer • TypeScript • React • Node.js
                </motion.h2>
                <motion.div
                {...link}
                className="mt-10 flex space-x-6 justify-center items-center"
                >
                    <Magnetic>
                        <Link
                        to="/projects" 
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all">
                            View Projects
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link
                        to="/#"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('contact')
                        }} 
                        className="px-8 py-4 rounded-full border border-gray-600 hover:border-white text-gray-200 hover:text-white font-medium transition-all">
                            Contact Me
                        </Link>
                    </Magnetic>
                </motion.div>
            </motion.div>
        </section>
        // </div>
    )
}