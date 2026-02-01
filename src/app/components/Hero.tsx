'use client'
import { useState, useEffect } from 'react'

import { Github, Mail } from 'lucide-react'
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder'
import { PersonalInfo } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import XiaohongshuIcon from './XiaohongshuIcon'

const personalInfo: PersonalInfo = {
  name: "您好，我是圆周率的达",
  title: "IT运维 & AI开发者",
  bio: "专注于IT运维自动化和AI技术应用的赛博朋克风格个人展示网站",
  avatar: "/avatar.jpg",
  email: "ruanlong9527@gmail.com",
  github: "https://github.com/yourusername",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/your-xiaohongshu-id"
}

export default function Hero() {
  // Avatar tilt state for mouse interaction
  const [avatarTilt, setAvatarTilt] = useState({ dx: 0, dy: 0 })
  const handleAvatarMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    // rotate around Y (left-right) and X (up-down)
    setAvatarTilt({ dx: -relY * 8, dy: relX * 8 })
  }
  const handleAvatarLeave = () => {
    setAvatarTilt({ dx: 0, dy: 0 })
  }
  const { t } = useLanguage()
  // Typing-style carousel replacement
  const sentences = [
    "放下偏见，以干促学，理论实战两手抓。",
    "心存敬畏，善用AI，从自身复盘逻辑。",
    "无限进化，持续突破认知边界"
  ];
  const [typeIdx, setTypeIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const curr = sentences[typeIdx];
    let timeout: any;
    if (typing) {
      if (displayed.length < curr.length) {
        timeout = setTimeout(() => setDisplayed(curr.substring(0, displayed.length + 1)), 40);
      } else {
        timeout = setTimeout(() => setTyping(false), 1000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(curr.substring(0, displayed.length - 1)), 20);
      } else {
        setTyping(true);
        setTypeIdx((i) => (i + 1) % sentences.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typeIdx, typing]);

  return (
    <section id="home" className="relative h-screen flex items-center px-4 overflow-hidden pt-24 pb-8">
      {/* Simplified Background System with Avatar */}
      <div className="absolute inset-0 overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
              style={{ backgroundImage: 'url(/bg.png)', filter: 'blur(0px) brightness(1.2)' }} />



         {/* Single subtle glow orb */}
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] animate-float" />

         {/* Noise texture overlay */}
         <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Avatar (mobile) */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-1 md:hidden" onMouseMove={handleAvatarMove} onMouseLeave={handleAvatarLeave} style={{ transform: `rotateX(${avatarTilt.dx}deg) rotateY(${avatarTilt.dy}deg)` , transition: 'transform 0.1s' }}>
              <div className="relative group">
                {/* Avatar with subtle hover effects - square style for mobile */}
                <ImageWithPlaceholder
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  width={320}
                  height={320}
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-none border-4 border-cyber-cyan/70 shadow-cyber-lg transition-all duration-500"
                />
              </div>
            </div>
            {/* Left Column - Avatar moved into standard left grid cell */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-1 md:order-1 lg:col-span-4">
               <ImageWithPlaceholder
                 src={personalInfo.avatar}
                 alt={personalInfo.name}
                 width={320}
                 height={320}
                 className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-none border-4 border-cyber-cyan/70 shadow-cyber-lg"
               />
            </div>

           {/* Right Column - Content with improved spacing */}
             <div className="text-center lg:text-left order-2 lg:order-2 md:ml-[25%] text-right md:text-left lg:col-span-8">
               {/* Main name */}
               <div className="relative mb-6 md:mb-8">
                 <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-4 stagger-1">
                    <div className="leading-tight">
                      <div className="font-bold text-white text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3">您好，我是</div>
                      <div className="font-black text-white text-5xl md:text-6xl lg:text-7xl">圆周率的达</div>
                    </div>
                 </h1>
                
                {/* Typing carousel (replaced bio position) */}
                <div className="text-lg md:text-xl lg:text-2xl text-cyber-yellow mb-6" aria-live="polite">
                  <span>{displayed}</span><span className="typewriter-cursor" />
                </div>
                {/* Decorative underline */}
                <div className="h-1 w-32 md:w-40 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full stagger-2" />
              </div>

               {/* Title */}
               <h2 className="font-display-alt text-2xl md:text-3xl lg:text-4xl text-cyber-yellow mb-6 md:mb-8 font-black stagger-4"
                   style={{ animationDelay: '0.3s' }}>
                 {t('hero.title')}
               </h2>

              {/* Bio section removed; replaced by typing carousel above */}

               {/* Social Links with improved spacing */}
                <div className="flex flex-nowrap gap-4 overflow-x-auto py-2 mb-16 stagger-6" style={{ scrollbarWidth: 'thin' }}>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                     className="cyber-button cyber-button-variant-cyan px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 text-base md:text-lg interactive-glow min-w-[180px] shrink-0"
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
                      className="cyber-button bg-cyber-black border-cyber-red hover:bg-cyber-red hover:border-cyber-red px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 text-base md:text-lg interactive-glow min-w-[180px] shrink-0"
                    aria-label="Xiaohongshu Profile"
                  >
                    <XiaohongshuIcon className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="font-mono-tech">{t('hero.xiaohongshu')}</span>
                   <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-red rounded-full animate-pulse" />
                  </a>
                  
                  <a
                    href={`mailto:${personalInfo.email}`}
                     className="cyber-button cyber-button-variant-yellow px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 text-base md:text-lg interactive-glow min-w-[180px] shrink-0"
                    aria-label="Contact via Email"
                  >
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="font-mono-tech">{t('hero.contact')}</span>
                   <span className="absolute -right-2 -top-2 w-4 h-4 bg-cyber-yellow rounded-full animate-pulse" />
                 </a>
               </div>


           </div>
        </div>


      </div>
    </section>
  )
}
