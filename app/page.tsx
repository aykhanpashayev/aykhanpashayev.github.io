import ParticlesCanvas from '@/components/ParticlesCanvas'
import JourneyProgressBar from '@/components/JourneyProgressBar'
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

const SMALL_FONT_METRICS = new Set(['pipeline', 'cost'])

export default function Home() {
  const projects = projectsData.projects
  const levels = journeyData.levels
  const proofs = proofData.proof

  return (
    <main id="main" role="main">
      {/* ========================= HERO ========================= */}
      <section className="hero" aria-label="Intro">
        <div className="hero-stack" role="presentation">
          <div className="hero-layer hero-layer--scene" aria-hidden="true">
            <img
              className="hero-scene"
              src="/assets/img/hero/hero-desk.png"
              alt=""
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="hero-layer hero-layer--glow" aria-hidden="true">
            <div className="lamp-glow" />
          </div>

          <div className="hero-layer hero-layer--particles" aria-hidden="true">
            <ParticlesCanvas />
          </div>

          <div className="hero-layer hero-layer--content">
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge" aria-label="Role">
                  <span className="hero-badge-icon">☁</span>
                  <span>Cloud Security Engineer</span>
                </div>

                <h1 className="hero-title">Aykhan Pashayev</h1>

                <p className="hero-value-prop">
                  I build IAM threat detection systems that respond in seconds, not hours.
                </p>

                <p className="hero-lines">
                  <span>
                    Currently building: <strong>Radius</strong> — AWS Organizations-scale threat detection
                  </span>
                  <br />
                  <span>Focus: IAM anomalies, automated response, AI-assisted triage</span>
                  <br />
                  <span>Open to: Cloud Security, IAM Engineering, Incident Response roles</span>
                </p>

                <div className="hero-cta" role="group" aria-label="Primary actions">
                  <a className="btn btn--primary" href="#projects" aria-label="View projects">
                    View Projects
                  </a>
                  <a
                    className="btn btn--secondary"
                    href="/assets/Aykhan Pashayev Resume.pdf"
                    target="_blank"
                    rel="noopener"
                    aria-label="Open resume PDF"
                  >
                    Resume
                  </a>
                </div>

                <nav className="hero-links" aria-label="External links">
                  <a
                    href="https://github.com/aykhanpashayev"
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                  <span className="hero-links-divider">/</span>
                  <a
                    href="https://linkedin.com/in/aykhanpashayev"
                    target="_blank"
                    rel="noopener"
                  >
                    LinkedIn
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= PROOF ========================= */}
      <section id="proof" className="section section--proof" aria-label="Proof">
        <header className="section-header">
          <h2>Proof</h2>
          <p>Certifications, competition results, and research — quick credibility signals.</p>
        </header>

        <div className="proof-grid">
          {proofs.map((item) => {
            const badge = item.badge as { src: string; alt: string } | null
            const stats = item.stats as
              | { placement?: string; team?: string; prep?: string }
              | undefined
            const credential = item.credential as
              | { label: string; url: string }
              | undefined

            return (
              <article key={item.id} className="proof-card">
                <div className="proof-card-header">
                  <div className="proof-badge" aria-hidden="true">
                    {badge?.src ? (
                      <img
                        src={badge.src}
                        alt={badge.alt ?? ''}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="proof-badge--placeholder" aria-hidden="true">
                        ★
                      </span>
                    )}
                  </div>

                  <div className="proof-card-body">
                    <h3 className="proof-card-title">{item.title}</h3>
                    <p className="proof-card-meta">
                      {item.date}
                      {item.issuer ? ` · ${item.issuer}` : ''}
                    </p>
                    {item.description && (
                      <p className="proof-card-description">{item.description}</p>
                    )}

                    {stats && (
                      <div className="proof-card-stats">
                        {stats.placement && (
                          <div className="proof-stat">
                            <span className="proof-stat-value">{stats.placement}</span>
                            <span className="proof-stat-label">Placement</span>
                          </div>
                        )}
                        {stats.team && (
                          <div className="proof-stat">
                            <span className="proof-stat-value">{stats.team}</span>
                            <span className="proof-stat-label">Team</span>
                          </div>
                        )}
                        {stats.prep && (
                          <div className="proof-stat">
                            <span className="proof-stat-value">{stats.prep}</span>
                            <span className="proof-stat-label">Prep Time</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {credential && (
                  <div className="proof-card-credential">
                    <a
                      className="btn btn--secondary btn--small"
                      href={credential.url}
                      target="_blank"
                      rel="noopener"
                    >
                      ↗ {credential.label}
                    </a>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* ========================= PROJECTS ========================= */}
      <section
        id="projects"
        className="section section--projects"
        aria-label="Featured Projects"
      >
        <header className="section-header">
          <h2>Featured Projects</h2>
          <p>
            Technical case studies — built to be readable, testable, and operational under
            pressure.
          </p>
        </header>

        <div className="projects-grid">
          {projects.map((item) => {
            const metrics = item.metrics as Record<string, string> | undefined
            const image = item.image as { src: string; alt: string } | undefined
            const architecture = item.architecture as
              | { src: string; alt: string }
              | undefined

            return (
              <article
                key={item.id}
                id={`project-${item.id.replace('project-', '')}`}
                className="project-card"
              >
                <div className="project-card-inner">
                  {image?.src ? (
                    <div className="project-thumb">
                      <img
                        className="project-thumb-img"
                        src={image.src}
                        alt={image.alt ?? ''}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div
                      className="project-thumb project-thumb--placeholder"
                      aria-hidden="true"
                    />
                  )}

                  <div className="project-body">
                    <header className="project-header">
                      <h3>{item.title}</h3>
                      {item.dateRange && (
                        <p className="project-dates">{item.dateRange}</p>
                      )}
                    </header>

                    {item.description && (
                      <p className="project-desc">{item.description}</p>
                    )}

                    {metrics && Object.keys(metrics).length > 0 && (
                      <div className="project-metrics" aria-label="Project metrics">
                        {Object.entries(metrics).map(([key, value]) =>
                          value ? (
                            <div key={key} className="metric-item">
                              <span
                                className="metric-value"
                                style={
                                  SMALL_FONT_METRICS.has(key)
                                    ? { fontSize: '0.875rem' }
                                    : undefined
                                }
                              >
                                {value}
                              </span>
                              <span className="metric-label">
                                {METRIC_LABELS[key] ?? key.toUpperCase()}
                              </span>
                            </div>
                          ) : null
                        )}
                      </div>
                    )}

                    {architecture && (
                      <div className="project-architecture">
                        <img
                          className="project-architecture-img"
                          src={architecture.src}
                          alt={architecture.alt}
                          loading="lazy"
                          decoding="async"
                        />
                        <p className="project-architecture-caption">Architecture Overview</p>
                      </div>
                    )}

                    {item.role && (
                      <p className="project-role">
                        <strong>Role:</strong> {item.role}
                      </p>
                    )}
                    {item.challenge && (
                      <p className="project-challenge">
                        <strong>Challenge:</strong> {item.challenge}
                      </p>
                    )}

                    {(item.description || item.role || item.challenge) &&
                      item.highlights?.length ? (
                        <div className="pixel-divider" />
                      ) : null}

                    {item.highlights?.length ? (
                      <ul className="project-highlights">
                        {item.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    ) : null}

                    {item.why && (
                      <p className="project-why">&ldquo;{item.why}&rdquo;</p>
                    )}

                    {item.tags?.length ? (
                      <div className="project-tags" aria-label="Project tags">
                        {item.tags.map((t) => (
                          <span key={t} className="badge">
                            {t}
                          </span>
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
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ========================= JOURNEY ========================= */}
      <section id="journey" className="section section--journey" aria-label="Journey">
        <header className="section-header">
          <h2>Journey</h2>
          <p>Short chapters. Real milestones. Built over time.</p>
        </header>

        <div className="journey-wrap">
          <JourneyProgressBar />

          <div className="journey-list">
            {levels.map((item) => {
              const image = item.image as { src: string; alt: string } | undefined

              return (
                <article key={item.id} className="journey-card">
                  <div className="journey-card-inner">
                    {image?.src ? (
                      <div className="journey-thumb">
                        <img
                          className="journey-thumb-img"
                          src={image.src}
                          alt={image.alt ?? ''}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div
                        className="journey-thumb journey-thumb--placeholder"
                        aria-hidden="true"
                      />
                    )}

                    <div className="journey-body">
                      <header className="journey-card-header">
                        <h3>
                          {item.level && (
                            <span className="journey-level">{item.level}</span>
                          )}
                          {item.level && ' — '}
                          <span className="journey-title">{item.title}</span>
                        </h3>
                        {item.dateRange && (
                          <p className="journey-dates">{item.dateRange}</p>
                        )}
                      </header>

                      {item.blurb && (
                        <p className="journey-blurb">{item.blurb}</p>
                      )}

                      {item.blurb && item.highlights?.length ? (
                        <div className="pixel-divider" />
                      ) : null}

                      {item.highlights?.length ? (
                        <ul className="journey-highlights">
                          {item.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================= CAPABILITIES ========================= */}
      <section
        id="capabilities"
        className="section section--capabilities"
        aria-label="Capabilities"
      >
        <header className="section-header">
          <h2>Capabilities</h2>
          <p>What I deliver — organized by domain, backed by projects.</p>
        </header>

        <div className="capabilities-grid" role="list">
          <article className="capability-card" role="listitem">
            <header className="capability-card-header">
              <div className="capability-icon" aria-hidden="true">🎯</div>
              <h3 className="capability-title">Threat Detection</h3>
            </header>
            <ul className="capability-list">
              <li>IAM anomaly detection (AnomAI — 6 detectors, 16 incidents in 120 days)</li>
              <li>Privilege escalation & credential stuffing detection (Radius — 7 rules)</li>
              <li>CloudTrail event-driven monitoring (40+ security-relevant APIs)</li>
              <li>Blast Radius scoring for incident prioritization</li>
            </ul>
            <div className="capability-links">
              <a className="btn btn--secondary btn--small" href="#project-radius">
                Radius →
              </a>
              <a className="btn btn--secondary btn--small" href="#project-anomai">
                AnomAI →
              </a>
            </div>
          </article>

          <article className="capability-card" role="listitem">
            <header className="capability-card-header">
              <div className="capability-icon" aria-hidden="true">🚨</div>
              <h3 className="capability-title">Incident Response</h3>
            </header>
            <ul className="capability-list">
              <li>Automated remediation (MTTD &lt;1s, MTTR ~4s)</li>
              <li>Session revocation & IAM user disabling</li>
              <li>Security Group drift detection & auto-healing</li>
              <li>SIEM-style dashboards for triage workflows</li>
            </ul>
            <div className="capability-links">
              <a
                className="btn btn--secondary btn--small"
                href="#project-sg-remediation"
              >
                Auto-Remediation →
              </a>
            </div>
          </article>

          <article className="capability-card" role="listitem">
            <header className="capability-card-header">
              <div className="capability-icon" aria-hidden="true">🏗</div>
              <h3 className="capability-title">Cloud Architecture</h3>
            </header>
            <ul className="capability-list">
              <li>AWS-native design: Lambda, IAM, VPC, S3, Config, CloudTrail</li>
              <li>Event-driven pipelines (EventBridge → Lambda → DynamoDB)</li>
              <li>Cost-aware, secure-by-default infrastructure</li>
              <li>192-test suites with 89% coverage (Radius)</li>
            </ul>
            <div className="capability-links">
              <a className="btn btn--secondary btn--small" href="#project-radius">
                Radius →
              </a>
            </div>
          </article>

          <article className="capability-card" role="listitem">
            <header className="capability-card-header">
              <div className="capability-icon" aria-hidden="true">🤖</div>
              <h3 className="capability-title">AI-Assisted Security</h3>
            </header>
            <ul className="capability-list">
              <li>LLM-powered incident explanation for non-experts</li>
              <li>AI evaluation for security requirement completeness (ISO/IEC 15408)</li>
              <li>Anomaly detection with ML signal classification</li>
              <li>First-authored research paper (submitted)</li>
            </ul>
            <div className="capability-links">
              <a className="btn btn--secondary btn--small" href="#project-anomai">
                AnomAI →
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ========================= ABOUT ========================= */}
      <section id="about" className="section section--about" aria-label="About">
        <header className="section-header">
          <h2>About</h2>
          <p>Who I am and how I got here.</p>
        </header>

        <div className="about-content">
          <p className="about-lead">
            I&apos;m a cloud security engineer who believes defense should be automatic.
          </p>

          <p>
            My path started with curiosity — building games in Python at 15, then
            troubleshooting hardware at UMass Boston, then diving into networking and
            security at FIU. Along the way, I learned that the best security systems
            don&apos;t just alert; they respond.
          </p>

          <p>
            I&apos;ve led teams under pressure (CCDC regional qualifier, 16/48), published
            research on AI-assisted security assurance, and built IAM threat detection
            systems with 89% test coverage. But I&apos;m most proud of systems that work
            silently — preventing incidents before they become headlines.
          </p>

          <p>
            When I&apos;m not architecting cloud systems, I&apos;m teaching others to
            build them. I&apos;ve served as a lab assistant and tutor because I believe
            technical knowledge should be accessible.
          </p>

          <p className="about-close">
            I&apos;m looking for teams that value security as a product feature, not a
            compliance checkbox.
          </p>
        </div>
      </section>

      {/* ========================= CONTACT ========================= */}
      <section id="contact" className="section section--contact" aria-label="Contact">
        <header className="section-header">
          <h2>Contact</h2>
          <p>Building cloud security systems. Open to opportunities.</p>
        </header>

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
