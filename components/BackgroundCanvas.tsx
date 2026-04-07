'use client'

import { useEffect, useRef } from 'react'

const CHARS = ['0', '1', '0', '1', '0', '1', '$', '>', '#']
const GRID = 60
const HEX_R = 26
const HEX_DX = HEX_R * Math.sqrt(3)
const HEX_DY = HEX_R * 1.5

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    const px = cx + r * Math.cos(angle)
    const py = cy + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
}

export default function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!

    let w = 0, h = 0
    let mouseX = -9999, mouseY = -9999

    // ── D: Hex grid ────────────────────────────────────────
    let hexCenters: { x: number; y: number }[] = []
    const offscreen = document.createElement('canvas')
    const offCtx = offscreen.getContext('2d')!

    const buildHex = (width: number, height: number) => {
      hexCenters = []
      offscreen.width = width
      offscreen.height = height
      offCtx.clearRect(0, 0, width, height)
      offCtx.strokeStyle = 'rgba(255, 179, 92, 0.032)'
      offCtx.lineWidth = 1

      const rows = Math.ceil(height / HEX_DY) + 2
      const cols = Math.ceil(width / HEX_DX) + 2
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * HEX_DX + (row % 2 === 0 ? 0 : HEX_DX / 2)
          const cy = row * HEX_DY
          hexCenters.push({ x: cx, y: cy })
          hexPath(offCtx, cx, cy, HEX_R - 1)
          offCtx.stroke()
        }
      }
    }

    // ── B: Binary rain ─────────────────────────────────────
    interface Drop {
      x: number; y: number; speed: number
      chars: string[]; baseAlpha: number
    }
    let drops: Drop[] = []

    const initDrops = (width: number, height: number) => {
      const count = Math.floor(width / 110)   // sparse
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * -height,
        speed: 0.08 + Math.random() * 0.14,   // very slow drift
        chars: Array.from({ length: 6 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
        baseAlpha: 0.028 + Math.random() * 0.025,  // subtle
      }))
    }

    // ── C: Circuit pulses ───────────────────────────────────
    interface Pulse {
      x: number; y: number; dir: 'h' | 'v'
      progress: number; speed: number; segLen: number
    }
    const pulses: Pulse[] = []

    const addPulse = (width: number, height: number) => {
      const dir = Math.random() > 0.5 ? 'h' : 'v'
      pulses.push({
        x: Math.floor(Math.random() * Math.ceil(width / GRID)) * GRID,
        y: Math.floor(Math.random() * Math.ceil(height / GRID)) * GRID,
        dir,
        progress: 0,
        speed: 0.002 + Math.random() * 0.004,   // slow pulses
        segLen: (3 + Math.floor(Math.random() * 5)) * GRID,
      })
    }

    // ── Resize ──────────────────────────────────────────────
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
      buildHex(w, h)
      initDrops(w, h)
      // seed pulses on first run
      if (pulses.length === 0) {
        for (let i = 0; i < 6; i++) addPulse(w, h)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouse)

    // ── Draw loop ────────────────────────────────────────────
    let frame: number

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // D static grid
      ctx.drawImage(offscreen, 0, 0)

      // D mouse hex glow
      if (mouseX > 0) {
        for (const { x, y } of hexCenters) {
          const dist = Math.hypot(x - mouseX, y - mouseY)
          const glow = Math.max(0, 1 - dist / 170)
          if (glow < 0.04) continue
          hexPath(ctx, x, y, HEX_R - 1)
          ctx.fillStyle = `rgba(255, 179, 92, ${glow * 0.07})`
          ctx.fill()
          ctx.strokeStyle = `rgba(255, 179, 92, ${0.032 + glow * 0.28})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // B binary rain
      ctx.font = '11px monospace'
      ctx.textBaseline = 'top'
      for (const drop of drops) {
        drop.y += drop.speed
        if (drop.y > h + 140) {
          drop.y = -140
          drop.x = Math.random() * w
        }
        for (let i = 0; i < drop.chars.length; i++) {
          const a = Math.max(0, drop.baseAlpha - i * 0.007)
          if (a < 0.004) break
          ctx.fillStyle = `rgba(255, 179, 92, ${a})`
          ctx.fillText(drop.chars[i], drop.x, drop.y - i * 14)
        }
      }

      // C circuit pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed
        if (p.progress >= 1) {
          pulses.splice(i, 1)
          addPulse(w, h)
          continue
        }

        const travel = p.progress * (p.segLen + 50)
        const px = p.dir === 'h' ? p.x + travel : p.x
        const py = p.dir === 'v' ? p.y + travel : p.y

        // trail
        const tx = p.dir === 'h' ? Math.max(p.x, px - 45) : px
        const ty = p.dir === 'v' ? Math.max(p.y, py - 45) : py
        ctx.strokeStyle = 'rgba(255, 179, 92, 0.16)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(px, py)
        ctx.stroke()

        // glow dot
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8)
        grd.addColorStop(0, 'rgba(255, 210, 140, 0.75)')
        grd.addColorStop(0.4, 'rgba(255, 179, 92, 0.35)')
        grd.addColorStop(1, 'rgba(255, 179, 92, 0)')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, Math.PI * 2)
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
