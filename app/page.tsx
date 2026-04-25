import { Fragment } from 'react'
import ParticlesCanvas from '@/components/ParticlesCanvas'
import HeroContent from '@/components/HeroContent'
import JourneyCard from '@/components/JourneyCard'
import JourneyNodeShine from '@/components/JourneyNodeShine'
import projectsData from '@/content/projects.json'
import journeyData from '@/content/journey.json'
import proofData from '@/content/proof.json'

/* ── Visual project terminals ── */
function RadiusTerminal() {
  return (
    <div className="proj-terminal" aria-hidden="true">
      <div className="proj-terminal-bar">
        <span className="proj-terminal-dot" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-name">radius.exe</span>
        <span className="proj-terminal-badge">RUNNING</span>
      </div>
      <div className="proj-terminal-body">
        <p className="ptv-label">$ threat scan — aws organizations</p>
        <div className="ptv-scan-row">
          <span className="ptv-scan-key">cred stuffing</span>
          <span className="ptv-scan-bar"><span className="ptv-scan-fill ptv-scan-fill--high" style={{ width: '88%' }} /></span>
          <span className="ptv-scan-pct ptv-scan-pct--high">CRIT</span>
        </div>
        <div className="ptv-scan-row">
          <span className="ptv-scan-key">priv escalation</span>
          <span className="ptv-scan-bar"><span className="ptv-scan-fill ptv-scan-fill--high" style={{ width: '72%' }} /></span>
          <span className="ptv-scan-pct ptv-scan-pct--high">HIGH</span>
        </div>
        <div className="ptv-scan-row">
          <span className="ptv-scan-key">api anomaly</span>
          <span className="ptv-scan-bar"><span className="ptv-scan-fill ptv-scan-fill--med" style={{ width: '44%' }} /></span>
          <span className="ptv-scan-pct ptv-scan-pct--med">MED</span>
        </div>
        <div className="ptv-warn-badge">⚡ blast radius: CRITICAL</div>
        <p className="ptv-ok">✓ attacker disabled in 28s</p>
      </div>
    </div>
  )
}

function AnomAITerminal() {
  return (
    <div className="proj-terminal" aria-hidden="true">
      <div className="proj-terminal-bar">
        <span className="proj-terminal-dot" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-name">anomai.exe</span>
        <span className="proj-terminal-badge">RUNNING</span>
      </div>
      <div className="proj-terminal-body">
        <p className="ptv-label">$ detector sweep — cloudtrail</p>
        <div className="ptv-scan-row">
          <span className="ptv-scan-key">geo anomaly</span>
          <span className="ptv-scan-bar"><span className="ptv-scan-fill ptv-scan-fill--high" style={{ width: '91%' }} /></span>
          <span className="ptv-scan-pct ptv-scan-pct--high">91%</span>
        </div>
        <div className="ptv-scan-row">
          <span className="ptv-scan-key">unusual hour</span>
          <span className="ptv-scan-bar"><span className="ptv-scan-fill ptv-scan-fill--med" style={{ width: '67%' }} /></span>
          <span className="ptv-scan-pct ptv-scan-pct--med">67%</span>
        </div>
        <div className="ptv-scan-row">
          <span className="ptv-scan-key">perm creep</span>
          <span className="ptv-scan-bar"><span className="ptv-scan-fill ptv-scan-fill--med" style={{ width: '53%' }} /></span>
          <span className="ptv-scan-pct ptv-scan-pct--med">53%</span>
        </div>
        <div className="ptv-scan-row">
          <span className="ptv-scan-key">api velocity</span>
          <span className="ptv-scan-bar"><span className="ptv-scan-fill ptv-scan-fill--low" style={{ width: '28%' }} /></span>
          <span className="ptv-scan-pct ptv-scan-pct--low">28%</span>
        </div>
        <p className="ptv-ok">✓ 16 incidents · AI ready</p>
      </div>
    </div>
  )
}

function AIAssuranceTerminal() {
  return (
    <div className="proj-terminal" aria-hidden="true">
      <div className="proj-terminal-bar">
        <span className="proj-terminal-dot" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-name">defender.exe</span>
        <span className="proj-terminal-badge">RUNNING</span>
      </div>
      <div className="proj-terminal-body">
        <p className="ptv-label">$ scan --framework ISO/IEC-15408</p>
        <p className="ptv-doc-line">loading 5000+ pages...</p>
        <p className="ptv-doc-line ptv-doc-line--gap">gap detected — authentication (CC)</p>
        <p className="ptv-doc-line ptv-doc-line--gap">gap detected — audit logging (FAU)</p>
        <p className="ptv-doc-line ptv-doc-line--gap">gap detected — access control (FDP)</p>
        <p className="ptv-ok">✓ 83.3% expert agreement</p>
      </div>
    </div>
  )
}

function ShopEaseTerminal() {
  return (
    <div className="proj-terminal" aria-hidden="true">
      <div className="proj-terminal-bar">
        <span className="proj-terminal-dot" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-dot proj-terminal-dot--dim" />
        <span className="proj-terminal-name">shopease.exe</span>
        <span className="proj-terminal-badge">RUNNING</span>
      </div>
      <div className="proj-terminal-body">
        <p className="ptv-label">$ runbook --scenario payment-outage</p>
        <p className="ptv-doc-line">rto target: 2hr · rpo target: 15min</p>
        <p className="ptv-doc-line ptv-doc-line--gap">⚠ primary region: degraded</p>
        <p className="ptv-doc-line">→ failover: initiating</p>
        <p className="ptv-doc-line">→ db snapshot: restoring</p>
        <p className="ptv-ok">✓ recovery time: 1hr 47min</p>
      </div>
    </div>
  )
}

