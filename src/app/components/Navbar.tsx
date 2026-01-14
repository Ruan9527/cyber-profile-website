'use client'

import { useState, useEffect } from 'react'
import { Languages, Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { id: 'home', label: 'nav.home', href: '#home' },
    { id: 'skills', label: 'nav.skills', href: '#skills' },
    { id: 'projects', label: 'nav.projects', href: '#projects' },
    { id: 'contact', label: 'nav.contact', href: '#contact' },
  ]

  useEffect(() => {
    // 监听滚动位置，高亮当前section
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href) as HTMLElement
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-cyan/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="font-display font-bold text-cyber-cyan text-xl">
            CYBER PROFILE
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium uppercase tracking-wider text-sm transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50 px-3 py-2 rounded-lg'
                    : 'text-white/70 hover:text-cyber-cyan hover:bg-cyber-cyan/10 px-3 py-2 rounded-lg'
                }`}
                style={{
                  boxShadow: activeSection === link.id ? '0 0 10px rgba(0, 240, 255, 0.2)' : 'none'
                }}
              >
                {language === 'en' ? link.label.split('.')[1] : link.label.split('.')[1]}
              </a>
            ))}
            
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="cyber-button px-4 py-2 text-sm flex items-center gap-2"
              style={{
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)'
              }}
            >
              <Languages className="w-4 h-4" />
              <span className="font-bold">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between h-14">
          <div className="font-display font-bold text-cyber-cyan text-lg">
            CYBER PROFILE
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher - Mobile */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-3 py-1.5 text-xs font-bold text-cyber-cyan border border-cyber-cyan/50 rounded hover:bg-cyber-cyan/10 transition-colors"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-cyber-cyan hover:bg-cyber-cyan/10 rounded transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 cyber-card mt-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href)
                  setMobileMenuOpen(false)
                }}
                className={`block px-4 py-3 font-medium uppercase tracking-wider text-sm transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50'
                    : 'text-white/70 hover:text-cyber-cyan hover:bg-cyber-cyan/10'
                }`}
                style={{
                  boxShadow: activeSection === link.id ? '0 0 10px rgba(0, 240, 255, 0.2)' : 'none'
                }}
              >
                {language === 'en' ? link.label.split('.')[1] : link.label.split('.')[1]}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
