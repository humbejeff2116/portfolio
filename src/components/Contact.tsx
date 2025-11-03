import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion,  useScroll, useTransform } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import { useParallaxReveal } from "../hooks/useParallaxReveal";
import Magnetic from "./Magnetic";
import FloatingParticles from "./FloatingParticles";
import { socials } from "../data/socials.data";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const sectionRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLTextAreaElement>(null);
    const headingText = useParallaxReveal({ offset: 40 });
    const subText = useParallaxReveal({ offset: 40, delay: 0.3 });
    
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"],
    });

    // Smooth fade-in and upward parallax motion
    const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    useEffect(() => {
        let timer: number | undefined

        if (status !== "idle") {
            timer = setTimeout(() => setStatus("idle"), 7000);
             
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [status]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch( 
                import.meta.env.VITE_WORKER_URL,
                {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setStatus("sent");
                form.reset();
                setTimeout(() => setStatus("idle"), 4000); // reset after toast fades out
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const toggleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
         return e.target.classList.add('form-contains');
        }
        return e.target.classList.remove('form-contains');
    }

    return (
        <>
        <footer>
        <section
        ref={sectionRef}
        id="contact"
        className="relative py-32 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden"
        >
        {/* Background Gradients */} 
        
        <motion.div 
        style={{ opacity: bgOpacity, y, scale }}
        className="absolute inset-0 bg-gradient-to-tr from-black via-indigo-500/20 to-transparent" 
        />
        <FloatingParticles count={25} />
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative text-center max-w-2xl"
        >
            <motion.h2
            {...headingText}
            className="text-4xl md:text-5xl font-bold text-center py-2 bg-gradient-to-t from-sky-500 to-indigo-600 bg-clip-text text-transparent mb-16"
            >
                Let's Connect
            </motion.h2>
            
            <motion.p
                className="max-w-2xl text-gray-400 mb-8 leading-relaxed text-lg"
                {...subText}
                // viewport={{ once: true, amount: 0.6 }}
            >
                I'm always open to discussing new projects, creative ideas, or
                opportunities to collaborate. Let's build something great together.
            </motion.p>

            <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3, ease: "easeInOut" }}
            className="space-y-6 text-left"
            >
            <div>
                <input
                onBlur={toggleBlur} 
                title="Name"
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="inset-10 w-full px-4 py-3 rounded-xl bg-gray-950 border border-zinc-700 focus:outline-none focus:border-brand-500 transition-all"
                />
            </div>
            <div>
                <input
                title="Email Address"
                type="email"
                name="email"
                placeholder="Yourmail@mail.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-zinc-700 focus:outline-none focus:border-brand-500 transition-all"
                />
            </div>
            <div>
                <textarea
                ref={messageInputRef}
                title="Message"
                name="message"
                placeholder="Your message..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-zinc-700 focus:outline-none focus:border-brand-500 transition-all"
                />
            </div>
            <Magnetic>
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className=" cursor-pointer flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-600 text-white transition-colors font-medium"
                >
                {status === "sending" ? (
                    <>
                        <motion.div
                        className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message <Send className="w-4 h-4" />
                    </>
                )}
                </button>
            </Magnetic>
            </motion.form>

            {/* Animated success toast */}
            <AnimatePresence>
            {status === "sent" && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 text-brand-400"
                >
                    <CheckCircle className="w-5 h-5 text-brand-400" />
                    <span>Your message has been sent successfully!</span>
                </motion.div>
            )}
            </AnimatePresence>
            <AnimatePresence>
            {status === "error" && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-red-800 border border-red-700 rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 text-red-300"
                >
                    <span>Something went wrong. Please try again later.</span>
                </motion.div>
            )}
            </AnimatePresence>


            <motion.div
            className="flex space-x-6 justify-center items-center mt-16 mb-16"
            >
            {socials.map((social, i) => 
                <SocialLink 
                key={social.href} 
                {...social}
                index={i}
                />
            )}
            </motion.div>
        </motion.div>

        <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3, ease: "easeInOut" }}
        className="relative text-gray-600 text-sm"
        >
            © {new Date().getFullYear()} @jeff.codes{<sup className="mx-0.2">TM</sup>}. Built with ❤️ using React & Framer Motion
        </motion.p>
        </section>
        </footer>
        </>
    )
}

interface SocialLinkProps {
    href: string;
    label: string;
    icon: React.ReactElement
    isBlankTarget?: boolean
    index: number

}

function SocialLink({
    href,
    label,
    icon,
    isBlankTarget,
    index
}: SocialLinkProps) {
    return (
        <Magnetic>
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeInOut" }}
            className="p-3 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300"
            >
            <Link
                to={href}
                target={isBlankTarget ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
            >
                {icon}
            </Link>
            </motion.div>
        </Magnetic>
    )
}
