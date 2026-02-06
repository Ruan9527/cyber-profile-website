import { useState, useEffect, useCallback } from 'react'
import { Skill } from '@/types'
import { SkillService } from '@/lib/skillService'

export interface UseSkillsOptions {
  autoFetch?: boolean
  refetchInterval?: number | null
  enableCache?: boolean
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
}

export interface UseSkillsReturn {
  skills: Skill[]
  skillsByCategory: Record<string, Skill[]>
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  clearCache: () => void
}

/**
 * Hook for fetching and managing skills data
 */
export function useSkills({
  autoFetch = true,
  refetchInterval = null,
  enableCache = true,
  refetchOnWindowFocus = false,
  refetchOnReconnect = false
}: UseSkillsOptions = {}): UseSkillsReturn {
  const [skills, setSkills] = useState<Skill[]>([])
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, Skill[]>>({})
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<Error | null>(null)

  const fetchSkills = useCallback(async () => {
    if (!autoFetch) return

    setLoading(true)
    setError(null)
    
    try {
      const data = await SkillService.getSkills()
      setSkills(data)
      
      // Also get categorized skills
      const categorized = await SkillService.getSkillsByCategory()
      setSkillsByCategory(categorized)
    } catch (err) {
      console.error('Failed to fetch skills:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch skills'))
    } finally {
      setLoading(false)
    }
  }, [autoFetch])

  const refetch = useCallback(async () => {
    if (enableCache) {
      SkillService.clearCache()
    }
    await fetchSkills()
  }, [fetchSkills, enableCache])

  const clearCache = useCallback(() => {
    SkillService.clearCache()
  }, [])

  // Initial fetch
  useEffect(() => {
    if (autoFetch) {
      fetchSkills()
    }
  }, [autoFetch, fetchSkills])

  // Refetch interval
  useEffect(() => {
    if (!refetchInterval || !autoFetch) return

    const intervalId = setInterval(() => {
      refetch()
    }, refetchInterval)

    return () => clearInterval(intervalId)
  }, [refetchInterval, autoFetch, refetch])

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus || !autoFetch) return

    const handleFocus = () => {
      refetch()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refetchOnWindowFocus, autoFetch, refetch])

  // Refetch on network reconnect
  useEffect(() => {
    if (!refetchOnReconnect || !autoFetch) return

    const handleOnline = () => {
      refetch()
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [refetchOnReconnect, autoFetch, refetch])

  return {
    skills,
    skillsByCategory,
    loading,
    error,
    refetch,
    clearCache
  }
}

export default useSkills