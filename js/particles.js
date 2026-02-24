/* js/particles.js
   Purpose: Hero floating dust particles (very subtle)
   Lightweight + safe canvas sizing (HiDPI aware)
*/

(function () {
  "use strict";

  const canvas = document.getElementById("particlesCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let particles = [];
  const PARTICLE_COUNT = 8; // keep very low for subtle effect

  // Keep track of DPR for crisp rendering on HiDPI displays
  function getDPR() {
    return Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  }

  // ---------------------------
  // Resize handling (HiDPI safe)
  // ---------------------------
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    // Guard: if layout hasn't settled yet, try again next frame
    if (!rect.width || !rect.height) {
      requestAnimationFrame(resizeCanvas);
      return;
    }

    const dpr = getDPR();

    // Set actual pixel buffer size
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    // Draw in CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeCanvas();

  // ---------------------------
  // Particle factory
  // ---------------------------
  function createParticle() {
    // Use CSS-pixel space, not raw canvas buffer
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 1;
    const h = rect.height || 1;

    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 1,          // 1–3px
      speedY: Math.random() * 0.2 + 0.05,   // very slow upward drift
      opacity: Math.random() * 0.4 + 0.2
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  // ---------------------------
  // Draw
  // ---------------------------
  function draw() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 1;
    const h = rect.height || 1;

    // Clear in CSS pixels (transform handles scaling)
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "rgba(255, 204, 133, 0.9)";
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    ctx.globalAlpha = 1;
  }

  // ---------------------------
  // Update
  // ---------------------------
  function update() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 1;
    const h = rect.height || 1;

    particles.forEach((p) => {
      p.y -= p.speedY;

      // Reset when leaving screen
      if (p.y < -5) {
        p.y = h + 5;
        p.x = Math.random() * w;
      }
    });
  }

  // ---------------------------
  // Animation loop
  // ---------------------------
  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  // ---------------------------
  // Boot
  // ---------------------------
  initParticles();
  animate();
})();