// lib/gsapConfig.js  (or utils/gsapConfig.js)
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

// === HERO TIMELINE CONFIG (for your Hero section) ===
export const heroTimelineConfig = [
  {
    target: ".hero-title",
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
    delay: 0.3,
  },
  {
    target: ".hero-subtitle",
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
    delay: 0.6,
  },
  {
    target: ".hero-cta",
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.4)" },
    delay: 0.9,
  },
];

// === GLOBAL SECTION ANIMATIONS (all [data-section] elements) ===
export function initScrollAnimations() {
  const sections = gsap.utils.toArray("[data-section]");

  sections.forEach((section, i) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
          // Optional: add slight stagger per section
          // delay: i * 0.1,
        },
      }
    );
  });
}

// === HERO ANIMATION RUNNER (call this in your Hero component) ===
export function runHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTimelineConfig.forEach(({ target, from, to, delay = 0 }) => {
    tl.fromTo(target, from, { ...to, delay }, "<+=0.1");
  });

  return tl; // optional: return for more control
}