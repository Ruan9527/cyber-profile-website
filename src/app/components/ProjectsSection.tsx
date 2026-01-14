'use client'

import Image from 'next/image'
import { ExternalLink, Github, Code, Zap, Database, Palette } from 'lucide-react'
import { Project } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

const projects: Project[] = [
  {
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration and cyberpunk UI design. Features include real-time messaging, AI-powered responses, and a futuristic interface.",
    image: "/placeholder-project1.jpg.svg",
    tech: ["React", "Node.js", "OpenAI", "Tailwind CSS"],
    link: "https://github.com/project1"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack online shopping platform with modern design, secure payments, inventory management, and analytics dashboard for sellers.",
    image: "/placeholder-project2.jpg.svg",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Supabase"],
    link: "https://github.com/project2"
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive data visualization tool with real-time updates, custom charts, and predictive analytics for business intelligence.",
    image: "/placeholder-project3.jpg.svg",
    tech: ["D3.js", "Python", "FastAPI", "WebSocket"],
    link: "https://github.com/project3"
  },
  {
    title: "Cyberpunk Portfolio",
    description: "A futuristic personal portfolio website with glitch effects, neon animations, and interactive elements inspired by cyberpunk aesthetics.",
    image: "/placeholder-project4.jpg",
    tech: ["Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
    link: "https://github.com/project4"
  },
  {
    title: "Mobile Game Engine",
    description: "Lightweight 2D game engine for mobile browsers with physics simulation, collision detection, and sprite animation system.",
    image: "/placeholder-project5.jpg",
    tech: ["JavaScript", "Canvas API", "WebGL", "Physics Engine"],
    link: "https://github.com/project5"
  },
  {
    title: "Blockchain Explorer",
    description: "Real-time blockchain data explorer with transaction tracking, wallet analysis, and smart contract interaction capabilities.",
    image: "/placeholder-project6.jpg",
    tech: ["React", "Web3.js", "Ethereum", "GraphQL"],
    link: "https://github.com/project6"
  }
]

const techIcons = {
  'JavaScript': Code,
  'React': Code,
  'Node.js': Database,
  'Python': Database,
  'Next.js': Zap,
  'Tailwind CSS': Palette,
}

const getTechColor = (tech: string) => {
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
  }
  return colors[tech] || 'cyber-gray'
}

export default function ProjectsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
          <span className="text-cyber-cyan">{t('projects.title')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="cyber-card group relative overflow-hidden cursor-pointer"

            >
              {/* Project Image */}
              <div className="relative h-64 mb-6 overflow-hidden cyber-clip bg-cyber-gray/20 group-hover:border-cyber-cyan/60 transition-all duration-300"
                   style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)' }}>
                 <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/90 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-cyber-cyan/30 border border-cyber-cyan/60 rounded-lg hover:bg-cyber-cyan/50 transition-all duration-300 hover:scale-110"
                    style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}
                  >
                    <Github className="w-5 h-5 text-cyber-cyan" />
                  </a>
                  <div className="p-3 bg-cyber-yellow/30 border border-cyber-yellow/60 rounded-lg hover:bg-cyber-yellow/50 transition-all duration-300 hover:scale-110"
                       style={{ boxShadow: '0 0 10px rgba(252, 238, 10, 0.3)' }}>
                    <ExternalLink className="w-5 h-5 text-cyber-yellow" />
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-cyber-cyan group-hover:text-cyber-yellow transition-colors"
                    style={{ textShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}>
                  {project.title}
                </h3>

                <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-bold bg-cyber-cyan/20 border border-cyber-cyan/50 uppercase tracking-wider hover:bg-cyber-cyan/30 transition-all duration-300`}
                      style={{
                        backgroundColor: `var(--${getTechColor(tech)})25`,
                        borderColor: `var(--${getTechColor(tech)})60`,
                        color: `var(--${getTechColor(tech)})`,
                        boxShadow: `0 0 10px rgba(0, 240, 255, 0.1)`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>


            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <button className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow">
            {t('projects.view_all')}
          </button>
        </div>
      </div>
    </section>
  )
}