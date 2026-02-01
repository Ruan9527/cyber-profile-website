'use client'

import { useState } from 'react'
import { ExternalLink, Github, Code, Zap, Database, Palette, ChevronDown } from 'lucide-react'
import { Project } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import ImageWithPlaceholder from '@/app/components/ImageWithPlaceholder'
import { useProjects } from '@/hooks'
import { ProjectsSkeleton } from '@/components/Skeleton'
import { ProjectsError } from '@/components/SectionError'



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
    textGlow: '0 0 15px rgba(102, 224, 255, 0.4)',
  },
  ai: {
    bg: 'bg-cyber-purple/15',
    border: 'border-cyber-purple/60',
    text: 'text-cyber-purple',
    gradient: 'from-cyber-purple to-cyber-purple/80',
    cardVariant: 'cyber-card-variant-purple',
    glowShadow: '0 0 15px rgba(209, 153, 255, 0.3)',
    textGlow: '0 0 15px rgba(209, 153, 255, 0.4)',
  },
  data: {
    bg: 'bg-cyber-orange/15',
    border: 'border-cyber-orange/60',
    text: 'text-cyber-orange',
    gradient: 'from-cyber-orange to-cyber-orange/80',
    cardVariant: 'cyber-card-variant-orange',
    glowShadow: '0 0 15px rgba(255, 153, 102, 0.3)',
    textGlow: '0 0 15px rgba(255, 153, 102, 0.4)',
  },
  backend: {
    bg: 'bg-cyber-red/15',
    border: 'border-cyber-red/60',
    text: 'text-cyber-red',
    gradient: 'from-cyber-red to-cyber-red/80',
    cardVariant: 'cyber-card-variant-red',
    glowShadow: '0 0 15px rgba(255, 102, 128, 0.3)',
    textGlow: '0 0 15px rgba(255, 102, 128, 0.4)',
  },
  fullstack: {
    bg: 'bg-cyber-yellow/15',
    border: 'border-cyber-yellow/60',
    text: 'text-cyber-yellow',
    gradient: 'from-cyber-yellow to-cyber-yellow/80',
    cardVariant: 'cyber-card-variant-yellow',
    glowShadow: '0 0 15px rgba(255, 242, 102, 0.3)',
    textGlow: '0 0 15px rgba(255, 242, 102, 0.4)',
  },
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
    { id: 'all', label: t('projects.filter_all') || 'All' },
    { id: 'it_ops', label: t('projects.filter_it_ops') || 'IT运维' },
    { id: 'ai', label: t('projects.filter_ai') || 'AI' },
    { id: 'data', label: t('projects.filter_data') || 'Data' },
    { id: 'backend', label: t('projects.filter_backend') || 'Backend' },
    { id: 'fullstack', label: t('projects.filter_fullstack') || 'Full Stack' },
  ]
  
  const filteredProjects = allProjects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  )
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)
  
  // Simple equal height grid - removed masonry layout to prevent overlapping

   return (
       <section id="projects" className="py-16 pb-24 px-4 relative bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black border-b border-cyber-gray/30">
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

           {/* Loading State */}
           {loading && <ProjectsSkeleton />}
          
           {error && <ProjectsError onRetry={() => refetch()} />}
          
          {!loading && !error && displayedProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70">暂无项目数据</p>
            </div>
          )}

          {!loading && !error && displayedProjects.length > 0 && (
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {/* Grid Layout - Equal height cards */}
            {displayedProjects.map((project, index) => {
               const styles = project.category ? categoryStyles[project.category] : categoryStyles.it_ops;
              
              return (
              <div
                key={project.title}
                 className={`cyber-card ${styles.cardVariant} group relative overflow-hidden cursor-pointer flex flex-col h-full animate-fade-in-up`}
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
          )}

          {/* Load More Button */}
         {allProjects.length > 6 && (
           <div className="text-center mt-10">
             <button
               onClick={() => setShowAll(!showAll)}
                className="cyber-button bg-cyber-black border-cyber-red hover:bg-cyber-cyan hover:border-cyber-cyan flex items-center gap-2 mx-auto"
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