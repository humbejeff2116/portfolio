import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import FloatingParticles from "../components/FloatingParticles";
import Magnetic from "../components/Magnetic";



export default function NotFound() {
    return (
        <section 
        id="projects" 
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative py-32 px-8 bg-gradient-to-b from-gray-950 to-black text-gray-400"
        >
            <FloatingParticles count={25} />
            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10 max-w-md"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent text-7xl font-bold mb-4"
                >
                404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
                    className="text-gray-300 text-2xl font-semibold mb-2"
                >
                    Page Not Found
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6, ease: "easeInOut" }}
                    className="text-text-secondary mb-6"
                >
                Sorry, we couldn't find the page you were looking for. It might have been moved or deleted.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.9, ease: "easeInOut" }}
                    className="mt-10 flex flex-col md:flex-row justify-center"
                >
                    <Magnetic className="flex justify-center items-center">
                        <Link
                            to="/" 
                            className="flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                        >
                            <Home size={24} className="mr-2"/>
                            Go Back Home
                        </Link>
                    </Magnetic>
                </motion.div>
            </motion.div>

            {/* Decorative floating orb */}
            <motion.div
                className="absolute -top-24 right-24 w-56 h-56 rounded-full bg-brand-secondary/20 blur-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
        </section>
    )
}