'use client'

import { createContext, useContext, ReactNode } from 'react'

// 简化版本：只支持中文，移除语言切换功能
interface LanguageContextType {
  language: 'zh' // 固定为中文
  setLanguage: (lang: 'zh') => void // 保留API但无实际作用
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 只保留中文翻译，移除不需要的翻译键
const translations = {
  // Navigation
  'nav.home': '首页',
  'nav.skills': '技能',
  'nav.projects': '项目',
  'nav.contact': '联系',

  // Hero
  'hero.title': 'Bunny Developer',
  'hero.bio': '专注于IT运维与AI技术的赛博朋克风格个人展示网站',
  'hero.github': 'GitHub',
  'hero.xiaohongshu': '小红书', // 新增小红书
  'hero.contact': '联系我',
  // 移除简历下载相关翻译

  // Skills - 更新为IT运维和AI分类
  'skills.title': '技术技能',
  'skills.it_ops': 'IT运维',
  'skills.ai': 'AI技术',
  'skills.years_experience': '年经验',
  'skills.projects_completed': '完成项目',
  'skills.technologies': '技术栈',

  // Projects
  'projects.title': '项目展示',
  'projects.view_all': '查看所有项目',
  'projects.show_less': '收起项目',
  'projects.tech_stack': '技术栈',
  'projects.filter_all': '全部',
  'projects.filter_it_ops': 'IT运维',
  'projects.filter_ai': 'AI项目',
  'projects.filter_fullstack': '全栈',
  'projects.filter_design': '设计',
  'projects.filter_data': '数据',

  // Contact Section - 简化版本
  'contact.title': '联系方式',
  'contact.get_in_touch': '联系我',
  'contact.email_label': '邮箱',
  'contact.email_value': 'ruanlong9527@gmail.com',
  'contact.email_desc': '发送邮件',
  'contact.github_label': 'GitHub',
  'contact.github_value': 'yourusername',
  'contact.github_desc': '查看代码',
  'contact.xiaohongshu_label': '小红书',
  'contact.xiaohongshu_value': 'your-xiaohongshu-id',
  'contact.xiaohongshu_desc': '分享日常',

  // Footer
  'footer.made_with': '用',
  'footer.cyberpunk': '赛博朋克风格',
  'footer.rights': '版权所有。',
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language: 'zh' = 'zh'
  
  const setLanguage = (lang: 'zh') => {
    // 空函数，保持API兼容性但无实际作用
  }

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
