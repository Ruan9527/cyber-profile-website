'use client'

import { useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface MagneticCardProps {
  avatarSrc: string
  title?: string
  subtitle?: string
}

export default function MagneticCard({ avatarSrc, title = '@圆周率的达', subtitle }: MagneticCardProps) {
  const magneticAreaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const controlAreaRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)

  const isHovering = useRef(false)
  const animationFrameRef = useRef<number | null>(null)

  const getDistance = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }, [])

  const applyMagneticEffect = useCallback((mouseX: number, mouseY: number) => {
    const magneticArea = magneticAreaRef.current
    const card = cardRef.current
    const indicator = indicatorRef.current

    if (!magneticArea || !card || !indicator) return

    const areaRect = magneticArea.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()

    const areaCenterX = areaRect.left + areaRect.width / 2
    const areaCenterY = areaRect.top + areaRect.height / 2

    const cardCenterX = cardRect.left + cardRect.width / 2
    const cardCenterY = cardRect.top + cardRect.height / 2

    const distance = getDistance(mouseX, mouseY, areaCenterX, areaCenterY)
    const magneticRadius = 200
    const magneticStrength = 0.3

    if (distance < magneticRadius) {
      const magneticForce = (magneticRadius - distance) / magneticRadius
      const pullStrength = magneticForce * magneticStrength

      const deltaX = (mouseX - cardCenterX) * pullStrength
      const deltaY = (mouseY - cardCenterY) * pullStrength

      card.style.transform = `translate(${deltaX}px, ${deltaY}px)`

      indicator.style.left = `${mouseX - areaRect.left}px`
      indicator.style.top = `${mouseY - areaRect.top}px`
      indicator.classList.add('active')
    } else {
      card.style.transform = 'translate(0px, 0px)'
      indicator.classList.remove('active')
    }
  }, [getDistance])

  const updateCardTransforms = useCallback((mouseX: number, mouseY: number) => {
    const content = contentRef.current
    const titleEl = titleRef.current
    const glare = glareRef.current
    const card = cardRef.current

    if (!content || !titleEl || !glare || !card) return

    const maxRotate = 15
    const rotateMultiplier = 1

    const rotateY = mouseX * maxRotate * rotateMultiplier
    const rotateX = -mouseY * maxRotate * rotateMultiplier

    content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`

    titleEl.style.transform = `translateZ(50px) translateX(${mouseX * 8}px) translateY(${mouseY * 8}px)`

    const cardRect = card.getBoundingClientRect()
    const x = mouseX * cardRect.width + cardRect.left
    const y = mouseY * cardRect.height + cardRect.top

    glare.style.left = `${x}px`
    glare.style.top = `${y}px`
    glare.style.opacity = '1'
  }, [])

  const resetTransforms = useCallback(() => {
    const content = contentRef.current
    const titleEl = titleRef.current
    const glare = glareRef.current
    const card = cardRef.current

    if (content) content.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
    if (titleEl) titleEl.style.transform = 'translateZ(50px)'
    if (glare) glare.style.opacity = '0'
    if (card) card.style.transform = 'translate(0px, 0px)'
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        applyMagneticEffect(e.clientX, e.clientY)

        if (isHovering.current) {
          const cardRect = cardRef.current?.getBoundingClientRect()
          if (cardRect) {
            const x = (e.clientX - cardRect.left) / cardRect.width - 0.5
            const y = (e.clientY - cardRect.top) / cardRect.height - 0.5
            updateCardTransforms(x, y)
          }
        }
      })
    }

    const controlArea = controlAreaRef.current

    controlArea?.addEventListener('mouseenter', () => {
      isHovering.current = true
    })

    controlArea?.addEventListener('mouseleave', () => {
      isHovering.current = false
      resetTransforms()
    })

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      controlArea?.removeEventListener('mouseenter', () => {})
      controlArea?.removeEventListener('mouseleave', () => {})
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [applyMagneticEffect, updateCardTransforms, resetTransforms])

  return (
    <div ref={magneticAreaRef} className="magnetic-area">
      <div ref={cardRef} className="magnetic-card">
        <div ref={controlAreaRef} className="magnetic-control-area" />

        <div ref={contentRef} className="magnetic-card-content">
          <div ref={bgImageRef} className="magnetic-card-layer bg-image">
            <Image
              src={avatarSrc}
              alt="Avatar"
              fill
              className="magnetic-card-bg-image"
              priority
            />
          </div>

          <div ref={glareRef} className="magnetic-card-glare" />

          <div ref={titleRef} className="magnetic-card-layer title">
            <span className="magnetic-card-text">{title}</span>
          </div>

          {subtitle && (
            <div className="magnetic-card-layer subtitle">
              <span className="magnetic-card-subtext">{subtitle}</span>
            </div>
          )}
        </div>
      </div>

      <div ref={indicatorRef} className="magnetic-indicator" />

      <style jsx global>{`
        .magnetic-area {
          width: 400px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .magnetic-card {
          width: 320px;
          height: 320px;
          perspective: 1000px;
          cursor: pointer;
          position: relative;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .magnetic-control-area {
          position: absolute;
          top: -50px;
          left: -50px;
          right: -50px;
          bottom: -50px;
          pointer-events: all;
          z-index: 50;
        }

        .magnetic-card-content {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
          transform-style: preserve-3d;
          transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
          border: 3px solid rgba(0, 240, 255, 0.4);
          box-shadow:
            0 0 30px rgba(0, 240, 255, 0.3),
            0 0 60px rgba(0, 240, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5);
        }

        .magnetic-card-layer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .magnetic-card-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transform: translateZ(-2px);
        }

        .magnetic-card-text {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          font-family: var(--font-display);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.5);
          letter-spacing: 1px;
        }

        .magnetic-card-subtext {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-family: var(--font-quicksand);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .title {
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 50px;
          transform: translateZ(50px);
        }

        .subtitle {
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 28px;
          transform: translateZ(40px);
        }

        .bg-image {
          z-index: 0;
        }

        .magnetic-card-glare {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(0, 240, 255, 0.4) 0%,
            rgba(0, 240, 255, 0.2) 20%,
            rgba(0, 240, 255, 0.1) 40%,
            rgba(0, 240, 255, 0.05) 60%,
            transparent 80%
          );
          mix-blend-mode: overlay;
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.5);
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 15;
          border-radius: 50%;
        }

        .magnetic-indicator {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(0, 240, 255, 0.9);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 20;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
        }

        .magnetic-indicator.active {
          opacity: 1;
          animation: magneticPulse 1s ease-in-out infinite;
        }

        @keyframes magneticPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.7);
          }
          50% {
            transform: scale(1.5);
            box-shadow: 0 0 0 15px rgba(0, 240, 255, 0);
          }
        }

        .magnetic-card-content,
        .magnetic-card-layer,
        .magnetic-card-bg-image {
          will-change: transform;
        }

        @media (max-width: 768px) {
          .magnetic-area {
            width: 320px;
            height: 320px;
          }

          .magnetic-card {
            width: 260px;
            height: 260px;
          }

          .magnetic-card-text {
            font-size: 20px;
          }

          .magnetic-card-subtext {
            font-size: 12px;
          }

          .title {
            padding-bottom: 40px;
          }

          .subtitle {
            padding-bottom: 20px;
          }
        }
      `}</style>
    </div>
  )
}
