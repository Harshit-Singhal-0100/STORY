"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function MagneticButton({ children, className = "" }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const reset = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", reset);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <motion.button
      ref={btnRef}
      whileTap={{ scale: 0.92 }}
      className={`
        relative px-8 py-4 rounded-full font-medium
        bg-white/10 backdrop-blur-xl
        border border-white/20 text-white
        shadow-[0_0_30px_rgba(0,255,255,0.15)]
        overflow-hidden transition-all
        hover:shadow-[0_0_45px_rgba(0,255,255,0.35)]
        ${className}
      `}
    >
      {/* ✅ GLOW AURA */}
      <span
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
          opacity-0 hover:opacity-20 transition
          blur-2xl
        "
      />

      {/* ✅ TEXT */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
