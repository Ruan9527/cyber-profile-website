'use client'

import { useState } from 'react'
import { ExternalLink, Github, Code, Zap, Database, Palette } from 'lucide-react'
import { Project } from '@/types'

const projects: Project[] = [
  {
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration and cyberpunk UI design. Features include real-time messaging, AI-powered responses, and a futuristic interface.",
    image: "/placeholder-project1.jpg",
    tech: ["React", "Node.js", "OpenAI", "Tailwind CSS"],
    link: "https://github.com/project1"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack online shopping platform with modern design, secure payments, inventory management, and analytics dashboard for sellers.",
    image: "/placeholder-project2.jpg",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Supabase"],
    link: "https://github.com/project2"
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive data visualization tool with real-time updates, custom charts, and predictive analytics for business intelligence.",
    image: "/placeholder-project3.jpg",
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
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-cyber-black to-cyber-gray/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 glitch-effect" data-text="FEATURED PROJECTS">
          <span className="text-cyber-cyan">FEATURED PROJECTS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="cyber-card group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 mb-6 overflow-hidden cyber-clip bg-cyber-gray/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {hoveredProject === project.title && (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50 animate-glitch-img-1"
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 animate-glitch-img-2"
                    />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-cyber-cyan/20 border border-cyber-cyan/50 rounded-lg hover:bg-cyber-cyan/30 transition-colors"
                  >
                    <Github className="w-4 h-4 text-cyber-cyan" />
                  </a>
                  <div className="p-2 bg-cyber-yellow/20 border border-cyber-yellow/50 rounded-lg hover:bg-cyber-yellow/30 transition-colors">
                    <ExternalLink className="w-4 h-4 text-cyber-yellow" />
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-cyber-cyan group-hover:text-cyber-yellow transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-cyber-gray leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-bold text-cyber-black bg-cyber-cyan/10 border border-cyber-cyan/30 uppercase tracking-wider`}
                      style={{
                        backgroundColor: `var(--${getTechColor(tech)})20`,
                        borderColor: `var(--${getTechColor(tech)})50`,
                        color: `var(--${getTechColor(tech)})`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              {hoveredProject === project.title && (
                <div className="absolute inset-0 bg-cyber-cyan/5 border border-cyber-cyan/20 pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <button className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}