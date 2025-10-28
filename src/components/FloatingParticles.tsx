import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export default function FloatingParticles({ 
    count = 20 
}: { 
    count?: number 
}) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100, // vw
            y: Math.random() * 100, // vh
            size: Math.random() * 3 + 1,
            duration: Math.random() * 10 + 8,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {particles.map((p) => (
            <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
                y: [p.y + "%", p.y - 10 + "%", p.y + "%"],
                opacity: [0, 0.6, 0],
            }}
            transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="absolute rounded-full bg-accent blur-[2px]"
            style={{
                width: p.size,
                height: p.size,
                left: `${p.x}vw`,
                top: `${p.y}vh`,
                opacity: 0.4,
            }}
            />
        ))}
        </div>
    );
}
