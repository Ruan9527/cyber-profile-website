'use client'

import { useState } from 'react'
import { ExternalLink, Github, Code, Zap, Database, Palette } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import { useProjects } from '@/hooks'
import { ProjectsSkeleton } from '@/components/Skeleton'
import { ProjectsError } from '@/components/SectionError'

const techIcons: Record<string, typeof Code> = {
  'JavaScript': Code,
  'React': Code,
  'Node.js': Database,
  'Python': Database,
  'Next.js': Zap,
  'Tailwind CSS': Palette,
}

const getTechColor = (tech: string): string => {
  const colors: Record<string, string> = {
    'JavaScript': 'cyber-yellow',
    'React': 'cyber-cyan',
    'Node.js': 'cyber-green',
    'Python': 'cyber-blue',
    'Next.js': 'cyber-black',
    'Tailwind CSS': 'cyber-red',
    'TypeScript': 'cyber-blue',
    'PostgreSQL': 'cyber-yellow',
    'OpenAI': 'cyber-cyan',
    'Stripe': 'cyber-purple',
    'D3.js': 'cyber-orange',
    'Kubernetes': 'cyber-blue',
    'Docker': 'cyber-cyan',
    'AWS': 'cyber-orange',
    'TensorFlow': 'cyber-purple',
    'FastAPI': 'cyber-green',
    'Apache Airflow': 'cyber-yellow',
    'Kafka': 'cyber-red',
    'Terraform': 'cyber-blue',
    'Ansible': 'cyber-gray',
    'GitHub Actions': 'cyber-purple',
    'MLflow': 'cyber-pink',
    'Nmap': 'cyber-red',
    'ELK Stack': 'cyber-orange',
    'MongoDB': 'cyber-green',
    'Helm': 'cyber-cyan',
    'Prometheus': 'cyber-red',
    'Grafana': 'cyber-purple',
    'Redis': 'cyber-red',
    'Snowflake': 'cyber-blue',
    'GitLab CI': 'cyber-orange',
  }
  return colors[tech] || 'cyber-gray'
}

