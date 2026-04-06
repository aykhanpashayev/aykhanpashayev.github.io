export default function NotFound() {
  return (
    <main
      id="main"
      role="main"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        gap: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: 0, color: 'var(--amber)' }}>404</h1>
      <p style={{ color: 'var(--muted)', fontSize: '1.125rem' }}>
        Page not found.
      </p>
      <a className="btn btn--primary" href="/">
        ← Back to portfolio
      </a>
    </main>
  )
}
