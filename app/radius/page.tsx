// Placeholder — full implementation in Change 11
export default function RadiusPage() {
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
      <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--amber)' }}>
        Radius
      </h1>
      <p style={{ color: 'var(--muted)' }}>
        Full case study coming in Change 11.
      </p>
      <a className="btn btn--secondary" href="/">
        ← Back
      </a>
    </main>
  )
}
