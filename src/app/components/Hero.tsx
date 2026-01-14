'use client'

import { Github, Linkedin, Twitter, Mail, Download } from 'lucide-react'
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder'
import { PersonalInfo } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import useTypewriter from '@/hooks/useTypewriter'

const personalInfo: PersonalInfo = {
  name: "圆周率的达",
  title: "Bunny Developer",
  bio: "Passionate about creating amazing web experiences with cyberpunk aesthetics and cutting-edge technology.",
  avatar: "/avatar.jpg",
  email: "ruanlong9527@gmail.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourusername"
}

export default function Hero() {
  const { t } = useLanguage()
  
  const { displayText: typedName, isTyping } = useTypewriter({
    text: personalInfo.name,
    speed: 80,
    delay: 500,
    loop: true,
    loopDelay: 3000,
    pauseAtEnd: 2000,
    deleteSpeed: 40
  })

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center px-4 overflow-hidden">
      {/* Background grid effect with enhanced gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-gray/20 to-cyber-black">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        {/* Enhanced background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-yellow/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Avatar */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
              <div className="relative group">
                <ImageWithPlaceholder
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  width={240}
                  height={240}
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-6 border-cyber-cyan transition-transform duration-300 group-hover:scale-105"
                />
                {/* Avatar glow ring */}
                <div className="absolute inset-0 -m-4 rounded-full border-2 border-cyber-yellow/50 animate-pulse" />
              </div>
          </div>

          {/* Right Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-2">
             <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4 glitch-effect" data-text={personalInfo.name}
                style={{
                  textShadow: '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)'
                }}>
               <span className="text-cyber-cyan">{typedName}</span>
                {/* Blinking cursor */}
                {isTyping && (
                  <span className="typewriter-cursor"></span>
                )}
             </h1>

            <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-cyber-yellow mb-6 font-bold"
                style={{
                  textShadow: '0 0 15px rgba(252, 238, 10, 0.5)'
                }}>
              {t('hero.title')}
            </h2>

            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed"
               style={{
                 textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
               }}>
              {t('hero.bio')}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button px-4 py-2 flex items-center gap-2 text-sm"
              >
                <Github className="w-4 h-4" />
                {t('hero.github')}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button px-4 py-2 flex items-center gap-2 text-sm"
              >
                <Linkedin className="w-4 h-4" />
                {t('hero.linkedin')}
              </a>
              <a
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button px-4 py-2 flex items-center gap-2 text-sm"
              >
                <Twitter className="w-4 h-4" />
                {t('hero.twitter')}
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="cyber-button px-4 py-2 flex items-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                {t('hero.contact')}
              </a>
            </div>

            {/* Download Resume Button */}
            <button className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow flex items-center gap-3 text-base px-8 mx-auto lg:mx-0">
              <Download className="w-5 h-5" />
              {t('hero.download_resume')}
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="flex flex-col items-center gap-2 text-cyber-cyan/60">
            <span className="text-xs uppercase tracking-wider">Scroll Down</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced animated background elements with glow */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"
           style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.4)' }} />
      <div className="absolute top-40 right-20 w-3 h-3 bg-cyber-yellow rounded-full animate-pulse"
           style={{ animationDelay: '1s', boxShadow: '0 0 12px rgba(252, 238, 10, 0.8), 0 0 24px rgba(252, 238, 10, 0.4)' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-cyber-red rounded-full animate-pulse"
           style={{ animationDelay: '2s', boxShadow: '0 0 10px rgba(255, 0, 60, 0.8), 0 0 20px rgba(255, 0, 60, 0.4)' }} />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-cyber-cyan rounded-full animate-pulse"
           style={{ animationDelay: '0.5s', boxShadow: '0 0 15px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)' }} />
    </section>
  )
}