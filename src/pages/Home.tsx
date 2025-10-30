import { useEffect,  useState } from "react";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import { useScroll, useTransform } from "framer-motion";

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

  // Interpolate background colors based on scroll progress
  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(135deg, #0f172a, #1e293b)", // top
      "linear-gradient(135deg, #1e293b, #334155)", // middle
      "linear-gradient(135deg, #334155, #475569)" // bottom
    ]
  );

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
        <Helmet>
        <title>Humbe Jeffrey — Software Engineer</title>
        <meta name="description" content="Portfolio of Humbe Jeffrey, a Software Engineer specializing in modern web apps, TypeScript, and AI-powered solutions." />
        <meta name="keywords" content="Humbe Jeffrey, software engineer, React developer, TypeScript, frontend, portfolio" />
        <meta property="og:title" content="Humbe Jeffrey — Software Engineer" />
        <meta property="og:description" content="Modern portfolio showcasing Humbe Jeffrey’s work and projects in software engineering and web development." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://humbejeffrey.dev" />
        <meta property="og:image" content="https://humbejeffrey.dev/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Humbe Jeffrey — Software Engineer" />
        <meta name="twitter:description" content="Modern portfolio showcasing Humbe Jeffrey’s work and projects in software engineering and web development." />
        <meta name="twitter:image" content="https://humbejeffrey.dev/og-image.jpg" />
        <link rel="canonical" href="https://humbejeffrey.dev" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org/",
            "@type": "Person",
            "name": "Humbe Jeffrey",
            "url": "https://humbejeffrey.dev",
            "sameAs": [
              "https://github.com/humbejeffrey",
              "https://linkedin.com/in/humbejeffrey"
            ],
            "jobTitle": "Software Engineer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance / Open Farm"
            },
            "knowsAbout": ["React", "TypeScript", "Node", "AI Apps", "Web Development"],
            "image": "https://humbejeffrey.dev/profile.jpg"
          }
        `}</script>
      </Helmet>
      
        {/* <div className={`transition-all duration-500 ${scrolled ? "scale-[0.98] opacity-95" : "scale-100 opacity-100"}`}> */}
        <Hero />
        <SectionSeperator/>
        <About />
        <SectionSeperator/>
        <Projects/>
        <SectionSeperator/>
        <Contact/>
        {/* </div> */}
        </>
    );
}


function SectionSeperator() {
    return (
        <div className="w-1/3 h-px mx-auto my-20 bg-gradient-to-r from-transparent via-accent/90 to-transparent" />
    )
}
