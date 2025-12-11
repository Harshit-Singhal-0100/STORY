// app/(sections)/Contact.jsx
"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4500);
  };

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">

      {/* FLOATING AURORA ENVIRONMENT */}
      <div className="absolute inset-0 -z-10">
        <motion.div animate={{ y: [0, 80, 0] }} transition={{ repeat: Infinity, duration: 11 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "var(--color-primary)", opacity: 0.25 }} />
        <motion.div animate={{ y: [0, -60, 0] }} transition={{ repeat: Infinity, duration: 13 }}
          className="absolute bottom-20 right-1/2 translate-x-1/2 w-[520px] h-[520px] rounded-full blur-3xl" style={{ background: "var(--color-primary)", opacity: 0.25 }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl mx-auto"
      >

        {/* TITLE */}
        <motion.div className="text-center mb-20">
          <h2 className="text-7xl md:text-9xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>
              Get In Touch
            </span>
          </h2>
          <p className="mt-6 text-xl text-foreground/80">
            Let’s build something <span className="font-bold" style={{ color: "var(--color-primary)" }}>legendary</span>
          </p>
        </motion.div>

        {/* 3D PARALLAX FORM CARD */}
        <ParallaxCard>
          <motion.form
            onSubmit={handleSubmit}
            className="relative p-6 md:p-12 rounded-[2.5rem] bg-card backdrop-blur-3xl border border-glass-border shadow-[0_40px_120px_rgba(0,0,0,0.5)] overflow-hidden"
          >

            {/* BLOOM LAYER */}
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700"
              style={{ background: "var(--hero-gradient)", opacity: 0.3 }}
            />

            {/* PARTICLE FIELD */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-[3px] h-[3px] rounded-full"
                  style={{ background: "var(--color-primary)", opacity: 0.7, left: `${10 + i * 8}%`, top: "50%" }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 space-y-10">
              <FloatingInput placeholder="Your Name" type="text" delay={0.2} />
              <FloatingInput placeholder="Your Email" type="email" delay={0.4} />
              <FloatingTextarea placeholder="Tell me about your project..." delay={0.6} />

              {/* MAGNETIC CTA BUTTON */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="relative w-full py-6 px-8 rounded-2xl font-black text-xl overflow-hidden
                           text-white shadow-[0_20px_60px_rgba(56,189,248,0.4)]"
                style={{ background: "var(--hero-gradient)" }}
              >
                <span className="relative z-10">
                  {isSent ? "Message Launched 🚀" : "Send Message"}
                </span>

                {/* SHINE SWEEP */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-120%" }}
                  animate={isSent ? { x: ["-120%", "120%"] } : {}}
                  transition={{ duration: 1.4 }}
                />

                {/* CONFETTI PHYSICS BURST */}
                {isSent && (
                  <>
                    {[...Array(28)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          background: ["#a855f7", "#ec4899", "#06b6d4", "#fbbf24"][i % 4],
                          left: "50%",
                          top: "50%",
                        }}
                        animate={{
                          x: Math.cos(i * 12) * (120 + i * 6),
                          y: Math.sin(i * 12) * (120 + i * 6),
                          opacity: [1, 0],
                          scale: [1, 0],
                        }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                      />
                    ))}
                  </>
                )}
              </motion.button>
            </div>

            {/* ULTRA SHINE SCAN */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-160%]"
              whileHover={{ translateX: ["-160%", "160%"] }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </motion.form>
        </ParallaxCard>

      </motion.div>
    </div>
  );
}

/* -------------------- 3D PARALLAX WRAPPER -------------------- */

function ParallaxCard({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 150, damping: 20 });

  function mouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -16);
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
      whileHover={{ scale: 1.03 }}
      className="relative [transform-style:preserve-3d]"
    >
      {children}
    </motion.div>
  );
}

/* -------------------- FLOATING INPUTS -------------------- */

function FloatingInput({ placeholder, type, delay }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-7 py-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                   text-white text-lg focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
        placeholder=" "
      />
      <label
        className={`absolute left-7 transition-all duration-300 pointer-events-none
          ${focused || value ? "top-2 text-xs text-cyan-400" : "top-6 text-lg text-gray-400"}`}
      >
        {placeholder}
      </label>
    </motion.div>
  );
}

function FloatingTextarea({ placeholder, delay }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="relative">
      <textarea
        rows={5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-7 py-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                   text-white text-lg resize-none focus:outline-none focus:ring-4 focus:ring-purple-500/40"
        placeholder=" "
      />
      <label
        className={`absolute left-7 transition-all duration-300 pointer-events-none
          ${focused || value ? "top-2 text-xs text-purple-400" : "top-6 text-lg text-gray-400"}`}
      >
        {placeholder}
      </label>
    </motion.div>
  );
}
