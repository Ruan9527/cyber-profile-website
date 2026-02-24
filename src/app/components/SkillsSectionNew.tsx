'use client'

import { motion } from 'framer-motion'
import { Server, Cpu, Database, Cloud, Terminal, Shield, Zap, BarChart3 } from 'lucide-react'

const skills = [
  {
    id: 1,
    title: 'IT Operations',
    description: 'Infrastructure automation, monitoring, and system administration',
    icon: Server,
    color: 'text-futuristic-blue',
    bgColor: 'bg-futuristic-blue/10',
    size: 'col-span-2 row-span-1',
  },
  {
    id: 2,
    title: 'AI Development',
    description: 'Machine learning models, NLP, and predictive analytics',
    icon: Cpu,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    title: 'Cloud Infrastructure',
    description: 'AWS, Kubernetes, Docker, and scalable architectures',
    icon: Cloud,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    title: 'Data Engineering',
    description: 'Data pipelines, ETL processes, and data warehousing',
    icon: Database,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    size: 'col-span-2 row-span-1',
  },
  {
    id: 5,
    title: 'DevOps',
    description: 'CI/CD, infrastructure as code, and automation',
    icon: Terminal,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    size: 'col-span-1 row-span-2',
  },
  {
    id: 6,
    title: 'Security',
    description: 'Network security, compliance, and threat detection',
    icon: Shield,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 7,
    title: 'Performance',
    description: 'System optimization, latency reduction, and scaling',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 8,
    title: 'Analytics',
    description: 'Business intelligence, metrics, and reporting',
    icon: BarChart3,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-100',
    size: 'col-span-2 row-span-1',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    } as const,
  },
}

export default function SkillsSectionNew() {
  return (
    <section id="skills" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4 text-futuristic-text">
          Technical Skills
        </h2>
        <p className="font-space-grotesk text-lg text-futuristic-text-muted max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise across multiple domains
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.id}
              className={`glass-card ${skill.size} p-6 flex flex-col`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${skill.bgColor} ${skill.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-space-grotesk font-medium px-3 py-1 bg-white/50 rounded-full text-futuristic-text-muted">
                  {skill.size.includes('row-span-2') ? 'Advanced' : 'Core'}
                </div>
              </div>
              
              <h3 className="font-archivo text-xl font-bold mb-2 text-futuristic-text">
                {skill.title}
              </h3>
              
              <p className="font-space-grotesk text-futuristic-text-muted text-sm leading-relaxed flex-grow">
                {skill.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-white/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-space-grotesk text-futuristic-text-muted">
                    Proficiency
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`w-2 h-2 rounded-full ${
                          dot <= (skill.id % 5) + 1
                            ? 'bg-futuristic-blue'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="font-space-grotesk text-futuristic-text-muted max-w-3xl mx-auto">
          Each skill represents years of hands-on experience and continuous learning in rapidly evolving technology landscapes.
        </p>
      </motion.div>
    </section>
  )
}