'use client'

import { motion } from 'framer-motion'
import { Globe, BarChart3, Database } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: '麻城市公共卫生信息化补短板项目',
    description: '作为项目经理，负责麻城市卫健局直属区域内4家县级医院、24个基层医院、536个村卫生室的实名就医（电子健康卡）平台、县级健康门户（健康麻城小程序）、区域统一支付平台的建设落地（2021.05-2021.12）。主要职责：制定项目计划、资源调度、项目相关方协调推进；跟踪研发进度并组织项目实施、培训、验收；推动医院端数据标准化落地与接口对接；协调4家县级医院、24家基层医院系统对接工作。',
    category: '医疗信息化',
    icon: Globe,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100',
    size: 'col-span-3 row-span-2',
    tags: ['项目经理', '微信小程序', 'Java/Spring Boot', 'HL7/FHIR标准', '微信/支付宝支付', 'MySQL/Redis', '医院接口对接', '数据标准化'],
    links: {
      github: null,
      demo: null,
    },
  },
  {
    id: 2,
    title: '联勤医院收费管理平台建设',
    description: '作为项目经理，负责全国十余家联勤医院收费管理平台项目实施落地工作（2022.10-2024.12）。主要职责：收费系统部署与配置；医院业务流程梳理与优化；第三方支付（微信、支付宝）对接；医保支付接口集成；财务系统对接；制定项目实施方案，协调医院各业务部门需求，确保项目按时交付并满足医院业务需求。',
    category: '医疗信息化',
    icon: Database,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100',
    size: 'col-span-3 row-span-2',
    tags: ['项目经理', 'Java/Vue.js', 'Oracle数据库', '医保接口', '财务系统集成', 'Docker容器化', 'Redis缓存', '微服务架构'],
    links: {
      github: null,
      demo: null,
    },
  },
  {
    id: 3,
    title: '湖北省传染病监测预警与应急指挥能力提升项目包',
    description: '作为实施经理，负责武汉市三级、二级、一级医疗机构数据采集软件部署、实施工作，涉及数据清理、标准化、上报等（2025.01-2025.10）。主要职责：数据采集通路建设规划；医疗机构数据接口对接与调试；数据质量监控体系建设；疫情预警分析模型数据支撑；确保数据采集软件在各医疗机构顺利部署，实现传染病数据的实时采集与标准化上报。',
    category: '医疗信息化',
    icon: BarChart3,
    color: 'text-pink-500',
    bgColor: 'bg-pink-100',
    size: 'col-span-6 row-span-1 md:row-span-2',
    tags: ['实施经理', 'Python/ETL', '数据仓库', 'PostgreSQL', '报表工具', '数据标准化', '数据可视化', '医院信息系统接口'],
    links: {
      github: null,
      demo: null,
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
          项目经验
        </h2>
        <p className="font-space-grotesk text-lg text-futuristic-text-muted max-w-2xl mx-auto">
          医疗信息化项目经理经验，涵盖公共卫生、医院收费管理、传染病监测等多个领域
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
              
               <div className="mt-6 pt-4 border-t border-white/30">
                 <div className="flex flex-wrap gap-2">
                   {project.tags.map((tag) => (
                     <span
                       key={tag}
                       className="px-3 py-1 text-xs font-space-grotesk bg-white/50 rounded-full text-futuristic-text-muted"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
                 <div className="mt-4 text-xs font-space-grotesk text-futuristic-text-muted italic">
                   {project.size.includes('row-span-2') ? '大型项目（项目经理）' : '重点项目（实施经理）'}
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
          作为项目经理/实施经理，负责项目计划制定、资源调度、跨团队协调、进度跟踪、数据标准化与接口对接等工作
        </p>
      </motion.div>
    </section>
  )
}