/* js/main.js
   Purpose: site bootstrap + content loading + subtle reveal
   Updated for redesigned portfolio with proof, enhanced projects, capabilities
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

      // Optional thumbnail from JSON: item.image.src + item.image.alt
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

  function renderProof(container, data) {
    if (!container || !data) return;

    const proof = Array.isArray(data) ? data : (data.proof || []);
    if (!proof.length) return;

    container.innerHTML = "";

    proof.forEach((item) => {
      const card = document.createElement("article");
      card.className = "proof-card";

      const title = item.title ? escapeHTML(item.title) : "Proof";
      const date = item.date ? escapeHTML(item.date) : "";
      const issuer = item.issuer ? escapeHTML(item.issuer) : "";
      const description = item.description ? escapeHTML(item.description) : "";

      // Badge image or placeholder
      const badgeSrc = item.badge?.src ? escapeHTML(item.badge.src) : "";
      const badgeAlt = item.badge?.alt ? escapeHTML(item.badge.alt) : "";

      const badgeHTML = badgeSrc
        ? `<img src="${badgeSrc}" alt="${badgeAlt}" loading="lazy" decoding="async" />`
        : `<span class="proof-badge--placeholder" aria-hidden="true">★</span>`;

      // Stats for achievements
      const stats = item.stats;
      const statsHTML = stats
        ? `
          <div class="proof-card-stats">
            ${stats.placement ? `
              <div class="proof-stat">
                <span class="proof-stat-value">${escapeHTML(stats.placement)}</span>
                <span class="proof-stat-label">Placement</span>
              </div>
            ` : ""}
            ${stats.team ? `
              <div class="proof-stat">
                <span class="proof-stat-value">${escapeHTML(stats.team)}</span>
                <span class="proof-stat-label">Team</span>
              </div>
            ` : ""}
            ${stats.prep ? `
              <div class="proof-stat">
                <span class="proof-stat-value">${escapeHTML(stats.prep)}</span>
                <span class="proof-stat-label">Prep Time</span>
              </div>
            ` : ""}
          </div>
        `
        : "";

      // Credential link
      const credential = item.credential;
      const credentialHTML = credential
        ? `
          <div class="proof-card-credential">
            <a class="btn btn--secondary btn--small" href="${escapeHTML(credential.url)}" target="_blank" rel="noopener">
              ↗ ${escapeHTML(credential.label)}
            </a>
          </div>
        `
        : "";

      card.innerHTML = `
        <div class="proof-card-header">
          <div class="proof-badge" aria-hidden="true">
            ${badgeHTML}
          </div>
          <div class="proof-card-body">
            <h3 class="proof-card-title">${title}</h3>
            <p class="proof-card-meta">${date}${issuer ? ` · ${issuer}` : ""}</p>
            ${description ? `<p class="proof-card-description">${description}</p>` : ""}
            ${statsHTML}
          </div>
        </div>
        ${credentialHTML}
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
      card.id = item.id ? `project-${item.id.replace("project-", "")}` : "";

      const title = item.title ? escapeHTML(item.title) : "Project";
      const dateRange = item.dateRange ? escapeHTML(item.dateRange) : "";
      const desc = item.description ? escapeHTML(item.description) : "";
      const why = item.why ? escapeHTML(item.why) : "";
      const role = item.role ? escapeHTML(item.role) : "";
      const challenge = item.challenge ? escapeHTML(item.challenge) : "";

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

      // Metrics block
      const metrics = item.metrics;
      const metricsHTML = metrics
        ? `
          <div class="project-metrics" aria-label="Project metrics">
            ${metrics.mttd ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.mttd)}</span>
                <span class="metric-label">MTTD</span>
              </div>
            ` : ""}
            ${metrics.mttr ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.mttr)}</span>
                <span class="metric-label">MTTR</span>
              </div>
            ` : ""}
            ${metrics.coverage ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.coverage)}</span>
                <span class="metric-label">Coverage</span>
              </div>
            ` : ""}
            ${metrics.tests ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.tests)}</span>
                <span class="metric-label">Tests</span>
              </div>
            ` : ""}
            ${metrics.detectors ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.detectors)}</span>
                <span class="metric-label">Detectors</span>
              </div>
            ` : ""}
            ${metrics.incidents ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.incidents)}</span>
                <span class="metric-label">Incidents</span>
              </div>
            ` : ""}
            ${metrics.pipeline ? `
              <div class="metric-item">
                <span class="metric-value" style="font-size: 0.875rem;">${escapeHTML(metrics.pipeline)}</span>
                <span class="metric-label">Pipeline</span>
              </div>
            ` : ""}
            ${metrics.events ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.events)}</span>
                <span class="metric-label">Events</span>
              </div>
            ` : ""}
            ${metrics.latency ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.latency)}</span>
                <span class="metric-label">Latency</span>
              </div>
            ` : ""}
            ${metrics.cost ? `
              <div class="metric-item">
                <span class="metric-value" style="font-size: 0.875rem;">${escapeHTML(metrics.cost)}</span>
                <span class="metric-label">Cost</span>
              </div>
            ` : ""}
            ${metrics.automation ? `
              <div class="metric-item">
                <span class="metric-value">${escapeHTML(metrics.automation)}</span>
                <span class="metric-label">Automation</span>
              </div>
            ` : ""}
          </div>
        `
        : "";

      // Architecture diagram
      const architecture = item.architecture;
      const architectureHTML = architecture
        ? `
          <div class="project-architecture">
            <img class="project-architecture-img" src="${escapeHTML(architecture.src)}" alt="${escapeHTML(architecture.alt)}" loading="lazy" decoding="async" />
            <p class="project-architecture-caption">Architecture Overview</p>
          </div>
        `
        : "";

      // Optional thumbnail from JSON
      const imgSrc = item.image?.src ? escapeHTML(item.image.src) : "";
      const imgAlt = item.image?.alt ? escapeHTML(item.image.alt) : "";

      const thumbnailHTML = imgSrc
        ? `
          <div class="project-thumb">
            <img class="project-thumb-img" src="${imgSrc}" alt="${imgAlt}" loading="lazy" decoding="async" />
          </div>
        `
        : `
          <div class="project-thumb project-thumb--placeholder" aria-hidden="true"></div>
        `;

      card.innerHTML = `
        <div class="project-card-inner">
          ${thumbnailHTML}

          <div class="project-body">
            <header class="project-header">
              <h3>${title}</h3>
              ${dateRange ? `<p class="project-dates">${dateRange}</p>` : ""}
            </header>

            ${desc ? `<p class="project-desc">${desc}</p>` : ""}

            ${metricsHTML}
            ${architectureHTML}

            ${role ? `<p class="project-role"><strong>Role:</strong> ${role}</p>` : ""}
            ${challenge ? `<p class="project-challenge"><strong>Challenge:</strong> ${challenge}</p>` : ""}

            ${(desc || why || role || challenge) && highlights.length ? `<div class="pixel-divider"></div>` : ""}
            ${highlightsHTML}

            ${why ? `<p class="project-why">"${why}"</p>` : ""}

            ${tagsHTML}
            ${linksHTML}
          </div>
        </div>
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

    nodeList.forEach((el, index) => {
      if (el.dataset.revealBound === "1") return;

      el.classList.add("reveal");
      el.style.transitionDelay = `${index * 80}ms`; // stagger
      el.dataset.revealBound = "1";
      revealObserver.observe(el);
    });
  }

  // ---------------------------
  // 6) Journey progress (section-only)
  // ---------------------------
  function setupJourneyProgress() {
    const section = document.getElementById("journey");
    const fill = document.getElementById("journeyProgressFill");
    const progressEl = section ? section.querySelector(".journey-progress") : null;

    if (!section || !fill || !progressEl) return;

    let ticking = false;

    function clamp01(n) {
      return Math.max(0, Math.min(1, n));
    }

    function update() {
      ticking = false;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const start = vh * 0.70;
      const end = vh * 0.30;

      const isOffscreen = rect.bottom <= 0 || rect.top >= vh;
      if (isOffscreen) {
        progressEl.classList.remove("is-active");
        fill.style.height = "0%";
        return;
      }

      progressEl.classList.add("is-active");

      const total = (rect.height - (end - start));
      const traveled = (start - rect.top);
      const p = total > 0 ? clamp01(traveled / total) : 0;

      fill.style.height = `${(p * 100).toFixed(2)}%`;
    }

    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // Anchor-click support
    document.addEventListener("click", (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[href="#journey"]') : null;
      if (!a) return;

      requestAnimationFrame(() => requestAnimationFrame(update));
    });

    // Hash navigation support
    window.addEventListener("hashchange", () => {
      requestAnimationFrame(() => requestAnimationFrame(update));
    });

    // Initial
    update();

    // Expose a tiny hook for "content loaded changed height"
    return { update };
  }

  // ---------------------------
  // 7) Content loader
  // ---------------------------
  async function loadContent(progressApi) {
    // Load proof section (new)
    const proofContainer = document.querySelector(".proof-grid[data-source]");
    if (proofContainer) {
      const src = proofContainer.getAttribute("data-source");
      if (src) {
        const proofData = await fetchJSON(src);
        renderProof(proofContainer, proofData);
        observeRevealTargets(proofContainer.querySelectorAll(".proof-card"));
      }
    }

    // Load journey
    const journeyContainer = document.querySelector(".journey-list[data-source]");
    if (journeyContainer) {
      const src = journeyContainer.getAttribute("data-source");
      if (src) {
        const journeyData = await fetchJSON(src);
        renderJourney(journeyContainer, journeyData);
        observeRevealTargets(journeyContainer.querySelectorAll(".journey-card"));

        // After journey renders, re-measure section height for progress math
        if (progressApi && typeof progressApi.update === "function") {
          requestAnimationFrame(() => requestAnimationFrame(progressApi.update));
        }
      }
    }

    // Load highlights (legacy - keep for backwards compat if needed)
    const highlightsContainer = document.querySelector(".highlights-grid[data-source]");
    if (highlightsContainer) {
      const src = highlightsContainer.getAttribute("data-source");
      if (src) {
        const highlightsData = await fetchJSON(src);
        renderHighlights(highlightsContainer, highlightsData);
        observeRevealTargets(highlightsContainer.querySelectorAll(".highlight-card"));
      }
    }

    // Load projects
    const projectsContainer = document.querySelector(".projects-grid[data-source]");
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
  // 7.5) Anchor scroll offset
  // ---------------------------
  function setupAnchorScroll() {
    const OFFSET = 80; // px — clear the nav

    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href").slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: "smooth" });

      // Keep URL in sync without triggering native jump
      history.pushState(null, "", `#${id}`);
    });
  }

  // ---------------------------
  // 8) Boot
  // ---------------------------
  document.addEventListener("DOMContentLoaded", () => {
    setFooterYear();
    setupRevealObserver();
    setupAnchorScroll();

    const progressApi = setupJourneyProgress();
    loadContent(progressApi);
  });
})();
