import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Magnetic from "./Magnetic";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    techStack?: string[];
}

export default function ProjectCard({ 
    title, 
    description, 
    image, 
    link,
    techStack 
}: ProjectCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [10, -10]);
    const rotateY = useTransform(x, [-50, 50], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;

        animate(x, relX * 0.4, { type: "spring", stiffness: 120, damping: 15 });
        animate(y, relY * 0.4, { type: "spring", stiffness: 120, damping: 15 });
    };

    const handleMouseLeave = () => {
        animate(x, 0, { type: "spring", stiffness: 120, damping: 15 });
        animate(y, 0, { type: "spring", stiffness: 120, damping: 15 });
    };

    return (
        <Magnetic>
        <motion.a
            ref={cardRef}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:w-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/80 border border-gray-700 hover:border-gray-600 shadow-xl"
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-40 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

            <div className="relative z-20 p-5">
            <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-b from-sky-500 to-indigo-600 bg-clip-text text-transparent">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
            {techStack && techStack.map((tech) =>
                <span
                key={tech}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md"
                >
                {tech}
                </span>
            )}
            </div>
            </div>
        </motion.a>
        </Magnetic>
    )
}