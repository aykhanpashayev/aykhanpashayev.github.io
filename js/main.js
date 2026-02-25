/* js/main.js
   Purpose: small site bootstraps + content loading + subtle reveal
*/

(function () {
  "use strict";

  let revealObserver = null;

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
  // 3) Minimal HTML escaping (safety)
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
  // 4) Renderers
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
            ${highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join("")}
          </ul>
        `
        : "";

      const imgSrc = item.image?.src ? escapeHTML(item.image.src) : "";
      const imgAlt = item.image?.alt ? escapeHTML(item.image.alt) : "";

      const thumbnailHTML = imgSrc
        ? `
          <div class="journey-thumb">
            <img class="journey-thumb-img" src="${imgSrc}" alt="${imgAlt}" loading="lazy" decoding="async" />
          </div>
        `
        : `
          <div class="journey-thumb journey-thumb--placeholder" aria-hidden="true"></div>
        `;

      card.innerHTML = `
        <div class="journey-card-inner">
          ${thumbnailHTML}

          <div class="journey-body">
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
          </div>
        </div>
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
            ${tags.map((t) => `<span class="badge">${escapeHTML(t)}</span>`).join("")}
          </div>
        `
        : "";

      const links = Array.isArray(item.links) ? item.links : [];
      const linksHTML = links.length
        ? `
          <div class="highlight-links" aria-label="Proof links">
            ${links
              .map((l) => {
                const label = l.label ? escapeHTML(l.label) : "Link";
                const url = l.url ? escapeHTML(l.url) : "#";
                return `<a class="btn btn--secondary btn--small" href="${url}" target="_blank" rel="noopener">↗ ${label}</a>`;
              })
              .join("")}
          </div>
        `
        : "";

      card.innerHTML = `
        <h3>${title}</h3>
        ${desc ? `<p>${desc}</p>` : ""}
        ${tagsHTML}
        ${linksHTML}
      `;

      container.appendChild(card);
    });
  }

  function renderProjects(container, data) {
    if (!container || !data) return;

    const projects = Array.isArray(data) ? data : (data.projects || []);
    if (!projects.length) return;

    container.innerHTML = "";

    projects.forEach((item) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const title = item.title ? escapeHTML(item.title) : "Project";
      const dateRange = item.dateRange ? escapeHTML(item.dateRange) : "";
      const desc = item.description ? escapeHTML(item.description) : "";

      const highlights = Array.isArray(item.highlights) ? item.highlights : [];
      const highlightsHTML = highlights.length
        ? `
          <ul class="project-highlights">
            ${highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join("")}
          </ul>
        `
        : "";

      const tags = Array.isArray(item.tags) ? item.tags : [];
      const tagsHTML = tags.length
        ? `
          <div class="project-tags" aria-label="Project tags">
            ${tags.map((t) => `<span class="badge">${escapeHTML(t)}</span>`).join("")}
          </div>
        `
        : "";

      const links = Array.isArray(item.links) ? item.links : [];
      const linksHTML = links.length
        ? `
          <div class="project-links" aria-label="Project links">
            ${links
              .map((l) => {
                const label = l.label ? escapeHTML(l.label) : "Link";
                const url = l.url ? escapeHTML(l.url) : "#";
                return `<a class="btn btn--secondary btn--small" href="${url}" target="_blank" rel="noopener">↗ ${label}</a>`;
              })
              .join("")}
          </div>
        `
        : "";

      card.innerHTML = `
        <header class="project-header">
          <h3>${title}</h3>
          ${dateRange ? `<p class="project-dates">${dateRange}</p>` : ""}
        </header>

        ${desc ? `<p class="project-desc">${desc}</p>` : ""}
        ${desc && highlights.length ? `<div class="pixel-divider"></div>` : ""}
        ${highlightsHTML}

        ${tagsHTML}
        ${linksHTML}
      `;

      container.appendChild(card);
    });
  }

  // ---------------------------
  // 5) Reveal system
  // ---------------------------
  function setupRevealObserver() {
    if (!("IntersectionObserver" in window)) return;

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observeRevealTargets(document.querySelectorAll(".section-header"));
  }

  function observeRevealTargets(nodeList) {
    if (!revealObserver) return;

    nodeList.forEach((el) => {
      if (el.dataset.revealBound === "1") return;

      el.classList.add("reveal");
      el.dataset.revealBound = "1";
      revealObserver.observe(el);
    });
  }

  // ---------------------------
  // 6) Content loader
  // ---------------------------
  async function loadContent() {
    const journeyContainer = document.querySelector(".journey-list[data-source]");
    const highlightsContainer = document.querySelector(".highlights-grid[data-source]");
    const projectsContainer = document.querySelector(".projects-grid[data-source]");

    if (journeyContainer) {
      const src = journeyContainer.getAttribute("data-source");
      if (src) {
        const journeyData = await fetchJSON(src);
        renderJourney(journeyContainer, journeyData);
        observeRevealTargets(journeyContainer.querySelectorAll(".journey-card"));
      }
    }

    if (highlightsContainer) {
      const src = highlightsContainer.getAttribute("data-source");
      if (src) {
        const highlightsData = await fetchJSON(src);
        renderHighlights(highlightsContainer, highlightsData);
        observeRevealTargets(highlightsContainer.querySelectorAll(".highlight-card"));
      }
    }

    if (projectsContainer) {
      const src = projectsContainer.getAttribute("data-source");
      if (src) {
        const projectsData = await fetchJSON(src);
        renderProjects(projectsContainer, projectsData);
        observeRevealTargets(projectsContainer.querySelectorAll(".project-card"));
      }
    }
  }

  // ---------------------------
  // 7) Boot
  // ---------------------------
  document.addEventListener("DOMContentLoaded", () => {
    setFooterYear();
    setupRevealObserver();
    loadContent();
  });
})();