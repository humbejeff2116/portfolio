
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen bg-bg-main text-text-primary px-6 text-center">
        {/* Background gradient animation */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
        />

        {/* Content */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-md"
        >
            <h1 className="text-7xl font-bold mb-4 text-brand-primary">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-text-secondary mb-6">
            Sorry, we couldn’t find the page you were looking for. It might have been moved or deleted.
            </p>

            <motion.button className="bg-brand-primary hover:bg-brand-secondary text-white">
            <Link to="/">Go Back Home</Link>
            </motion.button>
        </motion.div>

        {/* Decorative floating orb */}
        <motion.div
            className="absolute -top-24 right-24 w-56 h-56 rounded-full bg-brand-secondary/20 blur-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        </main>
    )
}
