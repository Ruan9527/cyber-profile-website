'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

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

function GoogleAnalyticsInner({ GA_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (window.gtag && GA_ID) {
      window.gtag('config', GA_ID, {
        page_path: pathname,
      })
    }
  }, [pathname, GA_ID])

  return null
}

export default function GoogleAnalytics({ GA_ID }: GoogleAnalyticsProps) {
  return (
    <Suspense>
      <GoogleAnalyticsInner GA_ID={GA_ID} />
    </Suspense>
  )
}