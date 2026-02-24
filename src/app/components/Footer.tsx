'use client'

import { Github, Mail, Heart } from 'lucide-react'
import XiaohongshuIcon from '@/app/components/XiaohongshuIcon'

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: Github,
      color: 'futuristic-blue'
    },
    {
      name: 'Xiaohongshu',
      href: 'https://www.xiaohongshu.com/user/profile/yourprofile',
      icon: XiaohongshuIcon,
      color: 'futuristic-blue'
    },
    {
      name: 'Email',
      href: 'mailto:ruanlong9527@gmail.com',
      icon: Mail,
      color: 'futuristic-blue'
    }
  ]

  return (
    <footer className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left: Brand */}
          <div className="text-center md:text-left">
            <div className="font-archivo font-bold text-futuristic-dark text-xl mb-3">
              FUTURISTIC PORTFOLIO
            </div>
            <p className="font-space-grotesk text-gray-600 text-sm leading-relaxed">
              IT Operations & AI Technology Specialist
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-gray-200/60 rounded-xl hover:bg-futuristic-blue/5 hover:border-futuristic-blue/30 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                >
                  <Icon className="w-5 h-5 text-gray-600 hover:text-futuristic-blue transition-colors" />
                </a>
              )
            })}
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right">
            <p className="font-space-grotesk text-gray-500 text-sm mb-2">
              © 2025 Futuristic Portfolio. All rights reserved.
            </p>
            <p className="font-space-grotesk text-gray-400 text-xs flex items-center justify-center md:justify-end gap-1">
              Made with 
              <Heart className="w-3 h-3 text-futuristic-blue fill-futuristic-blue/30 inline mx-1" />
              using Next.js & Tailwind
            </p>
          </div>
        </div>

        {/* Minimal decorative line */}
        <div className="mt-12 flex items-center justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </div>
    </footer>
  )
}
