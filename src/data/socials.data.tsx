import { 
    Github, 
    Linkedin, 
    Mail, 

    Twitter 
} from "lucide-react";

export const socials = [
    {
        href: "mailto:humbejeff2116@gmail.com",
        label: "Email", 
        icon: (
            <Mail size={22} />
        ),
        isBlankTarget: false
    },
    {
        href: "https://github.com/humbejeff2116",
        label: "Github", 
        icon: (
            <Github size={22} />
        ),
        isBlankTarget: true
    },
    {
        href: "https://linkedin.com/in/yourusername",
        label: "LinkedIn", 
        icon: (
            <Linkedin size={22} />
        ),
        isBlankTarget: true
    },
    {
        href: "https://twitter.com/yourusername",
        label: "Twitter", 
        icon: (
            <Twitter size={22} />
        ),
        isBlankTarget: true
    }
]