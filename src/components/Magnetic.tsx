// src/components/ui/Magnetic.tsx
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({ 
    children, 
    strength = 0.4, 
    className 
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-50, 50], [10, -10]);
    const rotateY = useTransform(x, [-50, 50], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;

        animate(x, relX * strength, { type: "spring", stiffness: 150, damping: 15 });
        animate(y, relY * strength, { type: "spring", stiffness: 150, damping: 15 });
    };

    const handleMouseLeave = () => {
        animate(x, 0, { type: "spring", stiffness: 150, damping: 15 });
        animate(y, 0, { type: "spring", stiffness: 150, damping: 15 });
    };

    return (
        <motion.div
        ref={ref}
        className={className}
        style={{ x, y, rotateX, rotateY, perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        >
        {children}
        </motion.div>
    );
};

export default Magnetic;
