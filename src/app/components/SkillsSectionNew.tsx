'use client'

import { motion } from 'framer-motion'
import { Database, Users, HeartPulse, MessageSquare, CreditCard, Smartphone, BarChart3 } from 'lucide-react'

const skills = [
  {
    id: 3,
    title: '项目管理',
    description: 'PMP认证、项目规划、进度控制与风险管理',
    icon: Users,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100',
    size: 'col-span-2 row-span-1',
  },
  {
    id: 5,
    title: '团队与沟通',
    description: '跨部门协调、需求分析、干系人管理',
    icon: MessageSquare,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    size: 'col-span-2 row-span-1',
  },
  {
    id: 4,
    title: '医疗信息化',
    description: 'HIS/EMR/LIS系统、医疗数据流转与集成',
    icon: HeartPulse,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    size: 'col-span-2 row-span-1',
  },
  {
    id: 6,
    title: '支付对接',
    description: '微信/支付宝支付平台、线上医保支付业务',
    icon: CreditCard,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 7,
    title: '线上服务',
    description: '微信小程序、公众号应用设计与上线',
    icon: Smartphone,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 8,
    title: '数据分析',
    description: 'SQL查询、数据可视化、问题排查与优化',
    icon: BarChart3,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-100',
    size: 'col-span-2 row-span-1',
  },
  {
    id: 1,
    title: '技术基础',
    description: '数据库管理、SQL查询优化、Linux系统运维',
    icon: Database,
    color: 'text-futuristic-blue',
    bgColor: 'bg-futuristic-blue/10',
    size: 'col-span-2 row-span-1',
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

export default function SkillsSectionNew() {
  return (
    <section id="skills" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-archivo text-4xl md:text-5xl font-bold mb-4 text-futuristic-text">
          技术技能
        </h2>
        <p className="font-space-grotesk text-lg text-futuristic-text-muted max-w-2xl mx-auto">
            涵盖PMP项目管理、医疗信息化及专业技术的综合能力
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.id}
              className={`glass-card ${skill.size} p-6 flex flex-col`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${skill.bgColor} ${skill.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                  <div className="text-xs font-space-grotesk font-medium px-3 py-1 bg-white/50 rounded-full text-futuristic-text-muted">
                    {skill.size.includes('row-span-2') ? '高级' : '核心'}
                  </div>
              </div>
              
              <h3 className="font-archivo text-xl font-bold mb-2 text-futuristic-text">
                {skill.title}
              </h3>
              
              <p className="font-space-grotesk text-futuristic-text-muted text-sm leading-relaxed flex-grow">
                {skill.description}
              </p>

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
           每项技能都代表在项目管理与医疗信息化领域中多年的实践经验和专业积累。
        </p>
      </motion.div>
    </section>
  )
}