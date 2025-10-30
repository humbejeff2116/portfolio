/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import ProjectCard from "./ProjectCard";
import openFarmImage from '../assets/background/virus.svg';
import creatorsHubImage from '../assets/background/wave1.svg';
import contractIqImage from '../assets/background/wave2.svg';

const projects = [
    {
        title: "Open Farm",
        description: "AI-powered crop diagnosis and farmer community platform.",
        image: openFarmImage,
        techStack: ["Next.js", "Node.js", "Drizzle ORM"],
        link: "https://openfarm.io",
    },
    {
        title: "Creators Hub",
        description: "A SaaS platform for content creators to manage workflows and collaborations.",
        image: creatorsHubImage,
        link: "https://creatorshub.app",
        techStack: ["React", "Supabase", "Framer Motion"],
    },
    {
        title: "ContractIQ",
        description: "An AI contract reviewer for freelancers and SMBs.",
        image: contractIqImage,
        link: "https://contractiq.app",
        techStack: ["React", "Supabase", "Framer Motion"],
    },
]

export default function Projects() {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.2 });
    // const projectCard = useParallaxReveal({ offset: 40, duration: 0.6 });
    // const subText = useParallaxReveal({ offset: 20, delay: 0.3 });

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
        <section id="projects" className="relative py-32 px-8 bg-[#0b0b0b] text-white">
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-5xl w-full"
        >
            <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent mb-16"
            >
                Featured Projects
            </motion.h2>

            <div 
            // className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl"
            className="flex flex-wrap justify-center gap-12 max-w-6xl"
            >
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
