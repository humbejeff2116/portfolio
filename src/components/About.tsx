import { motion } from "framer-motion";
import { useParallaxReveal } from "../hooks/useParallaxReveal";
import FloatingParticles from "./FloatingParticles";


const skills = ["TypeScript", "Golang", "React", "Next.js", "Node.js"];

export default function About() {
    const headingText = useParallaxReveal({ offset: 30 });
    const subText = useParallaxReveal({ offset: 40, delay: 0.3 });

    return (
        <section
        id="about"
        className="relative  min-h-screen flex items-center justify-center text-white px-6 md:px-12"
        >
        <FloatingParticles count={25} />
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white/0.5 backdrop-blur-lg md:backdrop-blur-sm z-20 max-w-3xl px-5 py-10 rounded-2xl shadow-sm shadow-indigo-500"
        >
            <motion.h2
                className="text-4xl md:text-5xl font-bold text-left md:text-center py-2 bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent mb-16"
                {...headingText}
                // viewport={{ once: true, amount: 0.6 }}
            >
                About Me
            </motion.h2>

            <motion.p
                className="max-w-2xl text-left md:text-center text-gray-400 leading-relaxed text-lg"
                {...subText}
                // viewport={{ once: true, amount: 0.6 }}
            >
                I'm <span className="bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent">Humbe Jeffrey</span>, a software engineer who
                loves building scalable, high performing, and secured user-focused applications.
                My work spans across full-stack development using
                <span className="text-accent"> TypeScript</span>,<span className="text-accent"> Golang</span>, <span className="text-accent">React</span>, and <span className="text-accent">Node.js</span>.
                I enjoy turning complex ideas, using software engineering best practices, into delightful and great user experiences, always paying attention to details and clean design in the proccess.
            </motion.p>

            <div
                className="mt-10 flex gap-6 flex-wrap justify-center"
            >
            {skills.map((skill, i) => 
                <Skill 
                key={skill}
                skill={skill}
                index={i}  
                />
            )}
            </div>
        </motion.div>
        </section>
    )
}

interface SkillProps {
    index: number
    skill: string
}

function Skill({
    skill,
    index
}: SkillProps) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeInOut" }}
        // viewport={{ once: true }}
        className="px-6 py-3 text-gray-400 font-medium rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400 hover:text-indigo-400 transition-all duration-300"
        >
            <p >{skill}</p>
        </motion.div>
    )
}
