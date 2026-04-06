'use client'

import { useEffect, useRef } from 'react'

export default function JourneyProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = document.getElementById('journey')
    const fill = fillRef.current
    const progressEl = progressRef.current

    if (!section || !fill || !progressEl) return

    let ticking = false

    function clamp01(n: number) {
      return Math.max(0, Math.min(1, n))
    }

    function update() {
      ticking = false
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const start = vh * 0.7
      const end = vh * 0.3

      const isOffscreen = rect.bottom <= 0 || rect.top >= vh
      if (isOffscreen) {
        progressEl.classList.remove('is-active')
        fill.style.height = '0%'
        return
      }

      progressEl.classList.add('is-active')
      const total = rect.height - (end - start)
      const traveled = start - rect.top
      const p = total > 0 ? clamp01(traveled / total) : 0
      fill.style.height = `${(p * 100).toFixed(2)}%`
    }

    function onScrollOrResize() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    update()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return (
    <div ref={progressRef} className="journey-progress" aria-hidden="true">
      <div className="journey-progress-track">
        <div ref={fillRef} className="journey-progress-fill" />
      </div>
    </div>
  )
}
