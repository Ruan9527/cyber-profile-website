'use client'

import { useState } from 'react'
import { Mail, Github, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// 小红书图标 - 使用官方红色
const XiaohongshuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <path
      d="M19.5 4.5H4.5C3.39543 4.5 2.5 5.39543 2.5 6.5V17.5C2.5 18.6046 3.39543 19.5 4.5 19.5H19.5C20.6046 19.5 21.5 18.6046 21.5 17.5V6.5C21.5 5.39543 20.6046 4.5 19.5 4.5Z"
      fill="#FF2442"
      stroke="#FF2442"
      strokeWidth="1.5"
    />
    <path
      d="M12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5Z"
      fill="white"
    />
    <path
      d="M16 7.5C16.8284 7.5 17.5 6.82843 17.5 6C17.5 5.17157 16.8284 4.5 16 4.5C15.1716 4.5 14.5 5.17157 14.5 6C14.5 6.82843 15.1716 7.5 16 7.5Z"
      fill="white"
    />
  </svg>
)

export default function ContactSection() {
  const { t } = useLanguage()
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)

  const contacts = [
    {
      icon: Mail,
      label: t('contact.email_label'),
      value: t('contact.email_value'),
      link: 'mailto:ruanlong9527@gmail.com',
      color: 'cyber-cyan',
      description: t('contact.email_desc')
    },
    {
      icon: Github,
      label: t('contact.github_label'),
      value: t('contact.github_value'),
      link: 'https://github.com/yourusername',
      color: 'cyber-gray',
      description: t('contact.github_desc')
    },
    {
      icon: XiaohongshuIcon,
      label: t('contact.xiaohongshu_label'),
      value: t('contact.xiaohongshu_value'),
      link: 'https://www.xiaohongshu.com/user/profile/your-xiaohongshu-id',
      color: 'cyber-red',
      description: t('contact.xiaohongshu_desc')
    }
  ]

  return (
    <section id="contact" className="pt-24 pb-16 px-4 relative bg-gradient-to-b from-cyber-gray/20 via-cyber-gray/10 to-cyber-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10"
            style={{ textShadow: '0 0 20px rgba(102, 224, 255, 0.5)' }}>
          <span className="text-cyber-cyan">{t('contact.title')}</span>
        </h2>

        <div className="cyber-card p-8">
          <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 flex items-center gap-3"
              style={{ textShadow: '0 0 15px rgba(255, 242, 102, 0.4)' }}>
            <Mail className="w-6 h-6" />
            {t('contact.get_in_touch')}
          </h3>
          
          <p className="text-white/80 mb-8 leading-relaxed text-center">
            如果您对我的技术能力感兴趣，或者有合作机会，欢迎通过以下方式联系我。
            我专注于IT运维和AI技术领域，期待与您交流。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <a
                  key={contact.label}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cyber-card p-6 group relative overflow-hidden cursor-pointer ${
                    hoveredContact === contact.label ? 'border-cyber-cyan/80' : ''
                  }`}
                  onMouseEnter={() => setHoveredContact(contact.label)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  {/* 悬停效果覆盖层 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyber-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className={`p-4 bg-${contact.color}/15 border-2 border-${contact.color}/50 rounded-lg group-hover:scale-110 transition-transform group-hover:rotate-6`}
                         style={{ boxShadow: `0 0 15px rgba(102, 224, 255, 0.2)` }}>
                      <Icon />
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm text-cyber-gray uppercase tracking-wider mb-1">
                        {contact.label}
                      </div>
                      <div className="text-cyber-cyan font-bold group-hover:text-cyber-yellow transition-colors mb-2"
                           style={{ textShadow: '0 0 10px rgba(102, 224, 255, 0.3)' }}>
                        {contact.value}
                      </div>
                      <div className="text-xs text-white/60">
                        {contact.description}
                      </div>
                    </div>
                    
                    <ExternalLink className="w-5 h-5 text-cyber-gray group-hover:text-cyber-cyan transition-colors" />
                  </div>
                </a>
              )
            })}
          </div>

          {/* 响应时间说明 */}
          <div className="mt-10 pt-8 border-t border-cyber-gray/30">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-cyber-yellow text-sm font-bold"
                   style={{ textShadow: '0 0 10px rgba(255, 242, 102, 0.3)' }}>
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                通常会在24小时内回复
              </div>
              <p className="text-white/60 text-sm mt-2">
                请注明来意，我会尽快查看并回复您的消息。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}