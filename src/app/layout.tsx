import type { Metadata } from 'next'
import './globals.css'

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
  return (
    <html lang="en" className="font-cyber">

      <body className="min-h-screen bg-cyber-black">
        {children}
        <div className="scanlines" />
      </body>
    </html>
  )
}