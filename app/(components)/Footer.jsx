"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const icons = [
  { icon: <FaGithub />, link: "https://github.com/" },
  { icon: <FaLinkedin />, link: "https://linkedin.com/" },
  { icon: <FaInstagram />, link: "https://instagram.com/" },
  { icon: <FaEnvelope />, link: "mailto:your-email@example.com" },
];

export default function Footer() {
  const footerRef = useRef(null);

  // ✅ GSAP ENTRY ANIMATION
  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative mt-40 px-6 pt-16 pb-10 overflow-hidden"
      style={{
        backdropFilter: 'blur(24px)',
        background: 'var(--glass-bg)',
        borderTop: '1px solid var(--glass-border)',
      }}
    >
      {/* ✅ TOP GLOW LINE */}
      <div 
        className="absolute top-0 left-0 w-full h-[2px] opacity-70"
        style={{ background: 'var(--hero-gradient)' }}
      />

      {/* ✅ FLOATING AURA */}
      <div 
        className="pointer-events-none absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[70%] h-[120px] opacity-25 blur-[120px]"
        style={{ background: 'var(--hero-gradient)' }}
      />

      {/* ✅ CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-10">

        {/* ✅ TITLE */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          Let's Build Something Legendary.
        </motion.h3>

        {/* ✅ SOCIAL ICONS */}
        <div className="flex gap-8">
          {icons.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              whileHover={{
                scale: 1.25,
                y: -6,
                rotate: 8,
              }}
              whileTap={{ scale: 0.9 }}
              className="relative group text-2xl transition-colors duration-300 text-foreground/80 hover:text-foreground"
            >
              {/* Glow */}
              <span 
                className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition"
                style={{ background: 'var(--color-primary)' }}
              />
              {item.icon}
            </motion.a>
          ))}
        </div>

        {/* ✅ CTA TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm text-center max-w-xl text-foreground/60"
        >
          Open for freelance, collaborations, and startup partnerships.  
          Let's connect and create impactful digital experiences.
        </motion.p>

        {/* ✅ COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xs text-center text-foreground/40"
        >
          © {new Date().getFullYear()}{" "}
          <span className="font-medium" style={{ color: 'var(--color-primary)' }}>Harshit Singhal</span>
          <br />
          Crafted with Next.js, GSAP, Framer Motion & Three.js
        </motion.div>
      </div>
    </footer>
  );
}
