// app/(sections)/Future.jsx
"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import futureIdeas from "@/data/future";

export default function Future() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="future"
      ref={ref}
      className="relative py-32 px-6 lg:px-12 overflow-hidden"
    >
      {/* Ambient Aurora Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] blur-[140px] animate-pulse" style={{ background: "var(--hero-gradient)", opacity: 0.2 }} />
      </div>

      {/* Title with Shimmer Sweep */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative text-center mb-24"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <h2 className="relative text-6xl md:text-8xl font-black tracking-tighter">
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
            Future Vision
          </span>
        </h2>

        <p className="mt-6 text-xl text-foreground/60 max-w-2xl mx-auto">
          Where I’m headed — building the next generation of digital experiences.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
      >
        {futureIdeas.map((idea, index) => (
          <FutureCard key={idea.title} idea={idea} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

function FutureCard({ idea, index }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Mouse-based 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  }

  function resetMouse() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 80, rotateX: 20 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { duration: 1, ease: "easeOut" },
        },
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      className="relative group rounded-3xl bg-card backdrop-blur-2xl border border-glass-border shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Animated Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl"
        style={{ background: "var(--hero-gradient)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Aurora Hover Overlay */}
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {mounted && [...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `80%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative p-10"
        style={{ transform: "translateZ(50px)" }}
      >
        <motion.h3
          className="text-2xl font-bold mb-4 bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--accent-gradient)" }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {idea.title}
        </motion.h3>

        <motion.p
          className="text-foreground/80 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {idea.summary}
        </motion.p>
      </div>

      {/* Energy Beam Line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1"
        style={{ background: "var(--hero-gradient)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: index * 0.15 + 0.8, duration: 1 }}
      />
    </motion.article>
  );
}
