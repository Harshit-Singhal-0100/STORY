"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import ThreeHero from "../(components)/ThreeHero";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rotateX = useTransform(my, [-50, 50], [8, -8]);
  const rotateY = useTransform(mx, [-50, 50], [-8, 8]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  function resetMove() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="w-full">
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={resetMove}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 py-24 px-6 md:px-12 rounded-[2.5rem]
                   shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
        style={{ background: "var(--hero-gradient)", rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Animated Aurora Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[900px] 
                          rounded-full blur-[140px] animate-pulse"
               style={{ background: "var(--accent-gradient)", opacity: 0.3 }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {mounted && [...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                y: [0, -120, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "10%",
              }}
            />
          ))}
        </div>

        {/* ✅ TEXT CONTENT */}
        <div
          className="flex-1 text-center md:text-left relative z-10"
          style={{ transform: "translateZ(60px)" }}
        >
          {/* Shimmer Heading */}
          <motion.div className="relative inline-block overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            >
              Crafting Modern Web Experiences
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white/90 text-lg md:text-xl mb-10 max-w-xl"
          >
            I build responsive, interactive, and visually stunning web
            applications. Explore my world through code and creativity.
          </motion.p>

          {/* ✅ MAGNETIC CTA BUTTONS */}
          <div className="flex justify-center md:justify-start gap-6">
            <MagneticButton>
              <a
                href="#about"
                className="px-7 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-xl"
              >
                Learn More
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/resume.pdf"
                download
                className="px-7 py-4 border border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition"
              >
                Download Resume
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* ✅ 3D HERO CANVAS ENTRANCE */}
        <motion.div
          className="flex-1 w-full h-80 md:h-[520px] relative z-10"
          style={{ transform: "translateZ(80px)" }}
          initial={{ opacity: 0, scale: 0.6, rotateY: 40 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.6, duration: 1.6, ease: "easeOut" }}
        >
          <ThreeHero />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ✅ MAGNETIC BUTTON COMPONENT */
function MagneticButton({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function move(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      {children}
    </motion.div>
  );
}
