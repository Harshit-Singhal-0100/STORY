"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from "framer-motion";
import { useRef } from "react";
import timeline from "@/data/timeline";

export default function Timeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Central energy beam grows with scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.2, 1, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto"
    >
      {/* Background Energy Field */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[1200px] h-[1200px] 
                        rounded-full blur-[160px]"
             style={{ background: "var(--hero-gradient)", opacity: 0.1 }} />
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center text-6xl md:text-8xl font-black tracking-tight mb-40"
      >
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
          Timeline
        </span>
      </motion.h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Central Energy Beam */}
        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-1 top-0 bottom-0">
          <motion.div
            style={{ height: lineHeight, opacity: glowOpacity, background: "var(--hero-gradient)" }}
            className="w-full rounded-full shadow-[0_0_60px_rgba(168,85,247,0.8)]"
          />
        </div>

        {/* Events */}
        <div className="space-y-24 md:space-y-72">
          {timeline.map((item, index) => (
            <Event key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Event({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const isLeft = index % 2 === 0;

  // Magnetic Tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="relative"
    >
      {/* Connector Beam */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`hidden md:block absolute top-1/2 h-1 w-1/2 ${
          isLeft
            ? "left-1/2 origin-left bg-gradient-to-r from-purple-500"
            : "right-1/2 origin-right bg-gradient-to-l from-cyan-500"
        }`}
      />

      {/* Energy Orb */}
      <motion.div
        className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 18,
        }}
      >
        <div className="relative">
          {/* Pulse Ring */}
          <div className="absolute inset-0 w-12 h-12 md:w-20 md:h-20 rounded-full 
                          border border-purple-400/40 animate-ping" />
          {/* Glow */}
          <div className="absolute inset-0 w-10 h-10 md:w-16 md:h-16 bg-purple-500/50 rounded-full blur-xl animate-pulse" />

          {/* Core */}
          <div className="relative w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-purple-400 to-cyan-400 
                          rounded-full shadow-2xl flex items-center justify-center ring-4 ring-white/20">
            <span className="text-white font-black text-sm md:text-xl">
              {index + 1}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3D Cine Card */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`relative max-w-lg w-full ml-20 md:ml-0 ${
          isLeft ? "md:ml-auto md:pr-24" : "md:mr-auto md:pl-24"
        }`}
        initial={{ x: isLeft ? 200 : -200, rotate: isLeft ? 15 : -15 }}
        animate={isInView ? { x: 0, rotate: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
          delay: 0.5,
        }}
        whileHover={{
          scale: 1.07,
          transition: { duration: 0.4 },
        }}
        style={{
          rotateX: my,
          rotateY: mx,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="group relative overflow-hidden rounded-3xl 
                        bg-white/5 backdrop-blur-3xl border border-white/10 
                        p-6 md:p-10 shadow-[0_40px_90px_rgba(0,0,0,0.6)]">

          {/* Dynamic Glow Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br 
                       from-purple-600/25 via-pink-600/10 to-cyan-600/25 
                       opacity-0 group-hover:opacity-100"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.6 }}
          />

          {/* Shine Sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r 
                       from-transparent via-white/15 to-transparent 
                       -skew-x-12 translate-x-[-150%]"
            whileHover={{ translateX: ["-150%", "150%"] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <h3 className="text-5xl font-black 
                           bg-gradient-to-r from-purple-400 to-cyan-400 
                           bg-clip-text text-transparent mb-4">
              {item.year}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {item.event}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
