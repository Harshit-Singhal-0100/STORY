"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);

  // ✅ SCROLL PROGRESS LOGIC
  useEffect(() => {
    const handleScroll = () => {
      const percent =
        (window.scrollY /
          (document.body.scrollHeight - window.innerHeight)) *
        100;

      setProgress(Math.min(100, Math.max(0, percent)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ GSAP ENTRY ANIMATION
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, ease: "elastic.out(1,0.4)", duration: 1 }
    );
  }, []);

  // ✅ BACK TO TOP
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 22;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.button
      ref={ref}
      onClick={scrollTop}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        backdrop-blur-xl bg-white/5
        border border-white/20
        flex items-center justify-center
        shadow-[0_0_35px_rgba(0,255,255,0.25)]
        cursor-pointer
      "
    >
      {/* ✅ SVG CIRCLE PROGRESS */}
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        className="absolute"
      >
        <circle
          cx="26"
          cy="26"
          r="22"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="26"
          cy="26"
          r="22"
          stroke="url(#grad)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.2 }}
        />

        {/* ✅ GRADIENT */}
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* ✅ PERCENT TEXT */}
      <span className="relative z-10 text-xs text-white font-semibold">
        {Math.round(progress)}%
      </span>
    </motion.button>
  );
}
