'use client'

import { Languages } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { language, setLanguage } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-cyan/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="font-display font-bold text-cyber-cyan text-xl">
          CYBER PROFILE
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className="flex items-center gap-2 cyber-button px-4 py-2 text-sm group"
          style={{
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)'
          }}
        >
          <Languages className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="font-bold">
            {language === 'en' ? '中文' : 'EN'}
          </span>
        </button>
      </div>
    </nav>
  )
}