const categoryStyles = {
  it_ops: {
    bg: 'bg-cyber-cyan/15',
    border: 'border-cyber-cyan/60',
    text: 'text-cyber-cyan',
    gradient: 'from-cyber-cyan to-cyber-cyan/80',
    cardVariant: 'cyber-card-variant-cyan',
    glowShadow: '0 0 15px rgba(102, 224, 255, 0.3)',
  },
  ai: {
    bg: 'bg-cyber-purple/15',
    border: 'border-cyber-purple/60',
    text: 'text-cyber-purple',
    gradient: 'from-cyber-purple to-cyber-purple/80',
    cardVariant: 'cyber-card-variant-purple',
    glowShadow: '0 0 15px rgba(209, 153, 255, 0.3)',
  },
  data: {
    bg: 'bg-cyber-orange/15',
    border: 'border-cyber-orange/60',
    text: 'text-cyber-orange',
    gradient: 'from-cyber-orange to-cyber-orange/80',
    cardVariant: 'cyber-card-variant-orange',
    glowShadow: '0 0 15px rgba(255, 153, 102, 0.3)',
  },
  backend: {
    bg: 'bg-cyber-red/15',
    border: 'border-cyber-red/60',
    text: 'text-cyber-red',
    gradient: 'from-cyber-red to-cyber-red/80',
    cardVariant: 'cyber-card-variant-red',
    glowShadow: '0 0 15px rgba(255, 102, 128, 0.3)',
  },
  fullstack: {
    bg: 'bg-cyber-yellow/15',
    border: 'border-cyber-yellow/60',
    text: 'text-cyber-yellow',
    gradient: 'from-cyber-yellow to-cyber-yellow/80',
    cardVariant: 'cyber-card-variant-yellow',
    glowShadow: '0 0 15px rgba(255, 242, 102, 0.3)',
  },
  healthcare_it: {
    bg: 'bg-cyber-pink/15',
    border: 'border-cyber-pink/60',
    text: 'text-cyber-pink',
    gradient: 'from-cyber-pink to-cyber-pink/80',
    cardVariant: 'cyber-card-variant-pink',
    glowShadow: '0 0 15px rgba(255, 102, 204, 0.3)',
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

export default function ProjectsSection() {
  const { t } = useLanguage()
  const [showAll, setShowAll] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const { projects: allProjects, loading, error, refetch } = useProjects({
    autoFetch: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  })

  const categories = [
    { id: 'all', label: t('projects.filter_all') || '全部' },
    { id: 'it_ops', label: t('projects.filter_it_ops') || 'IT运维' },
    { id: 'ai', label: t('projects.filter_ai') || 'AI' },
    { id: 'data', label: t('projects.filter_data') || 'Data' },
    { id: 'backend', label: t('projects.filter_backend') || 'Backend' },
    { id: 'fullstack', label: t('projects.filter_fullstack') || '全栈' },
    { id: 'healthcare_it', label: t('projects.filter_healthcare_it') || '医疗信息化' },
  ]

  const filteredProjects = allProjects.filter(project =>
    activeCategory === 'all' || project.category === activeCategory
  )

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black" />
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">我的</span>
          <span className="text-cyber-cyan">项目</span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          探索我参与和主导的技术项目，展示IT运维和AI领域的实践经验
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setShowAll(false)
              }}
              className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full border-2 ${
                activeCategory === category.id
                  ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-cyber'
                  : 'bg-cyber-black/50 border-cyber-gray/40 text-white/70 hover:border-cyber-cyan/60 hover:text-cyber-cyan'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {loading && <ProjectsSkeleton />}

        {error && <ProjectsError onRetry={() => refetch()} />}

        {!loading && !error && displayedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70">暂无项目数据</p>
          </div>
        )}

        {!loading && !error && displayedProjects.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {displayedProjects.map((project, index) => {
                const styles = project.category ? categoryStyles[project.category] : categoryStyles.it_ops

                return (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    className="group relative"
                  >
                    <div className={`cyber-card ${styles.cardVariant} h-full overflow-hidden hover-lift`}>
                      <div className="relative h-48 mb-5 overflow-hidden rounded-xl">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-80" />

                        <motion.div
                          className="absolute top-3 right-3 flex gap-2"
                          initial={{ opacity: 0, x: 20 }}
                          whileHover={{ opacity: 1, x: 0 }}
                        >
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 ${styles.bg} border ${styles.border} rounded-lg hover:scale-110 transition-all`}
                            style={{ boxShadow: styles.glowShadow }}
                            whileHover={{ rotate: 360 }}
                          >
                            <Github className={`w-5 h-5 ${styles.text}`} />
                          </motion.a>
                          <div className={`p-3 ${styles.bg} border ${styles.border} rounded-lg hover:scale-110 transition-all`}
                               style={{ boxShadow: styles.glowShadow }}>
                            <ExternalLink className={`w-5 h-5 ${styles.text}`} />
                          </div>
                        </motion.div>
                      </div>

                      <h3 className={`font-display text-xl font-bold ${styles.text} mb-3`}>
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech) => {
                          const Icon = techIcons[tech] || Code
                          const colorClass = getTechColor(tech)
                          return (
                            <span
                              key={tech}
                              className={`px-3 py-1 text-xs font-bold ${styles.bg} border ${styles.border} uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform`}
                            >
                              <Icon className={`w-3 h-3 ${colorClass}`} />
                              {tech}
                            </span>
                          )
                        })}
                        {project.tech.length > 4 && (
                          <span className="px-3 py-1 text-xs font-bold bg-cyber-gray/20 border border-cyber-gray/50 text-white/70 rounded">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {allProjects.length > 6 && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="cyber-button cyber-button-variant-cyan flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {showAll ? t('projects.show_less') : t('projects.view_more')}
              <ExternalLink className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