const PROJECT_VISUALS: Record<string, React.ComponentType> = {
  'project-radius': RadiusTerminal,
  'project-anomai': AnomAITerminal,
  'project-ai-assurance': AIAssuranceTerminal,
  'project-shopease': ShopEaseTerminal,
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

          {/* Layer 1 — pixel workspace scene (full background) */}
          <div className="hero-layer hero-layer--workspace" aria-hidden="true">
            <div className="pw-scene">
              {/* Pendant lamp glow — large warm circle */}
              <div className="pw-lamp-glow" />

              {/* Pendant lamp — cord from ceiling + cone shade */}
              <div className="pw-cord" />
              <div className="pw-pendant">
                <div className="pw-pendant-cone" />
                <div className="pw-pendant-socket" />
                <div className="pw-pendant-bulb" />
              </div>

              {/* Desk surface */}
              <div className="pw-desk">
                <div className="pw-desk-pool" />
              </div>

              {/* Book — Marcus Aurelius Meditations, front cover facing viewer */}
              <div className="pw-book-wrap">
                <div className="pw-book">
                  <div className="pw-book-cover">
                    <span className="pw-book-title">MEDITATIONS</span>
                    <span className="pw-book-author">M. AURELIUS</span>
                  </div>
                </div>
                <div className="pw-book-shadow" />
              </div>

              {/* Laptop */}
              <div className="pw-laptop-wrap">
                <div className="pw-laptop-screen">
                  <p className="pw-ln"><span className="pt-prompt">$</span> ./radius --watch</p>
                  <p className="pw-ln pt-muted">monitoring 847 events</p>
                  <p className="pw-ln pt-warn">! anomaly detected</p>
                  <p className="pw-ln pt-ok">✓ contained (28s)</p>
                  <p className="pw-ln"><span className="pt-prompt">$</span><span className="pt-cursor">█</span></p>
                </div>
                <div className="pw-laptop-hinge" />
                <div className="pw-laptop-base">
                  <div className="pw-laptop-keys" />
                </div>
              </div>

              {/* Tea mug */}
              <div className="pw-mug-wrap">
                <div className="pw-steam" />
                <div className="pw-steam pw-steam--2" />
                <div className="pw-mug" />
              </div>
            </div>
          </div>

          {/* Layer 2 — particles */}
          <div className="hero-layer hero-layer--particles" aria-hidden="true">
            <ParticlesCanvas />
          </div>

          {/* Layer 3 — text content */}
          <div className="hero-layer hero-layer--content">
            <div className="hero-content">
              <HeroContent />
            </div>
          </div>

        </div>
      </section>

      {/* ── JOURNEY — alternating skill-tree timeline ── */}
      <section id="journey" className="section section--journey" aria-label="Journey" data-reveal="">
        <header className="section-header">
          <h2>// journey</h2>
          <p>from python games at 15 to cloud security. level by level.</p>
        </header>

        <JourneyNodeShine />
        <div className="journey-timeline">
          {levels.map((item, index) => {
            const isLeft  = index % 2 === 0
            const isActive = index === levels.length - 1
            const isLast   = index === levels.length - 1

            const card = (
              <JourneyCard isActive={isActive} delay={index * 60}>
                <div className="journey-card-header">
                  <div className="journey-card-level" aria-hidden="true">
                    <span className="journey-lv-label">LVL</span>
                    <span className="journey-lv-num">{String(index).padStart(2, '0')}</span>
                  </div>
                  <div className="journey-card-info">
                    <div className="journey-card-title-row">
                      <h3 className="journey-title">{item.title}</h3>
                      <span
                        className={`journey-status${isActive ? ' journey-status--active' : ''}`}
                        aria-label={isActive ? 'Currently active' : 'Completed'}
                      >
                        {isActive ? '▶ ACTIVE' : '✓ CLEARED'}
                      </span>
                    </div>
                  </div>
                </div>

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
              </JourneyCard>
            )

            return (
              <Fragment key={item.id}>
                {/* Col 1 — left card or spacer */}
                <div className={`journey-col${isLeft ? ' journey-col--left' : ' journey-col--spacer'}`}>
                  {isLeft && card}
                </div>

                {/* Col 2 — diamond node + vertical line */}
                <div className="journey-center">
                  <div className={`journey-node${isActive ? ' journey-node--active' : ''}`} />
                  {!isLast && <div className="journey-node-line" />}
                </div>

                {/* Col 3 — right card or spacer */}
                <div className={`journey-col${!isLeft ? ' journey-col--right' : ' journey-col--spacer'}`}>
                  {!isLeft && card}
                </div>
              </Fragment>
            )
          })}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section section--projects" aria-label="Projects" data-reveal="">
        <header className="section-header">
          <h2>// projects</h2>
          <p>things i built. mostly AWS security.</p>
        </header>

        <div className="projects-grid">
          {projects.map((item) => {
            const Terminal = PROJECT_VISUALS[item.id] ?? null
            return (
              <article
                key={item.id}
                id={`project-${item.id.replace('project-', '')}`}
                className="project-card"
              >
                {Terminal && <Terminal />}

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
      <section id="achievements" className="section section--achievements" aria-label="Achievements" data-reveal="">
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

                    {item.description && (
                      <p className="achievement-desc">{item.description}</p>
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
      <section id="contact" className="section section--contact" aria-label="Contact" data-reveal="">
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
