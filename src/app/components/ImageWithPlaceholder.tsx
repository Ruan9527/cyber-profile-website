'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithPlaceholderProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function ImageWithPlaceholder({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  onLoad,
  onError
}: ImageWithPlaceholderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
    onError?.()
  }

  if (error) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
        {/* Error fallback */}
        <div className="absolute inset-0 bg-cyber-gray/20 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-cyber-gray/60 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4 4m0 0l6 6"
              />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-xs text-cyber-gray/70">Image not available</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-cyber-gray/20 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-cyber-cyan/30 rounded-full animate-spin" style={{ borderColor: 'rgba(0, 240, 255, 0.3)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-cyber-cyan rounded-full" style={{ opacity: 0.5 }} />
            </div>
          </div>
        </div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ imageRendering: 'auto' }}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
      />
    </div>
  )
}
