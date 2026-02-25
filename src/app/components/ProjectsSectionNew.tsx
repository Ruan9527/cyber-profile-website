'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Globe, BarChart3, Cpu, Database } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'AI Monitoring Platform',
    description: 'Real-time monitoring and anomaly detection for machine learning models in production',
    category: 'AI/ML',
    icon: Cpu,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    size: 'col-span-3 row-span-2',
    tags: ['Python', 'TensorFlow', 'Kubernetes', 'Prometheus'],
    links: {
      github: 'https://github.com/Ruan9527',
      demo: 'https://demo.example.com',
    },
  },
  {
    id: 2,
    title: 'Infrastructure Dashboard',
    description: 'Centralized dashboard for cloud infrastructure monitoring and management',
    category: 'DevOps',
    icon: BarChart3,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100',
    size: 'col-span-3 row-span-1',
    tags: ['React', 'TypeScript', 'AWS', 'D3.js'],
    links: {
      github: 'https://github.com/Ruan9527',
      demo: 'https://demo.example.com',
    },
  },
  {
    id: 3,
    title: 'Data Pipeline Automation',
    description: 'Automated ETL pipelines for large-scale data processing and analytics',
    category: 'Data Engineering',
    icon: Database,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    size: 'col-span-3 row-span-1',
    tags: ['Apache Airflow', 'Python', 'PostgreSQL', 'Snowflake'],
    links: {
      github: 'https://github.com/Ruan9527',
    },
  },
  {
    id: 4,
    title: 'Security Automation Suite',
    description: 'Automated security scanning and compliance checking for cloud environments',
    category: 'Security',
    icon: Globe,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    size: 'col-span-2 row-span-1',
    tags: ['Python', 'Terraform', 'AWS Security Hub', 'Ansible'],
    links: {
      github: 'https://github.com/Ruan9527',
    },
  },
  {
    id: 5,
    title: 'Performance Optimizer',
    description: 'Tool for identifying and resolving performance bottlenecks in distributed systems',
    category: 'Performance',
    icon: BarChart3,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    size: 'col-span-2 row-span-1',
    tags: ['Go', 'Prometheus', 'Grafana', 'OpenTelemetry'],
    links: {
      github: 'https://github.com/Ruan9527',
      demo: 'https://demo.example.com',
    },
  },
  {
    id: 6,
    title: 'CI/CD Pipeline',
    description: 'Enterprise-grade continuous integration and deployment pipeline',
    category: 'DevOps',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    size: 'col-span-2 row-span-1',
    tags: ['GitLab CI', 'Docker', 'Kubernetes', 'Helm'],
    links: {
      github: 'https://github.com/Ruan9527',
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    } as const,
  },
}

export default function ProjectsSectionNew() {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4 text-futuristic-text">
          精选项目
        </h2>
        <p className="font-space-grotesk text-lg text-futuristic-text-muted max-w-2xl mx-auto">
          精选项目展示技术专长和解决问题的能力
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projects.map((project) => {
          const Icon = project.icon
          return (
            <motion.div
              key={project.id}
              className={`glass-card ${project.size} p-6 flex flex-col`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${project.bgColor} ${project.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-space-grotesk font-medium px-3 py-1 bg-white/50 rounded-full text-futuristic-text-muted">
                  {project.category}
                </div>
              </div>
              
              <h3 className="font-archivo text-xl font-bold mb-3 text-futuristic-text">
                {project.title}
              </h3>
              
              <p className="font-space-grotesk text-futuristic-text-muted text-sm leading-relaxed flex-grow mb-6">
                {project.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-space-grotesk bg-white/50 rounded-full text-futuristic-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/30">
                  <div className="flex items-center gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                         aria-label="GitHub仓库"
                      >
                        <Github className="w-4 h-4 text-futuristic-text-muted" />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                         aria-label="实时演示"
                      >
                        <ExternalLink className="w-4 h-4 text-futuristic-text-muted" />
                      </a>
                    )}
                  </div>
                  <div className="text-xs font-space-grotesk text-futuristic-text-muted">
                    {project.size.includes('row-span-2') ? '主要项目' : '次要项目'}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="font-space-grotesk text-futuristic-text-muted max-w-3xl mx-auto">
          每个项目都代表实际技能应用，解决现实问题并创造价值。
        </p>
      </motion.div>
    </section>
  )
}