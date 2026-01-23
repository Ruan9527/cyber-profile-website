'use client'

import { Github, Mail } from 'lucide-react'
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder'
import { PersonalInfo } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import useTypewriter from '@/hooks/useTypewriter'
import XiaohongshuIcon from './XiaohongshuIcon'

const personalInfo: PersonalInfo = {
  name: "圆周率的达",
  title: "IT运维 & AI开发者",
  bio: "专注于IT运维自动化和AI技术应用的赛博朋克风格个人展示网站",
  avatar: "/avatar.jpg",
  email: "ruanlong9527@gmail.com",
  github: "https://github.com/yourusername",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/your-xiaohongshu-id"
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
    <section id="home" className="relative min-h-[90vh] flex items-center px-4 overflow-hidden pt-24 pb-8">
      {/* Simplified Background System with Avatar */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Avatar Background Image - Subtle and Blurred */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
             style={{ backgroundImage: 'url(/avatar.jpg)', filter: 'blur(20px) brightness(0.6)' }} />

        {/* Base gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-black/90 via-cyber-gradient-middle/80 to-cyber-gradient-end/90" />
        
        {/* Single animated grid layer */}
        <div className="absolute inset-0 bg-cyber-grid animate-grid-move opacity-20" style={{ backgroundSize: '80px 80px' }} />
        
        {/* Single subtle glow orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] animate-float" />
           
        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
           {/* Left Column - Avatar with simplified effects */}
           <div className="flex justify-center lg:justify-end order-1 lg:order-1">
             <div className="relative group">
               {/* Outer glow ring */}
               <div className="absolute -inset-4 md:-inset-6 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-red opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 animate-rotate-slow" />
               
               {/* Middle ring */}
               <div className="absolute -inset-3 md:-inset-4 rounded-full border-4 border-cyber-cyan/30 group-hover:border-cyber-cyan/60 transition-all duration-500 animate-rotate-fast" />
               
               {/* Avatar with subtle hover effects */}
               <div className="relative z-10">
                 <ImageWithPlaceholder
                   src={personalInfo.avatar}
                   alt={personalInfo.name}
                   width={320}
                   height={320}
                   className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-cyber-cyan/70 shadow-cyber-lg transition-all duration-500 group-hover:scale-105 group-hover:border-cyber-yellow/80 group-hover:shadow-cyber-xl"
                 />
                 
                 {/* Holographic overlay on hover */}
                 <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyber-cyan/10 via-transparent to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
               </div>
             </div>
           </div>

           {/* Right Column - Content with improved spacing */}
           <div className="text-center lg:text-left order-2 lg:order-2">
              {/* Main name with gradient */}
              <div className="relative mb-6 md:mb-8">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-4 stagger-1 animate-gradient-shift"
                    style={{
                      background: 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-purple), var(--cyber-yellow))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundSize: '300% 300%'
                    }}>
                  <span className="relative">
                    {typedName}
                    {/* Glitch effect overlay */}
                    <span className="absolute top-0 left-0 w-full h-full text-neon-cyan animate-text-glitch opacity-70" aria-hidden="true">
                      {typedName}
                    </span>
                    {/* Blinking cursor */}
                    {isTyping && (
                      <span className="typewriter-cursor"></span>
                    )}
                  </span>
                </h1>
                
                {/* Decorative underline */}
                <div className="h-1 w-32 md:w-40 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full stagger-2" />
              </div>

             {/* Title with subtle glow */}
             <h2 className="font-display-alt text-2xl md:text-3xl lg:text-4xl text-neon-yellow mb-6 md:mb-8 font-bold stagger-4"
                 style={{ animationDelay: '0.3s' }}>
               <span className="relative">
                 {t('hero.title')}
                 <span className="absolute -inset-2 bg-cyber-yellow/10 blur-xl rounded-lg -z-10" />
               </span>
             </h2>

             {/* Bio with enhanced readability and spacing */}
             <p className="text-lg md:text-xl text-cyber-white/90 mb-8 md:mb-12 leading-relaxed max-w-2xl stagger-5 font-body-en"
                style={{ animationDelay: '0.4s' }}>
               <span className="relative">
                 {t('hero.bio')}
                 <span className="absolute -inset-4 bg-cyber-black/30 blur-lg rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
               </span>
             </p>

               {/* Social Links with improved spacing */}
               <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 mb-16 stagger-6">
                 <a
                   href={personalInfo.github}
                   target="_blank"
                   rel="noopener noreferrer"
                    className="cyber-button cyber-button-variant-cyan px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 text-base md:text-lg interactive-glow"
                   aria-label="GitHub Profile"
                 >
                    <Github className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="font-mono-tech">{t('hero.github')}</span>
                   <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-cyan rounded-full animate-pulse" />
                 </a>
                 
                 <a
                   href={personalInfo.xiaohongshu}
                   target="_blank"
                   rel="noopener noreferrer"
                     className="cyber-button bg-cyber-black border-cyber-red hover:bg-cyber-red hover:border-cyber-red px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 text-base md:text-lg interactive-glow"
                   aria-label="Xiaohongshu Profile"
                 >
                    <XiaohongshuIcon className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="font-mono-tech">{t('hero.xiaohongshu')}</span>
                   <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-red rounded-full animate-pulse" />
                 </a>
                 
                 <a
                   href={`mailto:${personalInfo.email}`}
                    className="cyber-button cyber-button-variant-yellow px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 text-base md:text-lg interactive-glow"
                   aria-label="Contact via Email"
                 >
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="font-mono-tech">{t('hero.contact')}</span>
                   <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-yellow rounded-full animate-pulse" />
                 </a>
               </div>


           </div>
        </div>

        {/* Scroll Indicator - Simplified */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="flex flex-col items-center gap-2 text-cyber-cyan/70">
            <span className="text-xs uppercase tracking-wider">Scroll Down</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}