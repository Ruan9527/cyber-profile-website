'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Terminal, Zap, Code } from 'lucide-react'

interface LoadingScreenProps {
  onComplete?: () => void
  duration?: number // total animation duration in ms
}

export default function LoadingScreen({ onComplete, duration = 3000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  const bootSteps = [
    { text: 'INITIALIZING SYSTEM...', icon: Terminal },
    { text: 'LOADING CORE MODULES...', icon: Cpu },
    { text: 'ACTIVATING CYBERPUNK UI...', icon: Zap },
    { text: 'SYSTEM READY', icon: Code }
  ]

  useEffect(() => {
    const interval = 50 // update every 50ms
    const totalSteps = duration / interval
    const increment = 100 / totalSteps

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(timer)
          
          // Small delay before hiding
          setTimeout(() => {
            setIsVisible(false)
            if (onComplete) {
              onComplete()
            }
          }, 500)
          
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [duration, onComplete])

  // Update current step based on progress
  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * bootSteps.length)
    setCurrentStep(stepIndex)
  }, [progress])

  if (!isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-cyber-black flex items-center justify-center overflow-hidden"
      >
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }} />
          
          {/* Glow effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyber-red/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-2xl w-full mx-4">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl font-bold mb-2 text-cyber-cyan"
              style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
            >
              CYBER_OS
            </motion.h1>
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono-tech text-sm text-cyber-yellow/80 uppercase tracking-widest"
            >
              v2.0.7 | SYSTEM BOOT
            </motion.p>
          </div>

          {/* Boot log */}
          <div className="cyber-card bg-cyber-black/80 border-2 border-cyber-cyan/50 mb-6 p-4 md:p-6">
            <div className="font-mono-tech text-xs md:text-sm space-y-2">
              {bootSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep
                
                return (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                    className={`flex items-center gap-3 py-1 ${isCompleted ? 'text-cyber-cyan' : isActive ? 'text-cyber-yellow' : 'text-white/40'}`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-bold">{step.text}</span>
                    {isActive && (
                      <span className="typewriter-cursor ml-2"></span>
                    )}
                    {isCompleted && (
                      <span className="ml-auto text-cyber-green text-xs">✓</span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono-tech text-xs text-white/70 uppercase tracking-wider">
                SYSTEM LOAD
              </span>
              <span className="font-mono-tech text-sm font-bold text-cyber-cyan">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative h-3 bg-cyber-gray/50 overflow-hidden cyber-clip-inverse">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber-cyan to-cyber-yellow"
                style={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
              {/* Progress bar glow */}
              <div className="absolute inset-0 border border-cyber-cyan/30 cyber-clip-inverse" />
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 25 ? 'bg-cyber-cyan animate-pulse' : 'bg-cyber-gray'}`} />
              <span className="font-mono-tech text-xs text-white/70">CPU</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 50 ? 'bg-cyber-yellow animate-pulse' : 'bg-cyber-gray'}`} />
              <span className="font-mono-tech text-xs text-white/70">RAM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 75 ? 'bg-cyber-red animate-pulse' : 'bg-cyber-gray'}`} />
              <span className="font-mono-tech text-xs text-white/70">GPU</span>
            </div>
          </div>

          {/* Scanlines overlay */}
          <div className="scanlines" />
        </div>

        {/* Corner elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-cyber-cyan/50" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cyber-cyan/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cyber-cyan/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-cyber-cyan/50" />

        {/* Moving dots */}
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-cyber-cyan rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-1 h-1 bg-cyber-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </motion.div>
    </AnimatePresence>
  )
}