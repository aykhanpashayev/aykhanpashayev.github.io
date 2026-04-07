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

/* Executable name for each project's mini-terminal */
const PROJECT_EXE: Record<string, string> = {
  'project-radius': 'radius',
  'project-anomai': 'anomai',
  'project-sg-remediation': 'sg-remediator',
  'project-cloudtrail-monitoring': 'ct-monitor',
}

function ProjectTerminal({
  id,
  metrics,
}: {
  id: string
  metrics: Record<string, string> | undefined
}) {
  const exe = PROJECT_EXE[id] ?? id.replace('project-', '')
  const entries = metrics ? Object.entries(metrics).filter(([, v]) => v) : []

  return (
    <div className="proj-terminal" aria-hidden="true">
      <div className="proj-terminal-bar">
        <span className="proj-terminal-dot" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-name">{exe}.exe</span>
        <span className="proj-terminal-badge">RUNNING</span>
      </div>
      <div className="proj-terminal-body">
        {entries.map(([key, value]) => (
          <div key={key} className="proj-stat-row">
            <span className="proj-stat-prompt">&gt;</span>
            <span className="proj-stat-key">{(METRIC_LABELS[key] ?? key).toLowerCase()}</span>
            <span className="proj-stat-sep">:</span>
            <span className="proj-stat-val">{value}</span>
          </div>
        ))}
        <div className="proj-stat-row">
          <span className="proj-stat-prompt">&gt;</span>
          <span className="proj-stat-key">status</span>
          <span className="proj-stat-sep">:</span>
          <span className="proj-stat-val proj-stat-val--ok">operational</span>
        </div>
      </div>
    </div>
  )
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
                          {isActive ? '▶ ACTIVE' : '✓ CLEARED'}
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
                            className={`journey-xp-fill${isActive ? ' journey-xp-fill--active' : ''}`}
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
                <ProjectTerminal id={item.id} metrics={metrics} />

                <div className="project-head">
                  <h3>{item.title}</h3>
                  {item.dateRange && (
                    <span className="project-date">{item.dateRange}</span>
                  )}
                </div>

                {item.description && (
                  <p className="project-desc">{item.description}</p>
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

        <div className="achievements-sys-log" aria-hidden="true">
          <span className="sys-log-prefix">[sys]</span>
          <span className="sys-log-text"> loading achievement records</span>
          <span className="pt-cursor">█</span>
        </div>

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
                <div className="achievement-card-inner">
                  <div className="achievement-icon-wrap" aria-hidden="true">
                    <span className="achievement-icon">★</span>
                    <span className="achievement-unlocked-label">UNLOCKED</span>
                  </div>
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
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section section--contact" aria-label="Contact">
        <header className="section-header">
          <h2>// let&apos;s talk</h2>
          <p>open to connect.</p>
        </header>

        <div className="contact-terminal" aria-hidden="true">
          <span className="pt-prompt">$</span>
          <span className="contact-terminal-text"> ping aykhan --open-to new-quests</span>
          <br />
          <span className="pt-ok">✓</span>
          <span className="contact-terminal-text"> connection available</span>
          <br />
          <span className="pt-prompt">$</span>
          <span className="pt-cursor">█</span>
        </div>

        <div className="contact-actions">
          <a className="btn btn--primary" href="mailto:aykhan.pashayev001@gmail.com">
            Email
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
