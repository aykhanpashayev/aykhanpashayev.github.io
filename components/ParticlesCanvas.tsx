'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  opacity: number
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const PARTICLE_COUNT = 4
    let particles: Particle[] = []
    let animFrameId: number

    function getDPR() {
      return Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    }

    function resizeCanvas() {
      const rect = canvas!.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        requestAnimationFrame(resizeCanvas)
        return
      }
      const dpr = getDPR()
      canvas!.width = Math.floor(rect.width * dpr)
      canvas!.height = Math.floor(rect.height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function createParticle(): Particle {
      const rect = canvas!.getBoundingClientRect()
      return {
        x: Math.random() * (rect.width || 1),
        y: Math.random() * (rect.height || 1),
        size: Math.random() * 1.5 + 1,
        speedY: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.3 + 0.15,
      }
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle())
      }
    }

    function draw() {
      const rect = canvas!.getBoundingClientRect()
      const w = rect.width || 1
      const h = rect.height || 1
      ctx!.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        ctx!.globalAlpha = p.opacity
        ctx!.fillStyle = 'rgba(255, 204, 133, 0.8)'
        ctx!.fillRect(p.x, p.y, p.size, p.size)
      })
      ctx!.globalAlpha = 1
    }

    function update() {
      const rect = canvas!.getBoundingClientRect()
      const w = rect.width || 1
      const h = rect.height || 1
      particles.forEach((p) => {
        p.y -= p.speedY
        if (p.y < -5) {
          p.y = h + 5
          p.x = Math.random() * w
        }
      })
    }

    function animate() {
      update()
      draw()
      animFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => resizeCanvas()
    window.addEventListener('resize', handleResize, { passive: true })

    resizeCanvas()
    initParticles()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}
