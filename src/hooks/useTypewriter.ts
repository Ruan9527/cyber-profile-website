import { useState, useEffect, useCallback } from 'react'

export interface UseTypewriterOptions {
  text: string
  speed?: number // milliseconds per character
  delay?: number // delay before starting (ms)
  onComplete?: () => void
  loop?: boolean
  loopDelay?: number
  deleteSpeed?: number
  pauseAtEnd?: number // pause at end before deleting (if loop)
}

export interface UseTypewriterReturn {
  displayText: string
  isTyping: boolean
  isDeleting: boolean
  isCompleted: boolean
  currentIndex: number
  start: () => void
  pause: () => void
  reset: () => void
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  loop = false,
  loopDelay = 2000,
  deleteSpeed = 30,
  pauseAtEnd = 1000
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [shouldStart, setShouldStart] = useState(false)

  const start = useCallback(() => {
    setShouldStart(true)
    setIsTyping(true)
    setIsCompleted(false)
  }, [])

  const pause = useCallback(() => {
    setIsTyping(false)
  }, [])

  const reset = useCallback(() => {
    setDisplayText('')
    setCurrentIndex(0)
    setIsTyping(false)
    setIsDeleting(false)
    setIsCompleted(false)
    setShouldStart(false)
  }, [])

  useEffect(() => {
    if (!shouldStart) {
      const timer = setTimeout(() => {
        setShouldStart(true)
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [shouldStart, delay])

  useEffect(() => {
    if (!shouldStart || !isTyping) return

    const currentSpeed = isDeleting ? deleteSpeed : speed
    let timeoutId: NodeJS.Timeout

    if (isDeleting) {
      // Deleting phase
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1))
        }, currentSpeed)
      } else {
        // Finished deleting, reset for next loop
        setIsDeleting(false)
        setCurrentIndex(0)
        if (!loop) {
          setIsTyping(false)
          setIsCompleted(true)
        }
      }
    } else {
      // Typing phase
      if (currentIndex < text.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex])
          setCurrentIndex(prev => prev + 1)
        }, currentSpeed)
      } else {
        // Finished typing
        if (loop) {
          // Pause at end before starting to delete
          timeoutId = setTimeout(() => {
            setIsDeleting(true)
          }, pauseAtEnd)
        } else {
          // Not looping, complete
          setIsTyping(false)
          setIsCompleted(true)
          if (onComplete) {
            onComplete()
          }
        }
      }
    }

    return () => clearTimeout(timeoutId)
  }, [
    shouldStart,
    isTyping,
    isDeleting,
    displayText,
    currentIndex,
    text,
    speed,
    deleteSpeed,
    loop,
    loopDelay,
    pauseAtEnd,
    onComplete
  ])

  // Handle loop completion (when deleting finishes and we start typing again)
  useEffect(() => {
    if (loop && isDeleting && displayText.length === 0) {
      const timer = setTimeout(() => {
        setIsDeleting(false)
        setCurrentIndex(0)
      }, loopDelay)
      return () => clearTimeout(timer)
    }
  }, [loop, isDeleting, displayText, loopDelay])

  return {
    displayText,
    isTyping,
    isDeleting,
    isCompleted,
    currentIndex,
    start,
    pause,
    reset
  }
}

export default useTypewriter