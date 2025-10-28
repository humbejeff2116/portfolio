import { motion } from "framer-motion";

const projects = [
    {
        title: "Open Farm",
        description: "AI-powered crop diagnosis tool for small farmers.",
        tech: ["Next.js", "Node.js", "Drizzle ORM"],
        link: "#",
    },
    {
        title: "Creators Hub",
        description: "SaaS for content creators to manage clients and payments.",
        tech: ["React", "Supabase", "Framer Motion"],
        link: "#",
    },
    // add more projects as needed
];

export default function Projects() {
    return (
        <div className="min-h-screen px-6 py-20">
        <h1 className="text-4xl font-bold mb-10 text-center">My Projects</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
            <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0,255,255,0.3)" }}
                className="p-6 rounded-xl border border-gray-700 bg-[#111] hover:border-accent transition-all"
            >
                <h3 className="text-xl font-semibold mb-2 text-accent">{p.title}</h3>
                <p className="text-gray-400 mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (
                    <span
                    key={t}
                    className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md"
                    >
                    {t}
                    </span>
                ))}
                </div>
                <a
                href={p.link}
                target="_blank"
                className="text-sm text-accent hover:underline"
                >
                View Project →
                </a>
            </motion.div>
            ))}
        </div>
        </div>
    );
}
