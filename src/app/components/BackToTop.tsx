'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-cyber-red/90 border-2 border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow rounded-lg z-50 transition-all duration-300 group"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6 text-white group-hover:text-cyber-black transition-colors" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 -m-2 rounded-lg border-2 border-cyber-yellow/30 animate-pulse" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-cyber-black border border-cyber-cyan rounded text-xs text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Back to top
      </div>
    </button>
  )
}