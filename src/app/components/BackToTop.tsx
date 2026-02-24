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
      className="fixed bottom-6 right-6 p-3 bg-white border-2 border-gray-300 hover:bg-futuristic-blue hover:border-futuristic-blue rounded-lg z-50 transition-all duration-300 group shadow-md hover:shadow-lg"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
        Back to top
      </div>
    </button>
  )
}