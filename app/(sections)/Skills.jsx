"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import skills from "../../data/skills";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-6xl mx-auto"
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2 
                        w-[900px] h-[900px]
                        rounded-full blur-[140px]"
             style={{ background: "var(--hero-gradient)", opacity: 0.1 }} />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-black tracking-tight">
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
            Skills
          </span>
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          My technical power stack
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.category}
            skill={skill}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

/* ✅ ULTRA SKILL CARD */
function SkillCard({ skill, index, isInView }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-50, 50], [12, -12]);
  const rotateY = useTransform(mx, [-50, 50], [-12, 12]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.07 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl overflow-hidden
                 bg-white/5 dark:bg-black/25 backdrop-blur-xl
                 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]
                 p-6 md:p-8"
    >
      {/* ✅ Gradient Hover Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{ background: "var(--hero-gradient)", opacity: 0.25 }}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.7 }}
      />

      {/* ✅ Content */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
          {skill.category}
        </h3>

        {/* ✅ Animated Skill Pills */}
        <div className="flex flex-wrap gap-3">
          {skill.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: index * 0.15 + i * 0.05 + 0.4,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="px-4 py-1.5 text-sm rounded-full 
                         bg-card text-foreground/80 
                         border border-glass-border 
                         hover:scale-110 transition"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ✅ Neon Edge */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none 
                      opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="absolute inset-0 border border-indigo-400/40 
                        blur-md rounded-3xl" />
      </div>

      {/* ✅ Cinematic Shine Sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r 
                   from-transparent via-white/10 to-transparent 
                   -skew-x-12 translate-x-[-160%]"
        whileHover={{ translateX: ["-160%", "160%"] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.article>
  );
}
