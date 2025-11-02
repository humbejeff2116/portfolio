import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import ProjectCard from "./ProjectCard";

import FloatingParticles from "./FloatingParticles";
import { projects } from "../data/projects.data";


export default function Projects() {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.2 });

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

    return (
        <section id="projects" className=" relative py-32 px-8 bg-gradient-to-b from-gray-950 to-black text-white">
        <FloatingParticles count={25} />
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-5xl w-full"
            style={{ opacity: 0.9 }}
        >
            <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent mb-16"
            >
                Featured Projects
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-12 max-w-6xl">
            {projects.map((project, i) => (
                <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                >
                    <ProjectCard {...project} />
                </motion.div>
            ))}
            </div>
        </motion.div>
        </section>
    )
}
