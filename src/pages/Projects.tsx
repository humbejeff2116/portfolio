import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { projects } from "../data/projects.data";


export default function Projects() {
    return (
        <>
        <Helmet>
            <title>Projects — Humbe Jeffrey</title>
            <meta
            name="description"
            content="A showcase of software engineering projects by Humbe Jeffrey, featuring modern web apps and open-source work."
            />
            <meta
            name="keywords"
            content="Humbe Jeffrey projects, web development, TypeScript apps, React projects"
            />
            <meta property="og:title" content="Projects — Humbe Jeffrey" />
            <meta
            property="og:description"
            content="Explore featured projects and experiments by Humbe Jeffrey in web and software development."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://humbejeffrey.dev/projects" />
            <meta property="og:image" content="https://humbejeffrey.dev/og-projects.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Humbe Jeffrey projects" />
            <meta name="twitter:description" content="Modern portfolio showcasing Humbe Jeffrey’s work and projects in software engineering and web development." />
            <meta name="twitter:image" content="https://humbejeffrey.dev/og-image.jpg" />
            <link rel="canonical" href="https://humbejeffrey.dev/projects" />
        </Helmet>
        <div className="min-h-screen px-6 py-20">
        <h1 className="text-4xl font-bold mb-10 text-center">My Projects</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) =>
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0,255,255,0.3)" }}
                    className="p-6 rounded-xl border border-gray-700 bg-[#111] hover:border-accent transition-all"
                >
                    <h3 className="text-xl font-semibold mb-2 text-accent">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((stack) => 
                        <span
                        key={stack}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md"
                        >
                        {stack}
                        </span>
                    )}
                    </div>
                    <a
                    href={project.link}
                    target="_blank"
                    className="text-sm text-accent hover:underline"
                    >
                    View Project →
                    </a>
                </motion.div>
            )}
        </div>
        </div>
        </>
    )
}
