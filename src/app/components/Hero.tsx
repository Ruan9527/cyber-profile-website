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
      {/* Enhanced Parallax Background System */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-gradient-start via-cyber-gradient-middle to-cyber-gradient-end" />
        
        {/* Animated grid layer 1 - slow movement */}
        <div className="absolute inset-0 bg-cyber-grid animate-grid-move" style={{ backgroundSize: '80px 80px' }} />
        
        {/* Animated grid layer 2 - fast movement */}
        <div className="absolute inset-0 bg-cyber-grid-dense animate-grid-move" style={{ 
          backgroundSize: '40px 40px',
          animationDuration: '15s',
          opacity: 0.3
        }} />
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 circuit-bg opacity-30" />
        
        {/* Animated glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] animate-float" 
          style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-yellow/5 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyber-purple/5 rounded-full blur-[100px] animate-float"
          style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-3/4 right-3/4 w-80 h-80 bg-cyber-red/5 rounded-full blur-[110px] animate-float"
          style={{ animationDelay: '1s' }} />
        
        {/* Data stream effects */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-data-stream" />
        <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyber-purple to-transparent animate-data-stream"
          style={{ animationDuration: '8s' }} />
          
        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           {/* Left Column - Avatar with advanced effects */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative group perspective-1000">
              {/* Outer glow ring */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-red opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500 animate-rotate-slow" />
              
              {/* Middle ring */}
              <div className="absolute -inset-4 rounded-full border-4 border-cyber-cyan/40 group-hover:border-cyber-cyan/80 transition-all duration-500 animate-rotate-fast" />
              
              {/* Inner ring */}
              <div className="absolute -inset-2 rounded-full border-2 border-cyber-yellow/60 group-hover:border-cyber-yellow/90 transition-all duration-500" />
              
              {/* Avatar with advanced hover effects */}
              <div className="relative z-10 transform-style-3d transition-transform duration-700 group-hover:rotate-y-10">
                <ImageWithPlaceholder
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  width={280}
                  height={280}
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-cyber-cyan/80 shadow-cyber-lg transition-all duration-500 group-hover:scale-110 group-hover:border-cyber-yellow/80 group-hover:shadow-cyber-xl"
                />
                
                {/* Holographic overlay on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyber-cyan/10 via-transparent to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </div>
              
              {/* Floating particles around avatar */}
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-cyber-cyan rounded-full animate-particle-float" 
                style={{ animationDelay: '0s' }} />
              <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-cyber-yellow rounded-full animate-particle-float"
                style={{ animationDelay: '0.5s' }} />
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyber-red rounded-full animate-particle-float"
                style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyber-purple rounded-full animate-particle-float"
                style={{ animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-2">
             {/* Main name with advanced typography */}
             <div className="relative mb-6">
               <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-2 stagger-1 animate-gradient-shift"
                   style={{
                     background: 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-purple), var(--cyber-yellow), var(--cyber-red))',
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
               <div className="h-1 w-32 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full stagger-2" />
               <div className="h-1 w-24 bg-gradient-to-r from-cyber-yellow to-cyber-red rounded-full mt-1 ml-8 stagger-3" />
             </div>

            {/* Title with staggered animation */}
            <h2 className="font-display-alt text-2xl md:text-3xl lg:text-4xl text-neon-yellow mb-6 font-bold stagger-4"
                style={{ animationDelay: '0.3s' }}>
              <span className="relative">
                {t('hero.title')}
                <span className="absolute -inset-2 bg-cyber-yellow/10 blur-xl rounded-lg -z-10" />
              </span>
            </h2>

            {/* Bio with enhanced readability */}
            <p className="text-lg md:text-xl text-cyber-white/95 mb-10 leading-relaxed max-w-2xl stagger-5 font-body-en"
               style={{ animationDelay: '0.4s' }}>
              <span className="relative">
                {t('hero.bio')}
                <span className="absolute -inset-4 bg-cyber-black/30 blur-lg rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </span>
            </p>

             {/* Social Links with variant buttons */}
             <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 stagger-6">
               <a
                 href={personalInfo.github}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="cyber-button cyber-button-variant-cyan px-5 py-3 flex items-center gap-3 text-sm md:text-base interactive-glow"
                 aria-label="GitHub Profile"
               >
                 <Github className="w-5 h-5" />
                 <span className="font-mono-tech">{t('hero.github')}</span>
                 <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-cyan rounded-full animate-pulse" />
               </a>
               
               <a
                 href={personalInfo.linkedin}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="cyber-button cyber-button-variant-blue px-5 py-3 flex items-center gap-3 text-sm md:text-base interactive-glow"
                 aria-label="LinkedIn Profile"
               >
                 <Linkedin className="w-5 h-5" />
                 <span className="font-mono-tech">{t('hero.linkedin')}</span>
                 <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-blue rounded-full animate-pulse" />
               </a>
               
               <a
                 href={personalInfo.twitter}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="cyber-button cyber-button-variant-cyan px-5 py-3 flex items-center gap-3 text-sm md:text-base interactive-glow"
                 aria-label="Twitter Profile"
               >
                 <Twitter className="w-5 h-5" />
                 <span className="font-mono-tech">{t('hero.twitter')}</span>
                 <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-purple rounded-full animate-pulse" />
               </a>
               
               <a
                 href={`mailto:${personalInfo.email}`}
                 className="cyber-button cyber-button-variant-red px-5 py-3 flex items-center gap-3 text-sm md:text-base interactive-glow"
                 aria-label="Contact via Email"
               >
                 <Mail className="w-5 h-5" />
                 <span className="font-mono-tech">{t('hero.contact')}</span>
                 <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-red rounded-full animate-pulse" />
               </a>
             </div>

             {/* Download Resume Button with advanced effects */}
             <div className="relative stagger-7" style={{ animationDelay: '0.6s' }}>
               <button className="cyber-button cyber-button-variant-purple px-8 py-4 flex items-center gap-4 text-base md:text-lg mx-auto lg:mx-0 interactive-glow group relative overflow-hidden">
                 {/* Button background effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/20 via-cyber-pink/20 to-cyber-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 {/* Icon */}
                 <Download className="w-6 h-6 group-hover:animate-bounce" />
                 
                 {/* Text */}
                 <span className="font-display font-bold tracking-wider">
                   {t('hero.download_resume')}
                 </span>
                 
                 {/* Animated border */}
                 <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-cyber-yellow group-hover:animate-pulse-cyan transition-all duration-300" />
                 
                 {/* Particle effect on hover */}
                 <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-yellow rounded-full animate-particle-float" />
                   <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyber-cyan rounded-full animate-particle-float" style={{ animationDelay: '0.3s' }} />
                 </div>
               </button>
               
               {/* Info text */}
               <p className="text-cyber-text-tertiary text-sm mt-3 text-center lg:text-left">
                 <span className="font-mono-tech">PDF • 2.4MB • Updated recently</span>
               </p>
             </div>
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