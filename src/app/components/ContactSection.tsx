'use client'

import { useState } from 'react'
import { Mail, Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20
    }
  }
}

export default function ContactSection() {
  const { t } = useLanguage()
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)

  const contacts = [
    {
      icon: Mail,
      label: '电子邮箱',
      value: 'ruanlong9527@gmail.com',
      link: 'mailto:ruanlong9527@gmail.com',
      color: 'cyber-cyan',
      description: '日常工作联系'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/yourusername',
      link: 'https://github.com/yourusername',
      color: 'cyber-gray',
      description: '开源项目代码'
    },
    {
      icon: XiaohongshuIcon,
      label: '小红书',
      value: '圆周率的达',
      link: 'https://www.xiaohongshu.com/user/profile/your-xiaohongshu-id',
      color: 'cyber-red',
      description: '技术分享动态'
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black" />
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">联系</span>
            <span className="text-cyber-cyan"> 我</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            如果您对我的技术能力感兴趣，或者有合作机会，欢迎通过以下方式联系我。
            我专注于IT运维和AI技术领域，期待与您交流。
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="cyber-card"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={contact.label}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 rounded-xl bg-cyber-black/50 border border-cyber-gray/30 hover:border-cyber-cyan/50 transition-all duration-300 hover-lift"
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredContact(contact.label)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <motion.div
                      className="p-4 bg-cyber-cyan/15 border-2 border-cyber-cyan/50 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all"
                      style={{ boxShadow: '0 0 15px rgba(102, 224, 255, 0.2)' }}
                      animate={{
                        boxShadow: hoveredContact === contact.label
                          ? '0 0 25px rgba(102, 224, 255, 0.4)'
                          : '0 0 15px rgba(102, 224, 255, 0.2)'
                      }}
                    >
                      <Icon />
                    </motion.div>

                    <div>
                      <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                        {contact.label}
                      </div>
                      <div className={`text-lg font-bold ${contact.color} group-hover:text-cyber-yellow transition-colors`}>
                        {contact.value}
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        {contact.description}
                      </div>
                    </div>

                    <ExternalLink className="w-5 h-5 text-cyber-gray group-hover:text-cyber-cyan transition-colors" />
                  </div>
                </motion.a>
              )
            })}
          </motion.div>

          <motion.div
            className="mt-10 pt-8 border-t border-cyber-gray/30"
            variants={itemVariants}
          >
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 text-cyber-green text-sm font-bold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                通常会在24小时内回复
              </motion.div>
              <p className="text-gray-500 text-sm mt-3">
                请注明来意，我会尽快查看并回复您的消息。
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
