'use client'

import { useState } from 'react'
import { Code, Database, Palette, Cpu } from 'lucide-react'
import { Skill } from '@/types'

const skills: Skill[] = [
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Node.js", level: 75, category: "backend" },
  { name: "Python", level: 70, category: "backend" },
  { name: "Tailwind CSS", level: 85, category: "design" },
  { name: "Framer Motion", level: 75, category: "design" },
  { name: "PostgreSQL", level: 70, category: "backend" },
  { name: "Docker", level: 65, category: "other" },
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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 glitch-effect" data-text="TECH SKILLS">
          <span className="text-cyber-cyan">TECH SKILLS</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            const colorClass = categoryColors[category as keyof typeof categoryColors]
            
            return (
              <div key={category} className="cyber-card group">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-${colorClass}/10 border-2 border-${colorClass}/50 rounded-lg`}>
                    <Icon className={`w-6 h-6 text-${colorClass}`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-cyber-cyan capitalize">
                    {category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono-tech text-cyber-gray text-sm uppercase tracking-wider">
                          {skill.name}
                        </span>
                        <span className="font-bold text-cyber-yellow">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="relative h-3 bg-cyber-black/50 border border-cyber-cyan/30 overflow-hidden cyber-clip">
                        <div
                          className={`h-full bg-gradient-to-r from-cyber-cyan to-cyber-yellow transition-all duration-1000 ease-out relative overflow-hidden`}
                          style={{
                            width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </div>
                      </div>
                      
                      {hoveredSkill === skill.name && (
                        <div className="absolute -top-8 right-0 bg-cyber-cyan text-cyber-black px-2 py-1 text-xs font-bold cyber-clip z-10">
                          EXPERT LEVEL
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Skill Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="cyber-card text-center group">
            <div className="text-3xl font-bold text-cyber-cyan mb-2 glitch-effect" data-text="10+">
              10+
            </div>
            <div className="text-sm text-cyber-gray uppercase tracking-wider">
              Years Experience
            </div>
          </div>
          <div className="cyber-card text-center group">
            <div className="text-3xl font-bold text-cyber-yellow mb-2 glitch-effect" data-text="50+">
              50+
            </div>
            <div className="text-sm text-cyber-gray uppercase tracking-wider">
              Projects Completed
            </div>
          </div>
          <div className="cyber-card text-center group">
            <div className="text-3xl font-bold text-cyber-red mb-2 glitch-effect" data-text="30+">
              30+
            </div>
            <div className="text-sm text-cyber-gray uppercase tracking-wider">
              Happy Clients
            </div>
          </div>
          <div className="cyber-card text-center group">
            <div className="text-3xl font-bold text-cyber-gray mb-2 glitch-effect" data-text="15+">
              15+
            </div>
            <div className="text-sm text-cyber-gray uppercase tracking-wider">
              Technologies
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}