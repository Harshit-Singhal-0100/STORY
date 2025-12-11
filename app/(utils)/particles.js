export function initParticles(canvas) {
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d");
  let animationId;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 120 }, () => createParticle());

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;

      // Wrap-around edges
      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56,189,248,0.8)";
      ctx.fill();
    });

    animationId = requestAnimationFrame(draw);
  }

  draw();

  // ✅ PROPER CLEANUP
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
  };
}
