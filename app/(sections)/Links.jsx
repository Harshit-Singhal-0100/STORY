// app/(sections)/Links.jsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import links from "@/data/links";

export default function Links() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
            Quick Links
          </span>
        </h2>
        <p className="mt-4 text-lg text-foreground/60">
          Everything you need, one click away
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {links.map((item, index) => (
          <LinkCard
            key={item.label}
            item={item}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}

function LinkCard({ item, index, isInView }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -16,
        scale: 1.05,
        rotateY: 8,
        rotateX: 8,
        transition: { duration: 0.4 },
      }}
      className="group relative block p-10 rounded-3xl bg-card backdrop-blur-2xl border border-glass-border shadow-xl overflow-hidden"
    >
      {/* Gradient Hover Background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: "var(--hero-gradient)", opacity: 0.2 }}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.2 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Optional: Add an icon here if you want */}
        <h3 className="text-2xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
          {item.label}
        </h3>
        <p className="mt-2 text-sm text-foreground/60 opacity-80">
          {item.description || "Click to visit"}
        </p>
      </div>

      {/* Arrow Icon on Hover */}
      <motion.div
        className="absolute top-6 right-6 text-cyan-400 opacity-0 group-hover:opacity-100"
        initial={{ x: -20 }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </motion.div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%]"
        whileHover={{ translateX: ["-150%", "150%"] }}
        transition={{ duration: 1.2 }}
      />
    </motion.a>
  );
}