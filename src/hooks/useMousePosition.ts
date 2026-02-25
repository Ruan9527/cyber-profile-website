'use client'

import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
  clientX: number
  clientY: number
  movementX: number
  movementY: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    movementX: 0,
    movementY: 0,
    normalizedX: 0,
    normalizedY: 0
  })

  useEffect(() => {
    let animationFrameId: number
    let lastMouseEvent: MouseEvent | null = null

    const handleMouseMove = (event: MouseEvent) => {
      lastMouseEvent = event
    }

    const updateMousePosition = () => {
      if (!lastMouseEvent) {
        animationFrameId = requestAnimationFrame(updateMousePosition)
        return
      }

      const { clientX, clientY, movementX, movementY } = lastMouseEvent
      
      const x = clientX
      const y = clientY
      const normalizedX = (clientX / window.innerWidth) * 2 - 1
      const normalizedY = (clientY / window.innerHeight) * 2 - 1

      setMousePosition({
        x,
        y,
        clientX,
        clientY,
        movementX: movementX || 0,
        movementY: movementY || 0,
        normalizedX,
        normalizedY
      })

      lastMouseEvent = null
      animationFrameId = requestAnimationFrame(updateMousePosition)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameId = requestAnimationFrame(updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return mousePosition
}