'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

interface GoogleAnalyticsProps {
  GA_ID: string
}

export default function GoogleAnalytics({ GA_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (window.gtag && GA_ID) {
      window.gtag('config', GA_ID, {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams, GA_ID])

  return null
}