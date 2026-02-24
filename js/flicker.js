/* js/flicker.js
   Purpose: Lamp glow "breathing" (subtle, cinematic)
   Minimal + safe
*/

(function () {
  "use strict";

  const glow = document.querySelector(".lamp-glow");
  if (!glow) return;

  // Subtle values to avoid distraction
  const BASE_OPACITY = 0.55;
  const AMP_OPACITY = 0.08; // +/- 0.08

  const BASE_SCALE = 1.0;
  const AMP_SCALE = 0.01; // +/- 1%

  // Slow cycle: ~8–12 seconds
  const MIN_PERIOD = 8000;
  const MAX_PERIOD = 12000;

  let start = performance.now();
  let period = randomPeriod();

  function randomPeriod() {
    return Math.random() * (MAX_PERIOD - MIN_PERIOD) + MIN_PERIOD;
  }

  function tick(now) {
    const elapsed = now - start;
    const t = (elapsed % period) / period; // 0..1

    // Smooth sine wave (breathing)
    const wave = Math.sin(t * Math.PI * 2);

    const opacity = BASE_OPACITY + wave * AMP_OPACITY;
    const scale = BASE_SCALE + wave * AMP_SCALE;

    glow.style.opacity = String(opacity);
    glow.style.transform = `scale(${scale})`;

    // Occasionally vary the period slightly to feel organic
    if (elapsed > period) {
      start = now;
      period = randomPeriod();
    }

    requestAnimationFrame(tick);
  }

  // Boot baseline (prevents flash)
  glow.style.opacity = String(BASE_OPACITY);
  glow.style.transform = `scale(${BASE_SCALE})`;

  requestAnimationFrame(tick);
})();