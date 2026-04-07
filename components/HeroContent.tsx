'use client'

import { motion, useReducedMotion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const itemReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

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
  const reduced = useReducedMotion()
  const child = reduced ? itemReduced : item

  return (
    <div className="hero-inner">
      <motion.div
        className="hero-text"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-badge" aria-label="Role" variants={child}>
          <span className="hero-badge-icon">☁</span>
          <span>cloud security</span>
        </motion.div>

        <motion.h1 className="hero-title" variants={child}>
          hey, i&apos;m aykhan.
        </motion.h1>

        <motion.p className="hero-value-prop" variants={child}>
          building AWS systems that detect threats and fight back — automatically.
        </motion.p>

        <motion.div className="hero-status" variants={child}>
          <span className="hero-status-dot" aria-hidden="true" />
          <span>open to new quests</span>
        </motion.div>

        <motion.div
          className="hero-cta"
          role="group"
          aria-label="Primary actions"
          variants={child}
        >
          <a className="btn btn--primary" href="#projects">see my work</a>
          <a
            className="btn btn--secondary"
            href="https://github.com/aykhanpashayev"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </motion.div>

        <motion.nav className="hero-links" aria-label="External links" variants={child}>
          <a href="https://linkedin.com/in/aykhanpashayev" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <span className="hero-links-divider">/</span>
          <a href="mailto:aykhan.pashayev001@gmail.com">
            Email
          </a>
        </motion.nav>
      </motion.div>

      <div className="hero-visual" aria-hidden="true">
        <PixelTerminal />
      </div>
    </div>
  )
}
