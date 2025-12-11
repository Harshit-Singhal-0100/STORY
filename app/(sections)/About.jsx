"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaDownload } from "react-icons/fa";
import gsap from "gsap";
import dynamic from "next/dynamic";

// Dynamically import ThreeHero with SSR disabled to prevent hydration issues
const DynamicThreeHero = dynamic(() => import("../(components)/ThreeHero"), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-xl animate-pulse" />
});

const skills = [
  "React", "Next.js", "TypeScript", "Tailwind CSS",
  "Node.js", "GSAP", "Three.js", "Framer Motion"
];

const socials = [
  { Icon: FaLinkedin, href: "https://linkedin.com/in/yourusername", color: "hover:text-[#0A66C2]" },
  { Icon: FaGithub,   href: "https://github.com/yourusername",       color: "hover:text-white" },
  { Icon: FaTwitter,  href: "https://twitter.com/yourusername",     color: "hover:text-[#1DA1F2]" },
];

export default function About() {
  const ref = useRef(null);
  const skillsRef = useRef(null);
  const orbsRef = useRef([]);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  // GSAP Enhancements (unchanged)
  useEffect(() => {
    if (isInView) {
      orbsRef.current.forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? [0, 60, 0] : [0, -60, 0],
          x: i % 2 === 0 ? [0, 30, 0] : [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          duration: 12 + i * 2,
          ease: "sine.inOut",
          repeat: -1,
          delay: i * 1.5,
        });
      });

      const skillElements = skillsRef.current.children;
      gsap.fromTo(
        skillElements,
        { y: 60, opacity: 0, rotation: -5 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            each: 0.15,
            from: "center",
            grid: "auto",
            ease: "power2.out",
            amount: 0.8,
          },
          onComplete: () => {
            gsap.to(skillElements, {
              y: [0, -8, 0],
              rotation: [0, 2, 0],
              duration: 3,
              ease: "sine.inOut",
              stagger: 0.1,
              repeat: -1,
              yoyo: true,
            });
          },
        }
      );
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-7xl mx-auto overflow-hidden"
    >
      {/* Enhanced Animated Floating Orbs with GSAP */}
      <motion.div 
        className="absolute inset-0 -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div ref={(el) => (orbsRef.current[0] = el)} className="absolute top-10 -left-60 w-112 h-112 bg-purple-700/40 rounded-full blur-4xl filter brightness-110" />
        <div ref={(el) => (orbsRef.current[1] = el)} className="absolute bottom-10 -right-60 w-112 h-112 bg-cyan-600/40 rounded-full blur-4xl filter brightness-110" />
        <div ref={(el) => (orbsRef.current[2] = el)} className="absolute top-1/3 left-1/4 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl filter brightness-110" />
        <div ref={(el) => (orbsRef.current[3] = el)} className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl filter brightness-110" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto py-20"
      >
        <div className="grid md:grid-cols-2 gap-24 items-center">
          
          {/* 3D HERO - NO OVERRIDES, JUST LOAD THE MODEL WITH EXISTING FORK FLOW */}
          <motion.div
            className="relative h-[600px] w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
          >
            <DynamicThreeHero />
            {/* Subtle glow overlay preserved */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-500/10 rounded-xl shadow-2xl pointer-events-none" />
          </motion.div>

          {/* CONTENT (unchanged) */}
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--accent-gradient)" }}
            >
              About Me
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
              className="text-xl text-foreground leading-relaxed max-w-prose"
            >
              I’m a creative full-stack developer crafting immersive, ultra-smooth,
              high-performance web experiences where motion meets meaning. With a passion for blending cutting-edge 3D visuals and fluid animations, I bring ideas to life in ways that captivate and engage.
            </motion.p>

            <div ref={skillsRef} className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-6 py-3 bg-white/15 backdrop-blur-lg border border-white/30 rounded-full text-sm font-semibold text-gray-100 hover:border-cyan-500 hover:bg-cyan-500/20 transition-all duration-300 shadow-md"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-10 pt-6">
              <div className="flex gap-8">
                {socials.map(({ Icon, href, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    whileHover={{ scale: 1.4, y: -10, rotate: 5 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`group p-5 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 text-3xl text-gray-300 ${color} transition-all duration-300 hover:shadow-lg`}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.12, boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-700 to-cyan-700 text-white font-bold rounded-full shadow-2xl hover:from-purple-600 hover:to-cyan-600 transition-all"
              >
                <FaDownload className="text-xl" />
                Download Resume
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}