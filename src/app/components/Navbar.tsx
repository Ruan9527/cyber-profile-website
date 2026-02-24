"use client"

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import WeatherBadge from './WeatherBadge'

export default function Navbar() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const navLinks = [
    { id: 'home', label: '首页', href: '#home' },
    { id: 'skills', label: '技能', href: '#skills' },
    { id: 'projects', label: '项目', href: '#projects' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects']
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
    const handleScrollProgress = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.min(Math.round((scrollY / scrollHeight) * 100), 100) : 0

      setScrollProgress(progress)
      setScrolled(scrollY > 50)
    }

    handleScrollProgress()
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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/30'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-futuristic-blue via-futuristic-blue/70 to-futuristic-blue/40"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          className="hidden md:flex items-center justify-between h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="font-display font-bold text-2xl tracking-wider cursor-pointer"
            whileHover={{ scale: 1.05 }}
           >
            <span className="text-futuristic-blue">Always</span>
            <span className="text-futuristic-text">PiPi</span>
          </motion.div>

          <div className="flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative font-medium uppercase tracking-wider text-sm transition-all duration-300 px-4 py-2 ${
                  activeSection === link.id
                    ? 'text-futuristic-blue'
                    : 'text-futuristic-text-muted hover:text-futuristic-blue'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative inline-flex items-center">
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-futuristic-blue"
                      layoutId="activeIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <WeatherBadge variant="minimal" />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex md:hidden items-center justify-between h-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
           <div className="font-display font-bold text-xl tracking-wide">
             <span className="text-futuristic-blue">Always</span>
             <span className="text-futuristic-text">PiPi</span>
           </div>
          <div className="flex items-center gap-4">
            <WeatherBadge variant="minimal" compact={true} />
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               className="p-2 text-futuristic-blue hover:bg-futuristic-blue/10 rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-6 space-y-3 cyber-card mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href)
                    setMobileMenuOpen(false)
                  }}
               className={`block px-6 py-3 font-medium uppercase tracking-wider text-sm transition-colors rounded-lg ${
                 activeSection === link.id
                   ? 'bg-futuristic-blue/20 text-futuristic-blue border border-futuristic-blue/50'
                   : 'text-futuristic-text-muted hover:text-futuristic-blue hover:bg-futuristic-blue/10'
               }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
