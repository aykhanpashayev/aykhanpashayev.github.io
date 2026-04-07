'use client'

import { useEffect } from 'react'

export default function JourneyNodeShine() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.journey-node'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add('node-in-view')
          } else {
            el.classList.remove('node-in-view')
          }
        })
      },
      { threshold: 0.6, rootMargin: '-15% 0px -15% 0px' }
    )

    nodes.forEach((n) => observer.observe(n))

    return () => observer.disconnect()
  }, [])

  return null
}
