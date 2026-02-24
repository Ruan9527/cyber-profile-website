'use client'

import { useState, useEffect } from 'react'
import { Github, Mail } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import XiaohongshuIcon from './XiaohongshuIcon'
import MagneticCard from './MagneticCard'


const personalInfo = {
  name: "您好，我是圆周率的达",
  title: "IT运维 & AI开发者",
  bio: "专注于IT运维自动化和AI技术应用的现代个人展示网站",
  avatar: "/avatar.jpg",
  email: "ruanlong9527@gmail.com",
  github: "https://github.com/yourusername",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/your-xiaohongshu-id"
}

const sentences = [
  "放下偏见，以干促学，理论实战两手抓。",
  "心存敬畏，善用AI，从自身复盘逻辑。",
  "无限进化，持续突破认知边界"
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
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

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [typeIdx, setTypeIdx] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const curr = sentences[typeIdx]
    let timeout: NodeJS.Timeout

    if (typing) {
      if (displayed.length < curr.length) {
        timeout = setTimeout(() => setDisplayed(curr.substring(0, displayed.length + 1)), 50)
      } else {
        timeout = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(curr.substring(0, displayed.length - 1)), 30)
      } else {
        setTyping(true)
        setTypeIdx((i) => (i + 1) % sentences.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, typeIdx, typing])

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-futuristic-light-gray">

      <div className="absolute inset-0 bg-abstract-geometric opacity-50" />
      <div className="absolute inset-0 bg-noise-texture opacity-[0.02]" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <motion.div
              className="mb-4 text-futuristic-blue font-space-grotesk text-lg font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Welcome to my portfolio
            </motion.div>

            <h1 className="font-archivo text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-futuristic-text">Hello, I'm</span>
              <br />
              <span className="text-futuristic-blue">圆周率的达</span>
            </h1>

            <motion.h2
              className="font-space-grotesk text-2xl md:text-3xl text-futuristic-text-muted mb-6 font-medium"
              variants={itemVariants}
            >
              {personalInfo.title}
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              <span className="text-futuristic-blue font-space-grotesk text-lg block mb-2">
                {displayed}
                <span className="typewriter-cursor" />
              </span>
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
               <motion.a
                 href={personalInfo.github}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="glass-card flex items-center gap-3 px-6 py-3 text-futuristic-text hover:bg-white/80 transition-all"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.98 }}
               >
                 <Github className="w-5 h-5" />
                 GitHub
               </motion.a>

               <motion.a
                 href={personalInfo.xiaohongshu}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="glass-card flex items-center gap-3 px-6 py-3 text-futuristic-text hover:bg-white/80 transition-all"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.98 }}
               >
                 <XiaohongshuIcon className="w-5 h-5" />
                 小红书
               </motion.a>

               <motion.a
                 href={`mailto:${personalInfo.email}`}
                 className="glass-card flex items-center gap-3 px-6 py-3 text-futuristic-text hover:bg-white/80 transition-all"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.98 }}
               >
                 <Mail className="w-5 h-5" />
                 联系我
               </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <MagneticCard
              avatarSrc={personalInfo.avatar}
              title="@圆周率的达"
              subtitle={personalInfo.title}
            />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-futuristic-blue/60">
            <span className="text-xs font-space-grotesk uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-futuristic-blue to-transparent" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
