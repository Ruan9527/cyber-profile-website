'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSkills } from '@/hooks'
import { SkillsSkeleton } from '@/components/Skeleton'
import { SkillsError } from '@/components/SectionError'
import { Skill } from '@/types'



const categoryConfig = {
  it_ops: {
    name: '技术基础',
    subtitle: '数据库、Linux与开发基础',
    color: 'cyan',
    accent: 'cyber-cyan',
    dim: 'cyber-cyan-40',
  },
  ai: {
    name: 'AI技能',
    subtitle: '人工智能与机器学习',
    color: 'purple',
    accent: 'cyber-purple',
    dim: 'cyber-purple-40',
  },
  project_management: {
    name: '项目管理',
    subtitle: 'PMP认证、团队与沟通',
    color: 'orange',
    accent: 'cyber-orange',
    dim: 'cyber-orange-40',
  },
  healthcare_it: {
    name: '医疗信息化',
    subtitle: 'HIS/EMR、支付对接与线上服务',
    color: 'green',
    accent: 'cyber-green',
    dim: 'cyber-green-40',
  },
}

const getLevelBadge = (level: number) => {
  if (level >= 90) return '专家'
  if (level >= 70) return '高级'
  if (level >= 50) return '中级'
  return '初级'
}

const getLevelColor = (level: number) => {
  if (level >= 90) return 'text-cyber-cyan'
  if (level >= 70) return 'text-cyber-green'
  return 'text-cyber-yellow'
}

interface SkillsGridProps {
  skills: Skill[]
  color: string
  accent: string
  dim: string
  maxItems?: number
}

function SkillsGrid({ skills, color, accent, dim, maxItems }: SkillsGridProps) {
  const displaySkills = maxItems ? skills.slice(0, maxItems) : skills
  const remaining = skills.length - (maxItems || 0)

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {displaySkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group relative bg-cyber-black/40 border border-white/5 rounded-xl p-4 cursor-pointer transition-all duration-250 hover:border-${accent}/30 hover:bg-cyber-black/60 hover:-translate-y-0.5`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-cyber-white text-sm font-medium">{skill.name}</span>
              <span className={`${dim} text-xs font-semibold tabular-nums`}>{skill.level}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                className={`h-full bg-${accent} rounded-full`}
              />
            </div>
            <div className="max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-20">
              <div className="pt-3">
                <p className="text-white/50 text-xs leading-relaxed">{skill.description}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium bg-${accent}/10 text-${dim}`}>
                  {getLevelBadge(skill.level)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  category: keyof typeof categoryConfig
  skills: Skill[]
}

function SkillsModal({ isOpen, onClose, category, skills }: ModalProps) {
  const config = categoryConfig[category]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className={`bg-cyber-gray/95 border border-${config.accent}/30 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl shadow-${config.accent}/20`}>
              <div className={`flex items-center justify-between p-5 border-b border-white/5`}>
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full bg-${config.accent}`} />
                  <div>
                    <h3 className="text-cyber-white font-medium">{config.name}</h3>
                    <p className="text-white/50 text-xs">{config.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-cyber-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-5 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`bg-cyber-black/40 border border-white/5 rounded-xl p-4 hover:border-${config.accent}/30 transition-all`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-cyber-white text-sm font-medium">{skill.name}</span>
                        <span className={`${config.dim} text-xs font-semibold`}>{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                        <div
                          className={`h-full bg-${config.accent} rounded-full transition-all duration-500`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-white/45 text-xs leading-relaxed line-clamp-1">{skill.description}</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium bg-${config.accent}/10 text-${config.dim} ml-2 shrink-0`}>
                          {getLevelBadge(skill.level)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function SkillsSection() {
  const { t } = useLanguage()
  const { skillsByCategory, loading, error, refetch } = useSkills({ autoFetch: true })
  const [modalState, setModalState] = useState<{ isOpen: boolean; category: keyof typeof categoryConfig }>({
    isOpen: false,
    category: 'it_ops',
  })

  const openModal = (category: keyof typeof categoryConfig) => {
    setModalState({ isOpen: true, category })
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  const categories = ['it_ops', 'ai', 'project_management', 'healthcare_it'] as const

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-cyber-gray/5 to-cyber-black" />
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.03]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-cyber-white mb-2">
            技能概览
          </h2>
          <p className="text-cyber-text-secondary text-sm">悬停卡片查看详情，点击查看更多</p>
        </motion.div>

        {loading && <SkillsSkeleton />}

        {error && <SkillsError onRetry={() => refetch()} />}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, catIndex) => {
              const config = categoryConfig[category]
              const categorySkills = skillsByCategory[category] || []
              const hasSkills = categorySkills.length > 0

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="bg-cyber-gray/20 border border-white/5 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                    <span className={`w-3 h-3 rounded-full bg-${config.accent}`} />
                    <div>
                      <h3 className="text-cyber-white font-medium">{config.name}</h3>
                      <p className="text-white/45 text-xs">{config.subtitle}</p>
                    </div>
                  </div>

                  {hasSkills ? (
                    <>
                      <SkillsGrid
                        skills={categorySkills}
                        color={config.color}
                        accent={config.accent}
                        dim={config.dim}
                        maxItems={4}
                      />
                      {categorySkills.length > 4 && (
                        <button
                          onClick={() => openModal(category)}
                          className={`mt-4 w-full py-2.5 px-4 rounded-xl border border-dashed border-white/10 text-white/50 text-xs hover:text-cyber-white hover:border-${config.accent}/40 hover:bg-${config.accent}/5 transition-all flex items-center justify-center gap-1.5 group`}
                        >
                          <span>+{categorySkills.length - 4} 项</span>
                          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/40 text-sm">暂无技能数据</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      <SkillsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        category={modalState.category}
        skills={skillsByCategory[modalState.category] || []}
      />
    </section>
  )
}
