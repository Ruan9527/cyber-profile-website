'use client'

import { Github, Mail, Heart } from 'lucide-react'
import XiaohongshuIcon from '@/app/components/XiaohongshuIcon'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: Github,
      color: 'cyber-cyan'
    },
    {
      name: '小红书',
      href: 'https://www.xiaohongshu.com/user/profile/yourprofile',
      icon: XiaohongshuIcon,
      color: 'cyber-purple'
    },
    {
      name: 'Email',
      href: 'mailto:ruanlong9527@gmail.com',
      icon: Mail,
      color: 'cyber-red'
    }
  ]

  return (
    <footer className="border-t border-cyber-cyan/30 bg-cyber-black/90 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left: Brand */}
          <div className="text-center md:text-left">
            <div 
              className="font-display font-bold text-cyber-cyan text-xl mb-2"
              style={{ textShadow: '0 0 15px rgba(0, 240, 255, 0.5)' }}
            >
              CYBER PROFILE
            </div>
            <p className="text-cyber-text-secondary text-sm leading-relaxed">
              {t('footer.bio')}
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-cyber-gray/20 border-2 border-cyber-cyan/30 rounded-lg hover:bg-cyber-cyan/20 hover:border-cyber-cyan/60 transition-all duration-300 hover:scale-110`}
                  style={{
                    boxShadow: `0 0 10px rgba(0, 240, 255, 0.3)`
                  }}
                >
                  <Icon className={`w-5 h-5 text-${link.color}`} />
                </a>
              )
            })}
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right">
            <p className="text-cyber-text-secondary text-sm mb-1">
              © 2025 Cyber Profile. {t('footer.rights')}
            </p>
            <p className="text-cyber-text-tertiary text-xs flex items-center justify-center md:justify-end gap-1">
              {t('footer.made_with')} 
              <Heart className="w-3 h-3 text-cyber-red fill-cyber-red inline" />
              {t('footer.cyberpunk')}
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-pulse"
               style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }} />
        </div>
      </div>
    </footer>
  )
}
