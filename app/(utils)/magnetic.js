import { useEffect } from "react";

export default function useMagnetic(ref, strength = 0.1) {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const handleMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const reset = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", reset);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [ref, strength]);
}
