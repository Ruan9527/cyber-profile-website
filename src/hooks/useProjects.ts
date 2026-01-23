import { useState, useEffect, useCallback } from 'react'
import { Project } from '@/types'
import { ProjectService } from '@/lib/projectService'

export interface UseProjectsOptions {
  autoFetch?: boolean
  refetchInterval?: number | null
  enableCache?: boolean
  category?: string
  refetchOnWindowFocus?: boolean
  refetchOnReconnect?: boolean
}

export interface UseProjectsReturn {
  projects: Project[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  clearCache: () => void
  getProjectsByCategory: (category?: string) => Promise<Project[]>
}

/**
 * Hook for fetching and managing projects data
 */
export function useProjects({
  autoFetch = true,
  refetchInterval = null,
  enableCache = true,
  category,
  refetchOnWindowFocus = false,
  refetchOnReconnect = false
}: UseProjectsOptions = {}): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<Error | null>(null)

  const fetchProjects = useCallback(async () => {
    if (!autoFetch) return

    setLoading(true)
    setError(null)
    
    try {
      let data: Project[]
      if (category) {
        data = await ProjectService.getProjectsByCategory(category)
      } else {
        data = await ProjectService.getProjects()
      }
      setProjects(data)
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'))
    } finally {
      setLoading(false)
    }
  }, [autoFetch, category])

  const refetch = useCallback(async () => {
    if (enableCache) {
      ProjectService.clearCache()
    }
    await fetchProjects()
  }, [fetchProjects, enableCache])

  const clearCache = useCallback(() => {
    ProjectService.clearCache()
  }, [])

  const getProjectsByCategory = useCallback(async (category?: string): Promise<Project[]> => {
    return await ProjectService.getProjectsByCategory(category)
  }, [])

  // Initial fetch
  useEffect(() => {
    if (autoFetch) {
      fetchProjects()
    }
  }, [autoFetch, fetchProjects])

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
    projects,
    loading,
    error,
    refetch,
    clearCache,
    getProjectsByCategory
  }
}

export default useProjects