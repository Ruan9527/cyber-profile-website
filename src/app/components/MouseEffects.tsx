'use client'

import { useState, useEffect, useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  velocityX: number
  velocityY: number
  life: number
  maxLife: number
}

const CYBER_COLORS = [
  'var(--cyber-cyan)',
  'var(--cyber-purple)',
  'var(--cyber-yellow)',
  'var(--cyber-red)',
  'var(--cyber-green)',
  'var(--cyber-blue)',
  'var(--cyber-pink)',
]

export default function MouseEffects() {
  const [isMobile, setIsMobile] = useState(false)
  const mousePosition = useMousePosition()
  const [particles, setParticles] = useState<Particle[]>([])
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const particleIdRef = useRef(0)
  const lastEmitTimeRef = useRef(0)
  const particlesContainerRef = useRef<HTMLDivElement>(null)

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

  // Create particles on mouse movement
  useEffect(() => {
    const now = Date.now()
    const timeSinceLastEmit = now - lastEmitTimeRef.current
    
    // Only emit particles if mouse is moving fast enough and enough time has passed
    const speed = Math.sqrt(mousePosition.movementX ** 2 + mousePosition.movementY ** 2)
    if (speed < 1 || timeSinceLastEmit < 32) return // Reduced frequency for performance

    const newParticles: Particle[] = []
    const particleCount = isHoveringInteractive ? 2 : 1 // Reduced count
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const velocity = 0.3 + Math.random() * 1.5 // Reduced velocity
      
      newParticles.push({
        id: particleIdRef.current++,
        x: mousePosition.x + (Math.random() - 0.5) * 10,
        y: mousePosition.y + (Math.random() - 0.5) * 10,
        size: 1 + Math.random() * 3, // Smaller particles
        color: CYBER_COLORS[Math.floor(Math.random() * CYBER_COLORS.length)],
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity,
        life: 1,
        maxLife: 0.3 + Math.random() * 1 // Shorter life
      })
    }

    setParticles(prev => {
      const updated = [...prev, ...newParticles]
      // Limit total particles to prevent memory leak
      if (updated.length > 100) {
        return updated.slice(-80)
      }
      return updated
    })
    lastEmitTimeRef.current = now
  }, [mousePosition.x, mousePosition.y, mousePosition.movementX, mousePosition.movementY, isHoveringInteractive])

  // Update particles animation
  useEffect(() => {
    let animationFrameId: number

    const updateParticles = () => {
      setParticles(prev => {
        const updated = prev.map(particle => {
          const newLife = particle.life - 0.016 / particle.maxLife
          if (newLife <= 0) return null

          return {
            ...particle,
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            life: newLife,
            velocityY: particle.velocityY + 0.05 // gravity
          }
        }).filter(Boolean) as Particle[]

        return updated
      })

      animationFrameId = requestAnimationFrame(updateParticles)
    }

    animationFrameId = requestAnimationFrame(updateParticles)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Listen for hover events on interactive elements
  useEffect(() => {
    const interactiveSelectors = [
      'a',
      'button',
      '.glass-card',
      '.magnetic-area',
      '.magnetic-card',
      '.cyber-card',
      '[role="button"]'
    ]

    const handleMouseEnter = () => setIsHoveringInteractive(true)
    const handleMouseLeave = () => setIsHoveringInteractive(false)

    interactiveSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
      })
    })

    return () => {
      interactiveSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter)
          element.removeEventListener('mouseleave', handleMouseLeave)
        })
      })
    }
  }, [])

  // Don't render effects on mobile devices
  if (isMobile) {
    return null
  }

  // Calculate glow intensity based on mouse speed
  const mouseSpeed = Math.sqrt(mousePosition.movementX ** 2 + mousePosition.movementY ** 2)
  const glowIntensity = Math.min(mouseSpeed * 0.5, 1)
  const glowSize = 40 + glowIntensity * 40

  return (
    <>
      {/* Mouse Glow Effect */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          transition: 'width 0.2s, height 0.2s'
        }}
      >
        <div
          className="absolute inset-0 rounded-full bg-gradient-radial from-cyber-cyan/20 via-transparent to-transparent"
          style={{
            opacity: glowIntensity * 0.8,
            filter: `blur(${8 + glowIntensity * 8}px)`
          }}
        />
        <div
          className="absolute inset-0 rounded-full border border-cyber-cyan/30"
          style={{
            opacity: glowIntensity * 0.5,
            transform: `scale(${0.8 + glowIntensity * 0.4})`,
            filter: `blur(${1 + glowIntensity * 2}px)`
          }}
        />
      </div>

      {/* Particles Container */}
      <div
        ref={particlesContainerRef}
        className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden"
      >
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.life * 0.8,
              transform: `translate(-50%, -50%) scale(${particle.life})`,
              filter: `blur(${particle.size * 0.3}px)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
          />
        ))}
      </div>

      {/* Interactive State Indicator */}
      {isHoveringInteractive && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute -inset-4 rounded-full border-2 border-cyber-purple/50 animate-pulse" />
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}