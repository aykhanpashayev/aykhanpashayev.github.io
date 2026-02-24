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
  // 3) Renderers
  // ---------------------------

  function renderJourney(container, data) {
    if (!container || !data) return;

    const levels = Array.isArray(data) ? data : (data.levels || []);
    if (!levels.length) return;

    container.innerHTML = "";

    levels.forEach((item) => {
      const card = document.createElement("article");
      card.className = "journey-card";

      const levelLabel = item.level ? escapeHTML(item.level) : "";
      const title = item.title ? escapeHTML(item.title) : "Untitled";
      const dateRange = item.dateRange ? escapeHTML(item.dateRange) : "";
      const blurb = item.blurb ? escapeHTML(item.blurb) : "";

      const highlights = Array.isArray(item.highlights) ? item.highlights : [];
      const highlightsHTML = highlights.length
        ? `
          <ul class="journey-highlights">
            ${highlights.map(h => `<li>${escapeHTML(h)}</li>`).join("")}
          </ul>
        `
        : "";

      card.innerHTML = `
        <header class="journey-card-header">
          <h3>
            ${levelLabel ? `<span class="journey-level">${levelLabel}</span> — ` : ""}
            <span class="journey-title">${title}</span>
          </h3>
          ${dateRange ? `<p class="journey-dates">${dateRange}</p>` : ""}
        </header>

        ${blurb ? `<p class="journey-blurb">${blurb}</p>` : ""}
        ${blurb && highlights.length ? `<div class="pixel-divider"></div>` : ""}
        ${highlightsHTML}
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

      const title = item.title ? escapeHTML(item.title) : "Highlight";
      const desc = item.description ? escapeHTML(item.description) : "";

      const tags = Array.isArray(item.tags) ? item.tags : [];
      const tagsHTML = tags.length
        ? `
          <div class="highlight-tags" aria-label="Tags">
            ${tags.map(t => `<span class="badge">${escapeHTML(t)}</span>`).join("")}
          </div>
        `
        : "";

      card.innerHTML = `
        <h3>${title}</h3>
        ${desc ? `<p>${desc}</p>` : ""}
        ${tagsHTML}
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