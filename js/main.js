/* js/main.js
   Purpose: small site bootstraps + future content loading
   (No fancy logic yet)
*/

(function () {
  "use strict";

  // ---------------------------
  // 1) Footer year
  // ---------------------------
  function setFooterYear() {
    const el = document.getElementById("year");
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
  }

  // ---------------------------
  // 2) Fetch helper (safe)
  // ---------------------------
  async function fetchJSON(url) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch ${url} (status ${res.status})`);
      return await res.json();
    } catch (err) {
      console.warn(`[main.js] ${err.message}`);
      return null;
    }
  }

  // ---------------------------
  // 3) Placeholder renderers
  //    (Later we’ll replace these with real card templates)
  // ---------------------------
  function renderJourney(container, data) {
    if (!container || !data) return;

    // Expecting: { "levels": [ ... ] } or just [ ... ]
    const levels = Array.isArray(data) ? data : (data.levels || []);
    if (!levels.length) return;

    // Clear placeholder HTML
    container.innerHTML = "";

    levels.forEach((item) => {
      const card = document.createElement("article");
      card.className = "journey-card";

      // Minimal fields (we’ll evolve this later)
      const title = item.title || item.level || "Untitled";
      const blurb = item.blurb || item.summary || "";

      card.innerHTML = `
        <h3>${escapeHTML(title)}</h3>
        ${blurb ? `<p>${escapeHTML(blurb)}</p>` : ""}
      `;

      container.appendChild(card);
    });
  }

  function renderHighlights(container, data) {
    if (!container || !data) return;

    const highlights = Array.isArray(data) ? data : (data.highlights || []);
    if (!highlights.length) return;

    container.innerHTML = "";

    highlights.forEach((item) => {
      const card = document.createElement("article");
      card.className = "highlight-card";

      const title = item.title || "Highlight";
      const desc = item.description || item.blurb || "";

      card.innerHTML = `
        <h3>${escapeHTML(title)}</h3>
        ${desc ? `<p>${escapeHTML(desc)}</p>` : ""}
      `;

      container.appendChild(card);
    });
  }

  // ---------------------------
  // 4) Minimal HTML escaping (safety)
  // ---------------------------
  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ---------------------------
  // 5) Content loader
  // ---------------------------
  async function loadContent() {
    const journeyContainer = document.querySelector(".journey-list[data-source]");
    const highlightsContainer = document.querySelector(".highlights-grid[data-source]");

    if (journeyContainer) {
      const src = journeyContainer.getAttribute("data-source");
      if (src) {
        const journeyData = await fetchJSON(src);
        renderJourney(journeyContainer, journeyData);
      }
    }

    if (highlightsContainer) {
      const src = highlightsContainer.getAttribute("data-source");
      if (src) {
        const highlightsData = await fetchJSON(src);
        renderHighlights(highlightsContainer, highlightsData);
      }
    }
  }

  // ---------------------------
  // 6) Boot
  // ---------------------------
  document.addEventListener("DOMContentLoaded", () => {
    setFooterYear();
    loadContent(); // harmless if JSON files don’t exist yet
  });
})();