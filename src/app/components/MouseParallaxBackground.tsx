'use client'

import { useState, useEffect, useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function MouseParallaxBackground() {
  const [isMobile, setIsMobile] = useState(false)
  const mousePosition = useMousePosition()
  const layersRef = useRef<HTMLDivElement[]>([])
  const animationFrameRef = useRef<number | null>(null)

  // Detect mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouchDevice || isSmallScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const updateParallax = () => {
      const normalizedX = mousePosition.normalizedX
      const normalizedY = mousePosition.normalizedY

      layersRef.current.forEach((layer, index) => {
        if (!layer) return

        // Different layers move at different speeds for depth effect
        const speed = 0.05 + (index * 0.02)
        const translateX = normalizedX * speed * 100
        const translateY = normalizedY * speed * 100
        const rotateX = normalizedY * speed * 2
        const rotateY = normalizedX * speed * 2

        layer.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })

      animationFrameRef.current = requestAnimationFrame(updateParallax)
    }

    // Don't start animation on mobile
    if (!isMobile) {
      animationFrameRef.current = requestAnimationFrame(updateParallax)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePosition.normalizedX, mousePosition.normalizedY, isMobile])

  // Don't render on mobile devices
  if (isMobile) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep background grid layer */}
      <div
        ref={el => {
          if (el) layersRef.current[0] = el
        }}
        className="absolute inset-0 bg-cyber-grid bg-cyber-grid-dense opacity-10"
        style={{
          backgroundSize: '100px 100px',
          filter: 'hue-rotate(90deg)'
        }}
      />

      {/* Mid layer - circuit pattern */}
      <div
        ref={el => {
          if (el) layersRef.current[1] = el
        }}
        className="absolute inset-0 bg-circuit-pattern opacity-5"
        style={{
          backgroundSize: '200px 200px'
        }}
      />

      {/* Foreground particle layer */}
      <div
        ref={el => {
          if (el) layersRef.current[2] = el
        }}
        className="absolute inset-0"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-particle-float"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: `var(--cyber-${['cyan', 'purple', 'yellow'][i % 3]})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
              filter: 'blur(1px)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Cyber scan line */}
      <div
        ref={el => {
          if (el) layersRef.current[3] = el
        }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-20"
        style={{
          top: '30%',
          filter: 'blur(1px)'
        }}
      />

      <style jsx>{`
        .bg-circuit-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, var(--cyber-cyan-10) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, var(--cyber-purple-10) 2px, transparent 2px);
        }
      `}</style>
    </div>
  )
}