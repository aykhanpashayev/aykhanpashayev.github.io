/* js/particles.js
   Purpose: Hero floating dust particles (very subtle)
   Structure only — light implementation
*/

(function () {
  "use strict";

  const canvas = document.getElementById("particlesCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let particles = [];
  const PARTICLE_COUNT = 8; // keep very low for subtle effect

  // ---------------------------
  // Resize handling
  // ---------------------------
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // ---------------------------
  // Particle factory
  // ---------------------------
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1, // 1–3px max
      speedY: Math.random() * 0.2 + 0.05, // very slow upward drift
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.globalAlpha = p.opacity;

      // Color tuned
      ctx.fillStyle = "rgba(255, 204, 133, 0.9)";

      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    ctx.globalAlpha = 1;
  }

  // ---------------------------
  // Update
  // ---------------------------
  function update() {
    particles.forEach((p) => {
      p.y -= p.speedY;

      // Reset when leaving screen
      if (p.y < -5) {
        p.y = canvas.height + 5;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  // ---------------------------
  // Animation loop (very light)
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