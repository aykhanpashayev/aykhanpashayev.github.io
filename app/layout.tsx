import type { Metadata } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import BackgroundCanvas from '@/components/BackgroundCanvas'
import SectionObserver from '@/components/SectionObserver'
import './globals.css'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aykhan Pashayev',
  description:
    'Cloud security engineer building AWS systems that detect threats and fight back automatically.',
  authors: [{ name: 'Aykhan Pashayev' }],
  openGraph: {
    type: 'website',
    url: 'https://aykhanpashayev.github.io/',
    title: 'Aykhan Pashayev',
    description: 'Cloud security engineer building AWS systems that detect threats and fight back.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${vt323.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png" />
      </head>
      <body>
        <BackgroundCanvas />
        <SectionObserver />

        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <header className="site-header" role="banner">
          <nav className="site-nav" aria-label="Primary">
            <a href="#journey" className="nav-link">Journey</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#achievements" className="nav-link">Achievements</a>
            <a href="#contact" className="nav-link nav-link--accent">Contact</a>
          </nav>
        </header>

        {children}

        <footer className="site-footer" role="contentinfo">
          <p>© {new Date().getFullYear()} Aykhan Pashayev</p>
        </footer>
      </body>
    </html>
  )
}
