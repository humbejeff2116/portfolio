import { BlocksIcon, Leaf, LucideBookUp2 } from 'lucide-react';
import openFarmImage from '../assets/background/virus.svg';
import creatorsHubImage from '../assets/background/wave1.svg';
import contractIqImage from '../assets/background/wave2.svg';
export const projects = [
    {
        title: "Open Farm",
        description: "AI-powered crop diagnosis and farmer community platform.",
        image: openFarmImage,
        techStack: ["Next.js", "Node.js", "Drizzle ORM"],
        link: "https://openfarm.io",
        icon: <Leaf className='text-green-400' />
    },
    {
        title: "Creators Hub",
        description: "A SaaS platform for content creators to manage workflows and collaborations.",
        image: creatorsHubImage,
        link: "https://creatorshub.app",
        icon: <BlocksIcon className='text-sky-400' />,
        techStack: ["React", "Supabase", "Framer Motion"],
    },
    {
        title: "ContractIQ",
        description: "An AI contract reviewer for freelancers and SMBs.",
        image: contractIqImage,
        link: "https://contractiq.app",
        icon: <LucideBookUp2 className='text-blue-400' />,
        techStack: ["React", "Supabase", "Framer Motion"],
    },
]