'use client'

function PixelTerminal() {
  return (
    <div className="pixel-terminal" aria-hidden="true">
      <div className="pixel-terminal-bar">
        <span className="pixel-terminal-dot pixel-terminal-dot--red" />
        <span className="pixel-terminal-dot pixel-terminal-dot--yellow" />
        <span className="pixel-terminal-dot pixel-terminal-dot--green" />
        <span className="pixel-terminal-title">radius.exe</span>
      </div>
      <div className="pixel-terminal-body">
        <p><span className="pt-prompt">$</span> ./radius --watch</p>
        <p className="pt-muted">monitoring 847 iam events...</p>
        <p className="pt-muted">scanning for anomalies...</p>
        <p className="pt-warn">! cred stuffing detected</p>
        <p className="pt-warn">! blast radius: CRITICAL</p>
        <p className="pt-ok">✓ attacker disabled (28s)</p>
        <p className="pt-ok">✓ session revoked</p>
        <p className="pt-muted">── threat neutralized ──</p>
        <p><span className="pt-prompt">$</span><span className="pt-cursor">█</span></p>
      </div>
    </div>
  )
}

export default function HeroContent() {
  return (
    <div className="hero-inner">
      <div className="hero-text">
        <h1 className="hero-title hero-anim hero-anim--1">
          hey, i&apos;m aykhan.
        </h1>

        <p className="hero-value-prop hero-anim hero-anim--2">
          curiosity and late-night building sessions.
        </p>

        <div className="hero-status hero-anim hero-anim--3">
          <span className="hero-status-dot" aria-hidden="true" />
          <span>open to new quests</span>
        </div>

        <div
          className="hero-cta hero-anim hero-anim--4"
          role="group"
          aria-label="Primary actions"
        >
          <a className="btn btn--primary" href="#journey">start journey</a>
          <a
            className="btn btn--secondary"
            href="/assets/Aykhan Pashayev Resume.pdf"
            target="_blank"
            rel="noopener"
          >
            Resume
          </a>
        </div>

        <nav className="hero-links hero-anim hero-anim--5" aria-label="External links">
          <a href="https://github.com/aykhanpashayev" target="_blank" rel="noopener">
            GitHub
          </a>
          <span className="hero-links-divider">/</span>
          <a href="https://linkedin.com/in/aykhanpashayev" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <span className="hero-links-divider">/</span>
          <a href="mailto:aykhan.pashayev001@gmail.com">
            Email
          </a>
        </nav>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <PixelTerminal />
      </div>
    </div>
  )
}
