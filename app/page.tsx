import ParticlesCanvas from '@/components/ParticlesCanvas'
import JourneyProgressBar from '@/components/JourneyProgressBar'
import HeroContent from '@/components/HeroContent'
import projectsData from '@/content/projects.json'
import journeyData from '@/content/journey.json'
import proofData from '@/content/proof.json'

const METRIC_LABELS: Record<string, string> = {
  mttd: 'MTTD',
  mttr: 'MTTR',
  coverage: 'Coverage',
  tests: 'Tests',
  detectors: 'Detectors',
  incidents: 'Incidents',
  pipeline: 'Pipeline',
  events: 'Events',
  latency: 'Latency',
  cost: 'Cost',
  automation: 'Automation',
}

const PROJECT_ICONS: Record<string, string> = {
  'project-radius': '⚡',
  'project-anomai': '◎',
  'project-sg-remediation': '◈',
  'project-cloudtrail-monitoring': '◉',
}

export default function Home() {
  const projects = projectsData.projects
  const levels = journeyData.levels
  const proofs = proofData.proof

  return (
    <main id="main" role="main">
      {/* ── HERO ── */}
      <section className="hero" aria-label="Intro">
        <div className="hero-stack" role="presentation">
          <div className="hero-layer hero-layer--glow" aria-hidden="true">
            <div className="lamp-glow" />
          </div>

          <div className="hero-layer hero-layer--particles" aria-hidden="true">
            <ParticlesCanvas />
          </div>

          <div className="hero-layer hero-layer--content">
            <div className="hero-content">
              <HeroContent />
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section id="journey" className="section section--journey" aria-label="Journey">
        <header className="section-header">
          <h2>// journey</h2>
          <p>from python games at 15 to cloud security. level by level.</p>
        </header>

        <div className="journey-wrap">
          <JourneyProgressBar />

          <div className="journey-list">
            {levels.map((item, index) => {
              const isActive = index === levels.length - 1

              return (
                <article
                  key={item.id}
                  className={`journey-card${isActive ? ' journey-card--active' : ''}`}
                >
                  <div className="journey-card-inner">
                    <div className="journey-card-level" aria-hidden="true">
                      <span className="journey-lv-label">LVL</span>
                      <span className="journey-lv-num">{String(index).padStart(2, '0')}</span>
                    </div>

                    <div className="journey-body">
                      <div className="journey-card-head">
                        <h3 className="journey-title">{item.title}</h3>
                        <span
                          className={`journey-status${isActive ? ' journey-status--active' : ''}`}
                          aria-label={isActive ? 'Currently active' : 'Completed'}
                        >
                          {isActive ? 'ACTIVE' : 'CLEARED'}
                        </span>
                      </div>

                      {item.dateRange && (
                        <p className="journey-dates">{item.dateRange}</p>
                      )}

                      {item.blurb && (
                        <p className="journey-blurb">{item.blurb}</p>
                      )}

                      <div
                        className="journey-xp"
                        aria-label={`XP: ${isActive ? '750 of 1000' : '1000 of 1000'}`}
                      >
                        <div className="journey-xp-bar">
                          <div
                            className="journey-xp-fill"
                            style={{ width: isActive ? '75%' : '100%' }}
                          />
                        </div>
                        <span className="journey-xp-label">
                          {isActive ? '750 / 1000 XP' : '1000 / 1000 XP'}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section section--projects" aria-label="Projects">
        <header className="section-header">
          <h2>// projects</h2>
          <p>things i built. mostly AWS security.</p>
        </header>

        <div className="projects-grid">
          {projects.map((item) => {
            const metrics = item.metrics as unknown as Record<string, string> | undefined

            return (
              <article
                key={item.id}
                id={`project-${item.id.replace('project-', '')}`}
                className="project-card"
              >
                <div className="project-icon" aria-hidden="true">
                  {PROJECT_ICONS[item.id] ?? '◆'}
                </div>

                <div className="project-head">
                  <h3>{item.title}</h3>
                  {item.dateRange && (
                    <span className="project-date">{item.dateRange}</span>
                  )}
                </div>

                {item.description && (
                  <p className="project-desc">{item.description}</p>
                )}

                {metrics && Object.keys(metrics).length > 0 && (
                  <div className="project-metrics" aria-label="Project metrics">
                    {Object.entries(metrics).map(([key, value]) =>
                      value ? (
                        <div key={key} className="metric-item">
                          <span className="metric-value">{value}</span>
                          <span className="metric-label">
                            {METRIC_LABELS[key] ?? key.toUpperCase()}
                          </span>
                        </div>
                      ) : null
                    )}
                  </div>
                )}

                {item.tags?.length ? (
                  <div className="project-tags" aria-label="Project tags">
                    {item.tags.map((t) => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                ) : null}

                {item.links?.length ? (
                  <div className="project-links" aria-label="Project links">
                    {item.links.map((l) => (
                      <a
                        key={l.url}
                        className="btn btn--secondary btn--small"
                        href={l.url}
                        target="_blank"
                        rel="noopener"
                      >
                        ↗ {l.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="section section--achievements" aria-label="Achievements">
        <header className="section-header">
          <h2>// achievements</h2>
          <p>things unlocked along the way.</p>
        </header>

        <div className="achievements-grid">
          {proofs.map((item) => {
            const stats = item.stats as
              | { placement?: string; team?: string; prep?: string }
              | undefined
            const credential = item.credential as
              | { label: string; url: string }
              | undefined

            return (
              <article key={item.id} className="achievement-card">
                <div className="achievement-icon" aria-hidden="true">★</div>
                <div className="achievement-body">
                  <h3 className="achievement-title">{item.title}</h3>
                  <p className="achievement-meta">
                    {item.date}
                    {item.issuer ? ` · ${item.issuer}` : ''}
                  </p>

                  {stats && (
                    <div className="achievement-stats">
                      {stats.placement && (
                        <span className="achievement-stat">{stats.placement} placement</span>
                      )}
                      {stats.team && (
                        <span className="achievement-stat">{stats.team} team</span>
                      )}
                      {stats.prep && (
                        <span className="achievement-stat">{stats.prep} prep</span>
                      )}
                    </div>
                  )}

                  {credential && (
                    <a
                      className="achievement-link"
                      href={credential.url}
                      target="_blank"
                      rel="noopener"
                    >
                      verify ↗
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section section--about" aria-label="About">
        <p className="about-text">
          i&apos;m a cloud security engineer who got into tech at 15 building Python games —
          and ended up building AWS threat detection systems. my long-term goal is to become a
          cloud architect who designs infrastructure that&apos;s secure and elegant by default,
          not as an afterthought. open to teams that think the same way.
        </p>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section section--contact" aria-label="Contact">
        <header className="section-header">
          <h2>// let&apos;s talk</h2>
          <p>open to projects, roles, and conversations about cloud.</p>
        </header>

        <div className="contact-actions">
          <a className="btn btn--primary" href="mailto:aykhan.pashayev001@gmail.com">
            email me
          </a>
          <a
            className="btn btn--secondary"
            href="https://linkedin.com/in/aykhanpashayev"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          <a
            className="btn btn--secondary"
            href="https://github.com/aykhanpashayev"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </div>
      </section>
    </main>
  )
}
