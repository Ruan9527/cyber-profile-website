"use client"

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import WeatherBadge from './WeatherBadge'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const navLinks = [
    { id: 'home', label: 'nav.home', href: '#home' },
    { id: 'skills', label: 'nav.skills', href: '#skills' },
    { id: 'projects', label: 'nav.projects', href: '#projects' },
    { id: 'contact', label: 'nav.contact', href: '#contact' },
  ]

  useEffect(() => {
    // Listen to scroll position and highlight current section
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

  useEffect(() => {
    // Listen to scroll progress and scroll state
    const handleScrollProgress = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.min(Math.round((scrollY / scrollHeight) * 100), 100) : 0

      setScrollProgress(progress)
      setScrolled(scrollY > 50)
    }

    handleScrollProgress() // Initialize
    window.addEventListener('scroll', handleScrollProgress)
    return () => window.removeEventListener('scroll', handleScrollProgress)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href) as HTMLElement
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hover:bg-cyber-black/95 hover:backdrop-blur-lg hover:shadow-[0_4px_30px_rgba(0,240,255,0.15)] hover:border-b hover:border-cyber-cyan/50 ${
      scrolled
        ? 'bg-cyber-black/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,240,255,0.15)] border-b border-cyber-cyan/50'
        : 'bg-transparent'
    }`}>
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--cyber-red), var(--cyber-orange), var(--cyber-yellow), var(--cyber-cyan), var(--cyber-purple))'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="font-display font-bold text-2xl tracking-wider">
            <span className="text-cyber-cyan">Always</span>
            <span className="text-cyber-yellow">PiPi</span>
          </div>

           {/* Nav Links - Center */}
           <div className="flex items-center gap-10 flex-1 justify-center">
             {navLinks.map((link) => (
               <a
                 key={link.id}
                 href={link.href}
                 onClick={(e) => handleNavClick(e, link.href)}
                 className={`nav-link font-medium uppercase tracking-wider text-base transition-all duration-300 relative px-5 py-3 ${activeSection === link.id ? 'text-cyber-yellow' : 'text-white/80 hover:text-cyber-yellow'}`}
                 // Removed neon glow styles for active state
               >
                 <span className="relative inline-flex items-center">
                   {activeSection === link.id && (
                     <span className="nav-arrow inline-block mr-2 align-middle blink" aria-hidden="true">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cyber-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <polyline points="10 6 16 12 10 18" />
                       </svg>
                     </span>
                   )}
                   {t(link.label)}
                   {activeSection === link.id && (
                     <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-cyber-red" />
                   )}
                 </span>
               </a>
             ))}
           </div>

           {/* Weather Badge - Right side in flex layout */}
           <div className="flex-shrink-0">
             <WeatherBadge />
           </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between h-16">
          <div className="font-display font-bold text-xl tracking-wide">
            <span className="text-cyber-cyan">Always</span>
            <span className="text-cyber-yellow">PiPi</span>
          </div>
          <div className="flex items-center gap-4">
            <WeatherBadge compact={true} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-cyber-cyan hover:bg-cyber-cyan/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4 cyber-card mt-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href)
                  setMobileMenuOpen(false)
                }}
                className={`block px-6 py-4 font-medium uppercase tracking-wider text-base transition-colors ${activeSection === link.id ? 'bg-cyber-cyan/20 text-cyber-cyan border-2 border-cyber-cyan/50 rounded-lg' : 'text-white/80 hover:text-cyber-cyan hover:bg-cyber-cyan/10 rounded-lg'}`}
              >
                {t(link.label)}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
