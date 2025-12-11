"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import projects from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div
      ref={ref}
      className="relative w-full max-w-7xl mx-auto"
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px]"
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
            Projects
          </span>
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          Selected work & creative experiments
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  );
}

/* ✅ ULTRA PROJECT CARD */
function ProjectCard({ project, index, isInView }) {
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
        delay: index * 0.12,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.06 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl overflow-hidden
                 bg-card backdrop-blur-xl
                 border border-glass-border shadow-[0_30px_70px_rgba(0,0,0,0.45)]
                 p-6 md:p-8 flex flex-col justify-between"
    >
      {/* ✅ Gradient Hover Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{ background: "var(--hero-gradient)", opacity: 0.25 }}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 0.7 }}
      />

      {/* ✅ Content */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
          {project.title}
        </h3>

        <p className="text-foreground/80 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* ✅ Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-card text-foreground/80 border border-glass-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ✅ Buttons */}
      <div
        className="relative z-10 flex gap-4"
        style={{ transform: "translateZ(60px)" }}
      >
        <Link
          href={project.repo}
          target="_blank"
          className="px-5 py-2.5 text-white rounded-xl font-semibold 
                     transition hover:scale-105"
          style={{ background: "var(--hero-gradient)" }}
        >
          GitHub
        </Link>

        <Link
          href={`/projects/${project.slug}`}
          className="px-5 py-2.5 border rounded-xl 
                     font-semibold transition hover:scale-105"
          style={{ borderColor: "var(--glass-border)", color: "var(--text-primary)", background: "var(--card-bg)" }}
        >
          Details
        </Link>
      </div>

      {/* ✅ Neon Edge */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="absolute inset-0 border border-indigo-400/40 blur-md rounded-3xl" />
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
