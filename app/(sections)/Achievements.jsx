// app/(sections)/Achievements.jsx
"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import achievements from "@/data/achievements";

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      
      {/* FLOATING AURORA BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <motion.div animate={{ y: [0, 80, 0] }} transition={{ repeat: Infinity, duration: 10 }} className="absolute top-20 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-3xl" style={{ background: "var(--color-primary)", opacity: 0.25 }} />
        <motion.div animate={{ y: [0, -60, 0] }} transition={{ repeat: Infinity, duration: 12 }} className="absolute bottom-20 right-1/2 translate-x-1/2 w-[460px] h-[460px] rounded-full blur-3xl" style={{ background: "var(--color-primary)", opacity: 0.25 }} />
      </div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center text-6xl md:text-8xl font-black tracking-tight mb-24"
      >
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
          Achievements
        </span>
      </motion.h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {achievements.map((item, index) => (
          <AchievementCard key={index} item={item} index={index} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function AchievementCard({ item, index, isInView }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 20 });

  function mouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 20);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -20);
  }

  function mouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 120, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.06 }}
      className="relative group [transform-style:preserve-3d]"
    >
      {/* GLASS DEPTH CARD */}
      <div className="relative h-full p-10 rounded-[2rem] bg-card backdrop-blur-2xl border border-glass-border shadow-[0_50px_120px_rgba(0,0,0,0.4)] overflow-hidden">

        {/* CINEMATIC LIGHT BLOOM */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: "var(--hero-gradient)", opacity: 0.3 }}
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.3 }}
        />

        {/* PARTICLE FIELD */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {mounted && [...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-[3px] h-[3px] bg-white/60 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, Math.random() * 240 - 120, 0],
                y: [0, Math.random() * 240 - 120, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: `${20 + i * 6}%`,
                top: `${20 + i * 4}%`,
              }}
            />
          ))}
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center space-y-4">
          {/* BADGE */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.6, type: "spring", stiffness: 220 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-3xl font-black text-white shadow-2xl"
          >
            {index + 1}
          </motion.div>

          <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {item.title}
          </h3>

          <p className="text-4xl font-black text-white opacity-90">
            {item.year}
          </p>

          {item.description && (
            <p className="text-gray-300 text-sm leading-relaxed mt-4 opacity-85">
              {item.description}
            </p>
          )}
        </div>

        {/* ULTRA SHINE SWEEP */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-160%]"
          whileHover={{ translateX: ["-160%", "160%"] }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
