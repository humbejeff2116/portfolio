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
    const y1Opacity = useTransform(scrollY, [0, 400], [1, 0.5])
    // const y2 = useTransform(scrollY, [0, 500], [0, 50]);

    // Foreground accents (move opposite direction for layered depth)
    const orbY = useTransform(scrollY, [0, 500], [0, 100])
    const orbX = useTransform(scrollY, [0, 500], [0, -60])

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id)
        section?.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <section 
        id="home"
        ref={ref}
        className="motion-layer relative min-h-screen overflow-hidden text-center transition-colors duration-700 ease-in-out min-h-screen flex flex-col justify-center items-center"
        >
            <FloatingParticles count={25} />
            {/* Parallax layers and hero content */}
            <motion.div
            style={{ y: y1, opacity: y1Opacity }}
            className="absolute inset-0 -z-30 home-background bg-cover bg-center"
            />

            <motion.div
            style={{ y: y1, opacity: y1Opacity }}
            className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            
            {/*Floating orb accent - left */}
            <motion.div
            style={{ y: orbY, x: orbX }}
            className="absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-teal-500/20 blur-3xl"
            />

            {/*Floating orb accent - right */}
            <motion.div
            style={{ y: orbY, x: orbX }}
            className="absolute bottom-1/4 right-1/5 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl"
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 px-6"
            >
                <motion.h1
                {...heroText}
                className="text-6xl md:text-7xl font-bold bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent"
                >
                    <span >Hi, I'm</span> Humbe Jeffrey
                </motion.h1>

                <motion.h2
                {...subText}
                className="text-xl md:text-2xl text-gray-400"
                >
                    💻 Software Engineer.
                    <div>
                        I build digital experiences using code and ☕.
                    </div> 
                    <div>
                        Lets collaborate.
                    </div> 
                </motion.h2>

                <motion.div
                {...link}
                className="mt-10 flex flex-col md:flex-row justify-center"
                >
                    <Magnetic className="flex justify-center items-center">
                    <Link
                    to="/projects" 
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all">
                        View Projects
                    </Link>
                    </Magnetic>
                    
                    <Magnetic className=" md:ml-6 flex justify-center items-center mt-6 md:mt-0">
                    <Link
                    to="/#"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('contact')
                    }} 
                    className="px-8 py-4 rounded-full border border-indigo-400 hover:border-white text-gray-200 hover:text-white font-medium transition-all">
                        Contact Me
                    </Link>
                    </Magnetic>
                </motion.div>

            </motion.div>
        </section>
    )
}