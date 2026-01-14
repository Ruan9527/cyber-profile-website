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

const categoryColors = {
  frontend: 'cyber-cyan',
  backend: 'cyber-red',
  design: 'cyber-yellow',
  other: 'cyber-gray',
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
            const colorClass = categoryColors[category as keyof typeof categoryColors]
            
            return (
              <div key={category} className="cyber-card group">
                 <div className="flex items-center gap-3 mb-5">
                   <div className={`p-3 bg-${colorClass}/15 border-2 border-${colorClass}/60 rounded-lg group-hover:scale-110 transition-transform`}
                        style={{ boxShadow: `0 0 15px rgba(0, 240, 255, 0.3)` }}>
                     <Icon className={`w-6 h-6 text-${colorClass}`} />
                   </div>
                   <h3 className="font-display text-xl font-bold text-cyber-cyan capitalize"
                       style={{ textShadow: '0 0 15px rgba(0, 240, 255, 0.4)' }}>
                     {category}
                   </h3>
                 </div>

                 <div className="space-y-3">
                   {categorySkills.map((skill) => (
                     <div
                       key={skill.name}
                       className="relative"
                     >
                       <div className="flex justify-between items-center mb-2">
                         <span className="font-mono-tech text-white/70 text-sm uppercase tracking-wider">
                           {skill.name}
                         </span>
                         <span className="font-bold text-cyber-yellow"
                               style={{ textShadow: '0 0 10px rgba(252, 238, 10, 0.3)' }}>
                           {skill.level}%
                         </span>
                       </div>

                       <div className="relative h-3 bg-cyber-black/50 border border-cyber-cyan/40 overflow-hidden cyber-clip">
                         <div
                           className={`h-full bg-gradient-to-r from-cyber-cyan to-cyber-yellow transition-all duration-1000 ease-out relative overflow-hidden`}
                            style={{
                              width: `${skill.level}%`,
                              boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
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