'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  isActive: boolean
  delay?: number
  children: ReactNode
}

export default function JourneyCard({ isActive, delay = 0, children }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let tid: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(tid)
          tid = setTimeout(() => {
            el.classList.add('is-shining')
            setTimeout(() => el.classList.remove('is-shining'), 900)
          }, delay)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(tid)
    }
  }, [delay])

  return (
    <article
      ref={ref}
      className={['journey-card', isActive ? 'journey-card--active' : ''].filter(Boolean).join(' ')}
    >
      {children}
    </article>
  )
}
