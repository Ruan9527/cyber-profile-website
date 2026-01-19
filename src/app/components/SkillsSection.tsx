'use client'


import { Code, Database, Palette, Cpu } from 'lucide-react'
import { Skill } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

const skills: Skill[] = [
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Node.js", level: 75, category: "backend" },
  { name: "Python", level: 70, category: "backend" },
  { name: "Tailwind CSS", level: 85, category: "design" },
  { name: "Framer Motion", level: 75, category: "design" },
]

const categoryIcons = {
  frontend: Code,
  backend: Database,
  design: Palette,
  other: Cpu,
}

const categoryStyles = {
  frontend: {
    bg: 'bg-cyber-cyan/15',
    border: 'border-cyber-cyan/60',
    text: 'text-cyber-cyan',
    gradient: 'from-cyber-cyan to-cyber-cyan/80',
    iconBg: 'bg-cyber-cyan/15',
    iconBorder: 'border-cyber-cyan/60',
    glowShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
    textGlow: '0 0 15px rgba(0, 240, 255, 0.4)',
    progressBorder: 'border-cyber-cyan/40',
    progressShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
    cardVariant: 'cyber-card-variant-cyan',
  },
  backend: {
    bg: 'bg-cyber-red/15',
    border: 'border-cyber-red/60',
    text: 'text-cyber-red',
    gradient: 'from-cyber-red to-cyber-red/80',
    iconBg: 'bg-cyber-red/15',
    iconBorder: 'border-cyber-red/60',
    glowShadow: '0 0 15px rgba(255, 0, 60, 0.3)',
    textGlow: '0 0 15px rgba(255, 0, 60, 0.4)',
    progressBorder: 'border-cyber-red/40',
    progressShadow: '0 0 10px rgba(255, 0, 60, 0.5)',
    cardVariant: 'cyber-card-variant-red',
  },
  design: {
    bg: 'bg-cyber-yellow/15',
    border: 'border-cyber-yellow/60',
    text: 'text-cyber-yellow',
    gradient: 'from-cyber-yellow to-cyber-yellow/80',
    iconBg: 'bg-cyber-yellow/15',
    iconBorder: 'border-cyber-yellow/60',
    glowShadow: '0 0 15px rgba(252, 238, 10, 0.3)',
    textGlow: '0 0 15px rgba(252, 238, 10, 0.4)',
    progressBorder: 'border-cyber-yellow/40',
    progressShadow: '0 0 10px rgba(252, 238, 10, 0.5)',
    cardVariant: 'cyber-card-variant-yellow',
  },
  other: {
    bg: 'bg-cyber-gray/15',
    border: 'border-cyber-gray/60',
    text: 'text-cyber-gray',
    gradient: 'from-cyber-gray to-cyber-gray/80',
    iconBg: 'bg-cyber-gray/15',
    iconBorder: 'border-cyber-gray/60',
    glowShadow: '0 0 15px rgba(45, 45, 45, 0.3)',
    textGlow: '0 0 15px rgba(45, 45, 45, 0.4)',
    progressBorder: 'border-cyber-gray/40',
    progressShadow: '0 0 10px rgba(45, 45, 45, 0.5)',
    cardVariant: 'cyber-card-variant-gray',
  },
}

export default function SkillsSection() {
  const { t } = useLanguage()

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const getLevelDescription = (level: number) => {
    if (level >= 90) return 'Expert'
    if (level >= 70) return 'Advanced'
    if (level >= 50) return 'Intermediate'
    return 'Beginner'
  }

  return (
     <section id="skills" className="py-16 px-4 relative bg-gradient-to-b from-cyber-black to-cyber-gray/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
          <span className="text-cyber-cyan">{t('skills.title')}</span>
        </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            const styles = categoryStyles[category as keyof typeof categoryStyles]
            
            return (
              <div key={category} className={`cyber-card ${styles.cardVariant} group`}>
                 <div className="flex items-center gap-3 mb-5">
                    <div className={`p-3 ${styles.iconBg} border-2 ${styles.iconBorder} rounded-lg group-hover:scale-110 transition-transform`}
                         style={{ boxShadow: styles.glowShadow }}>
                      <Icon className={`w-6 h-6 ${styles.text}`} />
                   </div>
                    <h3 className={`font-display text-xl font-bold ${styles.text} capitalize`}
                        style={{ textShadow: styles.textGlow }}>
                     {category}
                   </h3>
                 </div>

                 <div className="space-y-3">
                    {categorySkills.map((skill, index) => (
                     <div
                       key={skill.name}
                         className="relative cyber-tooltip animate-fade-in-up" data-tooltip={`${skill.name}: ${skill.level}% - ${getLevelDescription(skill.level)}`} style={{ animationDelay: `${index * 100}ms` }}
                     >
                       <div className="flex justify-between items-center mb-2">
                         <span className="font-mono-tech text-white/70 text-sm uppercase tracking-wider">
                           {skill.name}
                         </span>
                          <span className={`font-bold ${styles.text}`}
                                style={{ textShadow: styles.textGlow }}>
                           {skill.level}%
                         </span>
                       </div>

                        <div className={`relative h-3 bg-cyber-black/50 border ${styles.progressBorder} overflow-hidden cyber-clip cyber-progress-3d`}>
                         <div
                           className={`h-full bg-gradient-to-r ${styles.gradient} transition-all duration-1000 ease-out relative overflow-hidden progress-fill`}
                            style={{
                              width: `${skill.level}%`,
                               boxShadow: styles.progressShadow
                            }}
                         >
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                         </div>
                       </div>


                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

         {/* Skill Stats */}
         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="cyber-card text-center p-4 group hover:scale-105 transition-transform">
             <div className="text-3xl font-bold text-cyber-cyan mb-1 group-hover:scale-110 transition-transform"
                 style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.6)' }}>
               10+
             </div>
             <div className="text-xs text-white/70 uppercase tracking-wider">
               {t('skills.years_experience')}
             </div>
           </div>
           <div className="cyber-card text-center p-4 group hover:scale-105 transition-transform">
             <div className="text-3xl font-bold text-cyber-yellow mb-1 group-hover:scale-110 transition-transform"
                 style={{ textShadow: '0 0 20px rgba(252, 238, 10, 0.6)' }}>
               50+
             </div>
             <div className="text-xs text-white/70 uppercase tracking-wider">
               {t('skills.projects_completed')}
             </div>
           </div>
           <div className="cyber-card text-center p-4 group hover:scale-105 transition-transform">
             <div className="text-3xl font-bold text-cyber-red mb-1 group-hover:scale-110 transition-transform"
                 style={{ textShadow: '0 0 20px rgba(255, 0, 60, 0.6)' }}>
               30+
             </div>
             <div className="text-xs text-white/70 uppercase tracking-wider">
               {t('skills.happy_clients')}
             </div>
           </div>
           <div className="cyber-card text-center p-4 group hover:scale-105 transition-transform">
             <div className="text-3xl font-bold text-cyber-gray mb-1 group-hover:scale-110 transition-transform"
                 style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}>
               8+
             </div>
             <div className="text-xs text-white/70 uppercase tracking-wider">
               {t('skills.technologies')}
             </div>
           </div>
         </div>
      </div>
    </section>
  )
}