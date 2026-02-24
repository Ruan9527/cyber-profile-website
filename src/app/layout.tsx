import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from './components/GoogleAnalytics'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ErrorBoundary from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'Cyber Profile - Dynamic Personal Website',
  description: 'A cyberpunk-themed personal website with interactive features',
  keywords: ['cyberpunk', 'portfolio', 'personal website', 'developer'],
  authors: [{ name: 'Cyber Developer' }],
  openGraph: {
    title: 'Cyber Profile',
    description: 'A cyberpunk-themed personal website with interactive features',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" dir="ltr" className="font-cyber scroll-smooth">
      {gaId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
       )}
       <body className="min-h-screen bg-futuristic-light-gray">
        <ErrorBoundary>
          <LanguageProvider>
            {process.env.NEXT_PUBLIC_GA_ID && (
              <GoogleAnalytics GA_ID={process.env.NEXT_PUBLIC_GA_ID} />
            )}
            {children}
            <div className="scanlines" />
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}