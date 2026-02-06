'use client'

import { Server, Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSkills } from '@/hooks'
import { SkillsSkeleton } from '@/components/Skeleton'
import { SkillsError } from '@/components/SectionError'

const categoryIcons = {
  it_ops: Server,
  ai: Brain,
}

const categoryStyles = {
  it_ops: {
    bg: 'bg-cyber-cyan/15',
    border: 'border-cyber-cyan/60',
    text: 'text-cyber-cyan',
    gradient: 'from-cyber-cyan to-cyber-cyan/80',
    cardVariant: 'cyber-card-variant-cyan',
  },
  ai: {
    bg: 'bg-cyber-purple/15',
    border: 'border-cyber-purple/60',
    text: 'text-cyber-purple',
    gradient: 'from-cyber-purple to-cyber-purple/80',
    cardVariant: 'cyber-card-variant-purple',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

export default function SkillsSection() {
  const { t } = useLanguage()

  const { skills, skillsByCategory, loading, error, refetch } = useSkills({
    autoFetch: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  })

  const getLevelDescription = (level: number) => {
    if (level >= 90) return 'Expert'
    if (level >= 70) return 'Advanced'
    if (level >= 50) return 'Intermediate'
    return 'Beginner'
  }

  const categoryLabels = {
    it_ops: 'IT运维',
    ai: '人工智能',
  }

  const stats = [
    { value: '10+', label: t('skills.years_experience'), color: 'text-cyber-cyan' },
    { value: '50+', label: t('skills.projects_completed'), color: 'text-cyber-yellow' },
    { value: '30+', label: t('skills.happy_clients'), color: 'text-cyber-red' },
    { value: '8+', label: t('skills.technologies'), color: 'text-cyber-purple' },
  ]

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black" />
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">我的</span>
          <span className="text-cyber-cyan">技能</span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          专注于IT运维自动化和AI技术应用，持续学习和成长的技术专家
        </motion.p>

        {loading && <SkillsSkeleton />}

        {error && <SkillsError onRetry={() => refetch()} />}

        {!loading && !error && Object.keys(skillsByCategory).length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70">暂无技能数据</p>
          </div>
        )}

        {!loading && !error && Object.keys(skillsByCategory).length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons]
              const styles = categoryStyles[category as keyof typeof categoryStyles]

              return (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className={`cyber-card ${styles.cardVariant} group hover-lift`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 ${styles.bg} border-2 ${styles.border} rounded-xl group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${styles.text}`} />
                    </div>
                    <h3 className={`font-display text-xl font-bold ${styles.text}`}>
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono-tech text-white/80 text-sm uppercase tracking-wider">
                            {skill.name}
                          </span>
                          <span className={`font-bold ${styles.text}`}>
                            {skill.level}%
                          </span>
                        </div>

                        <div className="relative h-3 bg-cyber-black/50 border border-cyber-gray/30 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${styles.gradient} rounded-full relative overflow-hidden`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="cyber-card text-center group hover-lift"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
