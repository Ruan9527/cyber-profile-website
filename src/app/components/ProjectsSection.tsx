'use client'

import { useState } from 'react'
import { ExternalLink, Github, Code, Zap, Database, Palette, ChevronDown } from 'lucide-react'
import { Project } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder'

const allProjects: Project[] = [
  {
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration and cyberpunk UI design. Features include real-time messaging, AI-powered responses, and a futuristic interface.",
    image: "/placeholder-project1.jpg",
    tech: ["React", "Node.js", "OpenAI", "Tailwind CSS"],
    link: "https://github.com/project1",
    category: 'ai'
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack online shopping platform with modern design, secure payments, inventory management, and analytics dashboard for sellers.",
    image: "/placeholder-project2.jpg",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Supabase"],
    link: "https://github.com/project2",
    category: 'fullstack'
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive data visualization tool with real-time updates, custom charts, and predictive analytics for business intelligence.",
    image: "/placeholder-project3.jpg",
    tech: ["D3.js", "Python", "FastAPI", "WebSocket"],
    link: "https://github.com/project3",
    category: 'data'
  },
  {
    title: "Cyberpunk Portfolio",
    description: "A futuristic personal portfolio website with glitch effects, neon animations, and interactive elements inspired by cyberpunk aesthetics.",
    image: "/placeholder-project4.jpg",
    tech: ["Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
    link: "https://github.com/project4",
    category: 'design'
  },
  {
    title: "Mobile Game Engine",
    description: "Lightweight 2D game engine for mobile browsers with physics simulation, collision detection, and sprite animation system.",
    image: "/placeholder-project5.jpg",
    tech: ["JavaScript", "Canvas API", "WebGL", "Physics Engine"],
    link: "https://github.com/project5",
    category: 'game'
  },
  {
    title: "Blockchain Explorer",
    description: "Real-time blockchain data explorer with transaction tracking, wallet analysis, and smart contract interaction capabilities.",
    image: "/placeholder-project6.jpg",
    tech: ["React", "Web3.js", "Ethereum", "GraphQL"],
    link: "https://github.com/project6",
    category: 'blockchain'
  },
  {
    title: "Weather App",
    description: "Modern weather application with real-time data, beautiful animations, and location-based forecasts.",
    image: "/placeholder-project1.jpg",
    tech: ["React", "OpenWeather API", "TypeScript"],
    link: "https://github.com/project7",
    category: 'frontend'
  },
  {
    title: "Task Management",
    description: "Collaborative task management tool with real-time updates, team features, and project analytics.",
    image: "/placeholder-project2.jpg",
    tech: ["Next.js", "Supabase", "Tailwind CSS"],
    link: "https://github.com/project8",
    category: 'fullstack'
  },
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

const categoryStyles = {
  frontend: {
    bg: 'bg-cyber-cyan/15',
    border: 'border-cyber-cyan/60',
    text: 'text-cyber-cyan',
    gradient: 'from-cyber-cyan to-cyber-cyan/80',
    cardVariant: 'cyber-card-variant-cyan',
    glowShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
    textGlow: '0 0 15px rgba(0, 240, 255, 0.4)',
  },
  backend: {
    bg: 'bg-cyber-red/15',
    border: 'border-cyber-red/60',
    text: 'text-cyber-red',
    gradient: 'from-cyber-red to-cyber-red/80',
    cardVariant: 'cyber-card-variant-red',
    glowShadow: '0 0 15px rgba(255, 0, 60, 0.3)',
    textGlow: '0 0 15px rgba(255, 0, 60, 0.4)',
  },
  fullstack: {
    bg: 'bg-cyber-yellow/15',
    border: 'border-cyber-yellow/60',
    text: 'text-cyber-yellow',
    gradient: 'from-cyber-yellow to-cyber-yellow/80',
    cardVariant: 'cyber-card-variant-yellow',
    glowShadow: '0 0 15px rgba(252, 238, 10, 0.3)',
    textGlow: '0 0 15px rgba(252, 238, 10, 0.4)',
  },
  ai: {
    bg: 'bg-cyber-purple/15',
    border: 'border-cyber-purple/60',
    text: 'text-cyber-purple',
    gradient: 'from-cyber-purple to-cyber-purple/80',
    cardVariant: 'cyber-card-variant-purple',
    glowShadow: '0 0 15px rgba(185, 103, 255, 0.3)',
    textGlow: '0 0 15px rgba(185, 103, 255, 0.4)',
  },
  design: {
    bg: 'bg-cyber-green/15',
    border: 'border-cyber-green/60',
    text: 'text-cyber-green',
    gradient: 'from-cyber-green to-cyber-green/80',
    cardVariant: 'cyber-card-variant-green',
    glowShadow: '0 0 15px rgba(0, 255, 157, 0.3)',
    textGlow: '0 0 15px rgba(0, 255, 157, 0.4)',
  },
  data: {
    bg: 'bg-cyber-orange/15',
    border: 'border-cyber-orange/60',
    text: 'text-cyber-orange',
    gradient: 'from-cyber-orange to-cyber-orange/80',
    cardVariant: 'cyber-card-variant-orange',
    glowShadow: '0 0 15px rgba(255, 107, 53, 0.3)',
    textGlow: '0 0 15px rgba(255, 107, 53, 0.4)',
  },
  blockchain: {
    bg: 'bg-cyber-blue/15',
    border: 'border-cyber-blue/60',
    text: 'text-cyber-blue',
    gradient: 'from-cyber-blue to-cyber-blue/80',
    cardVariant: 'cyber-card-variant-blue',
    glowShadow: '0 0 15px rgba(45, 125, 255, 0.3)',
    textGlow: '0 0 15px rgba(45, 125, 255, 0.4)',
  },
  game: {
    bg: 'bg-cyber-pink/15',
    border: 'border-cyber-pink/60',
    text: 'text-cyber-pink',
    gradient: 'from-cyber-pink to-cyber-pink/80',
    cardVariant: 'cyber-card-variant-pink',
    glowShadow: '0 0 15px rgba(255, 45, 149, 0.3)',
    textGlow: '0 0 15px rgba(255, 45, 149, 0.4)',
  },
}

export default function ProjectsSection() {
  const { t } = useLanguage()
  const [showAll, setShowAll] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  
  const categories = [
    { id: 'all', label: t('projects.filter_all') || 'All' },
    { id: 'frontend', label: t('projects.filter_frontend') || 'Frontend' },
    { id: 'backend', label: t('projects.filter_backend') || 'Backend' },
    { id: 'fullstack', label: t('projects.filter_fullstack') || 'Full Stack' },
    { id: 'ai', label: t('projects.filter_ai') || 'AI' },
    { id: 'design', label: t('projects.filter_design') || 'Design' },
    { id: 'data', label: t('projects.filter_data') || 'Data' },
    { id: 'blockchain', label: t('projects.filter_blockchain') || 'Blockchain' },
    { id: 'game', label: t('projects.filter_game') || 'Game' },
  ]
  
  const filteredProjects = allProjects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  )
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)
  
  // Height variants for masonry layout - assign different heights based on index
  const getHeightVariant = (index: number) => {
    const variants = ['h-auto', 'h-auto', 'h-auto md:h-[520px]', 'h-auto md:h-[480px]', 'h-auto md:h-[500px]', 'h-auto md:h-[460px]']
    return variants[index % variants.length]
  }

  const getRowSpan = (index: number) => {
    const heightVariant = getHeightVariant(index)
    
    // Map height variants to row spans for masonry layout
    // Each grid row is 20px (auto-rows-[20px])
    if (heightVariant.includes('520px')) {
      return 'md:row-span-[26]' // 520px / 20px = 26 rows
    }
    if (heightVariant.includes('480px')) {
      return 'md:row-span-[24]' // 480px / 20px = 24 rows
    }
    if (heightVariant.includes('500px')) {
      return 'md:row-span-[25]' // 500px / 20px = 25 rows
    }
    if (heightVariant.includes('460px')) {
      return 'md:row-span-[23]' // 460px / 20px = 23 rows
    }
    
    // For h-auto variants (mobile), no row-span needed for single column layout
    return ''
  }

  return (
      <section className="py-16 px-4 relative bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black">
       <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-8"
              style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
            <span className="text-cyber-cyan">{t('projects.title')}</span>
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setShowAll(false)
                }}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 border-2 rounded-lg ${
                  activeCategory === category.id 
                    ? 'bg-cyber-cyan/30 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.5)]' 
                    : 'bg-cyber-black/50 border-cyber-gray/40 text-white/70 hover:border-cyber-cyan/60 hover:text-cyber-cyan hover:shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                }`}
              >
                {category.label}
               </button>
             ))}
         </div>

          {/* Grid Layout - Masonry */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[20px]">
            {displayedProjects.map((project, index) => {
              const styles = project.category ? categoryStyles[project.category] : categoryStyles.frontend;
              const heightVariant = getHeightVariant(index);
              const rowSpan = getRowSpan(index);
              
              return (
              <div
                key={project.title}
                className={`cyber-card ${styles.cardVariant} group relative overflow-hidden cursor-pointer flex flex-col ${heightVariant} ${rowSpan} animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
               {/* Project Image */}
                 <div className={`relative h-52 mb-5 overflow-hidden cyber-clip ${styles.bg} group-hover:${styles.border} transition-all duration-300 flex-shrink-0 image-glitch`}
                     style={{ boxShadow: styles.glowShadow }}>
                  <ImageWithPlaceholder
                   src={project.image}
                   alt={project.title}
                   width={400}
                   height={300}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/90 to-transparent" />
                 <div className="absolute top-3 right-3 flex gap-2">
                     <a
                       href={project.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className={`p-2.5 ${styles.bg} border ${styles.border} rounded-lg hover:${styles.border.replace('60', '80')} transition-all duration-300 hover:scale-110 link-button hover:animate-pulse-glow`}
                       style={{ boxShadow: styles.glowShadow }}
                     >
                       <Github className={`w-4 h-4 ${styles.text}`} />
                     </a>
                     <div className={`p-2.5 ${styles.bg.replace('15', '20')} border ${styles.border} rounded-lg hover:${styles.border.replace('60', '80')} transition-all duration-300 hover:scale-110 link-button hover:animate-pulse-glow`}
                          style={{ boxShadow: styles.glowShadow }}>
                       <ExternalLink className={`w-4 h-4 ${styles.text}`} />
                     </div>
                 </div>
               </div>
 
               {/* Project Content */}
               <div className="flex-1 flex flex-col space-y-3">
                 <h3 className={`font-display text-lg font-bold ${styles.text} group-hover:${styles.text.replace('text-', 'text-neon-')} transition-colors`}
                     style={{ textShadow: styles.textGlow }}>
                   {project.title}
                 </h3>
 
                 <p className="text-sm text-white/80 leading-relaxed line-clamp-2 flex-1">
                   {project.description}
                 </p>
 
                 {/* Tech Stack */}
                 <div className="flex flex-wrap gap-1.5">
                   {project.tech.slice(0, 3).map((tech) => (
                       <span
                         key={tech}
                         className={`px-2.5 py-1 text-xs font-bold ${styles.bg} border ${styles.border} uppercase tracking-wider hover:${styles.border.replace('60', '80')} transition-all duration-300 tech-tag hover:animate-pulse-glow`}
                         style={{
                           color: `var(--${styles.text.replace('text-', '')})`,
                           boxShadow: styles.glowShadow
                         }}
                       >
                         {tech}
                         </span>
                    ))}
                    {project.tech.length > 3 && (
                     <span className="px-2.5 py-1 text-xs font-bold bg-cyber-gray/20 border border-cyber-gray/50 text-white/70">
                       +{project.tech.length - 3}
                     </span>
         )}
                 </div>
               </div>
             </div>
            ); })}
         </div>

         {/* Load More Button */}
         {allProjects.length > 6 && (
           <div className="text-center mt-10">
             <button
               onClick={() => setShowAll(!showAll)}
               className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow flex items-center gap-2 mx-auto"
             >
               {showAll ? t('projects.show_less') : t('projects.view_more')}
               <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
             </button>
            </div>
         )}
        </div>
    </section>
  )
}