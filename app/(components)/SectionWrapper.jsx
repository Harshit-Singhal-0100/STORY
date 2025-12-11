"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionWrapper({
  id,
  children,
  glass = false,
  full = false,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`
        relative py-28 px-6 overflow-hidden
        ${glass ? "backdrop-blur-xl bg-white/5" : ""}
      `}
    >
      {/* ✅ TOP GLOW DIVIDER */}
      <div
        className="
          pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
          w-[60%] h-[1px]
          bg-gradient-to-r from-transparent via-cyan-400 to-transparent
          opacity-40
        "
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`
          mx-auto
          ${full ? "max-w-full" : "max-w-6xl"}
        `}
      >
        {children}
      </motion.div>
    </section>
  );
}
