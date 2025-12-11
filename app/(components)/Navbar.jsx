"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "timeline", label: "Timeline" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "photography", label: "Photography" },
  { id: "links", label: "Links" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
  { id: "future", label: "Future" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [active, setActive] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  // ✅ GSAP NAVBAR ENTRY
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }
    );
  }, []);

  // ✅ ACTIVE SECTION TRACKER
  useEffect(() => {
    const handler = () => {
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActive(item.id);
        }
      });
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-4 z-50 mx-auto w-[96%] rounded-full px-6 py-4"
      style={{
        backdropFilter: 'blur(24px)',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 20px 60px var(--glass-shadow)',
      }}
    >
      <nav className="flex items-center justify-between gap-6">

        {/* ✅ LOGO */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="font-semibold tracking-wide whitespace-nowrap"
          style={{ color: 'var(--text-primary)' }}
        >
          My Ultra Portfolio
        </motion.div>

        {/* ✅ NAV LINKS (DESKTOP) */}
        <div className="hidden lg:flex flex-wrap justify-center gap-6">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative text-sm font-medium transition-all
                ${
                  active === item.id
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }
              `}
            >
              {item.label}

              {/* ✅ ACTIVE UNDERLINE */}
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="
                    absolute -bottom-2 left-0 right-0 mx-auto
                    h-[2px] w-full
                    rounded-full
                  "
                  style={{ background: "var(--accent-gradient)" }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* ✅ RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {/* ✅ MOBILE MENU BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-2xl"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </nav>

      {/* ✅ MOBILE MENU OVERLAY (FULL SCREEN) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl lg:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white/80 hover:text-white text-3xl"
            >
              <FaTimes />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActive(item.id);
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`
                    text-3xl font-bold tracking-tight transition-colors
                    ${
                      active === item.id
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
                        : "text-white/60 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
  