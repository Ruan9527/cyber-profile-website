'use client'

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled 
    ? 'bg-cyber-black/95 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,240,255,0.15)] border-b border-cyber-cyan/50' 
    : 'bg-cyber-black/80 backdrop-blur-md border-b border-cyber-cyan/30'
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
      
       <div className="max-w-7xl mx-auto px-6">
         {/* Desktop Navigation */}
         <div className="hidden md:flex items-center justify-between h-20">
           {/* Logo/Brand */}
           <div className="font-display font-bold text-cyber-cyan text-2xl tracking-wider">
             CYBER PROFILE
           </div>

           {/* Nav Links */}
           <div className="flex items-center gap-10">
             {navLinks.map((link) => (
               <a
                 key={link.id}
                 href={link.href}
                 onClick={(e) => handleNavClick(e, link.href)}
                 className={`font-medium uppercase tracking-wider text-base transition-all duration-300 ${
                   activeSection === link.id
                     ? 'bg-cyber-cyan/20 text-cyber-cyan border-2 border-cyber-cyan/50 px-5 py-3 rounded-xl'
                     : 'text-white/80 hover:text-cyber-cyan hover:bg-cyber-cyan/10 px-5 py-3 rounded-xl'
                 }`}
                 style={{
                   boxShadow: activeSection === link.id ? '0 0 20px var(--cyber-cyan-70), 0 0 40px var(--cyber-cyan-50)' : 'none',
                   textShadow: activeSection === link.id ? '0 0 15px var(--cyber-cyan), 0 0 30px var(--cyber-cyan-70)' : 'none'
                 }}
               >
                 {t(link.label)}
               </a>
             )            )}
             
             {/* Weather Badge */}
             <WeatherBadge />
             

           </div>
         </div>

         {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between h-16">
          <div className="font-display font-bold text-cyber-cyan text-xl tracking-wide">
            CYBER PROFILE
          </div>

          <div className="flex items-center gap-4">

            {/* Weather Badge - Mobile (Compact) */}
            <WeatherBadge compact={true} />

            {/* Mobile Menu Button */}
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
                className={`block px-6 py-4 font-medium uppercase tracking-wider text-base transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border-2 border-cyber-cyan/50 rounded-lg'
                    : 'text-white/80 hover:text-cyber-cyan hover:bg-cyber-cyan/10 rounded-lg'
                }`}
                style={{
                  boxShadow: activeSection === link.id ? '0 0 20px var(--cyber-cyan-70), 0 0 40px var(--cyber-cyan-50)' : 'none',
                  textShadow: activeSection === link.id ? '0 0 15px var(--cyber-cyan), 0 0 30px var(--cyber-cyan-70)' : 'none'
                }}
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
