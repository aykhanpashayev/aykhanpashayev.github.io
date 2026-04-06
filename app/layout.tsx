import type { Metadata } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
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
  title: 'Aykhan Pashayev | Cloud Security Engineer',
  description:
    'Aykhan Pashayev — Cloud Security Engineer building IAM threat detection systems that respond in seconds, not hours. AWS-native, AI-assisted, product-minded.',
  keywords: [
    'Cloud Security',
    'IAM',
    'AWS',
    'Threat Detection',
    'Incident Response',
    'Security Engineering',
  ],
  authors: [{ name: 'Aykhan Pashayev' }],
  openGraph: {
    type: 'website',
    url: 'https://aykhanpashayev.github.io/',
    title: 'Aykhan Pashayev | Cloud Security Engineer',
    description:
      'Building IAM threat detection systems that respond in seconds. AWS-native, AI-assisted, product-minded.',
    images: [{ url: 'https://aykhanpashayev.github.io/assets/img/og-card.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aykhan Pashayev | Cloud Security Engineer',
    description: 'Building IAM threat detection systems that respond in seconds.',
    images: ['https://aykhanpashayev.github.io/assets/img/og-card.svg'],
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
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <header className="site-header" role="banner">
          <nav className="site-nav" aria-label="Primary">
            <a href="#proof" className="nav-link">Proof</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#journey" className="nav-link">Journey</a>
            <a href="#capabilities" className="nav-link">Capabilities</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a
              href="/assets/Aykhan Pashayev Resume.pdf"
              className="nav-link nav-link--accent"
              target="_blank"
              rel="noopener"
            >
              Resume
            </a>
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
