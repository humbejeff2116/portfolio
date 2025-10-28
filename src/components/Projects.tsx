import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

const projects = [
    {
        title: "Open Farm",
        description: "AI-powered plant diagnosis platform for smallholder farmers.",
        link: "#",
    },
    {
        title: "Creators Hub",
        description: "A SaaS toolkit for creators to manage and monetize digital content.",
        link: "#",
    },
    {
        title: "Contract Vision",
        description: "AI contract reviewer for freelancers and small businesses.",
        link: "#",
    },
]

export default function Projects() {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.2 })

    useEffect(() => {
        if (inView) {
        controls.start("visible")
        }
    }, [controls, inView])

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    const variants = {
        active: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
        inactive: {
            opacity: 0, y: 40
        }
    }

    return (
        <section
        id="projects"
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-col items-center justify-center px-6 py-24"
        >
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-5xl w-full"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                className="block bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 hover:scale-[1.03] hover:border-blue-400 transition-transform duration-300"
                >
                <h3 className="text-2xl font-semibold mb-3 text-blue-400">
                    {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <span className="text-sm text-blue-400 hover:underline">
                    View Project →
                </span>
                </motion.a>
            ))}
            </div>
        </motion.div>
        </section>
    )
}
