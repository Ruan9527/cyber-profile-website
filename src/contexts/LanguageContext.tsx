'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
     // Navigation
     // Navigation
     'nav.home': 'Home',
     'nav.skills': 'Skills',
     'nav.projects': 'Projects',
     'nav.contact': 'Contact',

    // Hero
    'hero.title': 'Bunny Developer',
    'hero.bio': 'Passionate about creating amazing web experiences with cyberpunk aesthetics and cutting-edge technology.',
    'hero.github': 'GitHub',
    'hero.linkedin': 'LinkedIn',
    'hero.twitter': 'Twitter',
    'hero.contact': 'Contact',
    'hero.download_resume': 'Download Resume',

    // Skills
    'skills.title': 'TECH SKILLS',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.design': 'Design',
    'skills.other': 'Other',
    'skills.years_experience': 'Years Experience',
    'skills.projects_completed': 'Projects Completed',
    'skills.happy_clients': 'Happy Clients',
    'skills.technologies': 'Technologies',

    // Projects
    'projects.title': 'FEATURED PROJECTS',
    'projects.view_all': 'View All Projects',
    'projects.tech_stack': 'Tech Stack',

    // Stats
    'stats.title': 'ANALYTICS DASHBOARD',
    'stats.total_visitors': 'Total Visitors',
    'stats.messages': 'Messages',
    'stats.downloads': 'Downloads',
    'stats.today_visitors': "Today's Visitors",
    'stats.all_time_visitors': 'All-time visitors',
    'stats.guest_book_entries': 'Guest book entries',
    'stats.resume_downloads': 'Resume downloads',
    'stats.visitors_today': 'Visitors today',
    'stats.24h_activity': '24-Hour Activity',
    'stats.live_feed': 'Live Feed',
    'stats.uptime': 'Uptime',
    'stats.avg_load_time': 'Avg Load Time',
    'stats.performance_grade': 'Performance Grade',

    // Message Board (Guest Book)
    'message_board.title': 'GUEST BOOK',
    'message_board.subtitle': 'Leave a Public Message',
    'message_board.name': 'Name',
    'message_board.email': 'Email',
    'message_board.message': 'Message',
    'message_board.placeholder_name': 'Your name',
    'message_board.placeholder_email': 'your.email@example.com',
    'message_board.placeholder_message': 'Share your thoughts...',
    'message_board.send': 'Send Message',
    'message_board.sending': 'Sending...',
    'message_board.recent_messages': 'Recent Messages',
    'message_board.no_messages': 'No messages yet. Be the first to leave one!',
    'message_board.success': 'Message sent successfully! 🎉',
    'message_board.error': 'Error sending message. Please try again.',
    'message_board.total_messages': 'Total Messages',
    'message_board.active_monitor': 'Active Monitor',

    // Contact Section
    'contact.title': 'CONNECT',
    'contact.get_in_touch': 'Get In Touch',
    'contact.email_label': 'Email',
    'contact.email_value': 'your.email@example.com',
    'contact.email_desc': 'Drop me a line',
    'contact.github_label': 'GitHub',
    'contact.github_value': 'yourusername',
    'contact.github_desc': 'Check my code',
    'contact.linkedin_label': 'LinkedIn',
    'contact.linkedin_value': 'in/yourprofile',
    'contact.linkedin_desc': 'Professional network',
    'contact.twitter_label': 'Twitter',
    'contact.twitter_value': '@yourusername',
    'contact.twitter_desc': 'Follow my thoughts',
    'contact.download_resume': 'Download Resume',
    'contact.download_desc': 'Get my complete resume in PDF format with detailed work experience and skills.',
    'contact.wechat': 'WeChat',
    'contact.scan_wechat': 'Scan to connect on WeChat',
    'contact.location': 'Location',
    'contact.available_remote': 'Available for remote work',
    'contact.send_private_inquiry': 'Send a Private Inquiry',
    'contact.send_message': 'Send Message',
    'contact.subject': 'Subject',
    'contact.placeholder_subject': 'Project inquiry, collaboration, etc.',
    'contact.placeholder_message': 'Tell me about your project or idea...',

    // Footer
    'footer.made_with': 'Made with',
    'footer.cyberpunk': 'Cyberpunk Style',
    'footer.rights': 'All rights reserved.',
  },
  zh: {
     // Navigation
     'nav.home': '首页',
     'nav.skills': '技能',
     'nav.projects': '项目',
     'nav.contact': '联系',

    // Hero
    'hero.title': 'Bunny Developer',
    'hero.bio': '热衷于使用赛博朋克美学和前沿技术创建令人惊叹的Web体验。',
    'hero.github': 'GitHub',
    'hero.linkedin': 'LinkedIn',
    'hero.twitter': 'Twitter',
    'hero.contact': '联系我',
    'hero.download_resume': '下载简历',

    // Skills
    'skills.title': '技术技能',
    'skills.frontend': '前端',
    'skills.backend': '后端',
    'skills.design': '设计',
    'skills.other': '其他',
    'skills.years_experience': '年经验',
    'skills.projects_completed': '完成项目',
    'skills.happy_clients': '满意客户',
    'skills.technologies': '技术栈',

    // Projects
    'projects.title': '精选项目',
    'projects.view_all': '查看所有项目',
    'projects.tech_stack': '技术栈',

    // Stats
    'stats.title': '数据分析',
    'stats.total_visitors': '总访客数',
    'stats.messages': '留言数',
    'stats.downloads': '下载量',
    'stats.today_visitors': '今日访客',
    'stats.all_time_visitors': '历史访客',
    'stats.guest_book_entries': '留言板条目',
    'stats.resume_downloads': '简历下载',
    'stats.visitors_today': '今日访问',
    'stats.24h_activity': '24小时活动',
    'stats.live_feed': '实时动态',
    'stats.uptime': '在线时间',
    'stats.avg_load_time': '平均加载时间',
    'stats.performance_grade': '性能评级',

    // Message Board (Guest Book)
    'message_board.title': '留言板',
    'message_board.subtitle': '留下公开留言',
    'message_board.name': '姓名',
    'message_board.email': '邮箱',
    'message_board.message': '留言内容',
    'message_board.placeholder_name': '您的姓名',
    'message_board.placeholder_email': 'your.email@example.com',
    'message_board.placeholder_message': '分享您的想法...',
    'message_board.send': '发送留言',
    'message_board.sending': '发送中...',
    'message_board.recent_messages': '最近留言',
    'message_board.no_messages': '暂无留言，来做第一个吧！',
    'message_board.success': '留言发送成功！🎉',
    'message_board.error': '发送失败，请重试。',
    'message_board.total_messages': '总留言数',
    'message_board.active_monitor': '实时监控',

    // Contact Section
    'contact.title': '联系方式',
    'contact.get_in_touch': '联系我',
    'contact.email_label': '邮箱',
    'contact.email_value': 'your.email@example.com',
    'contact.email_desc': '发送邮件',
    'contact.github_label': 'GitHub',
    'contact.github_value': 'yourusername',
    'contact.github_desc': '查看代码',
    'contact.linkedin_label': 'LinkedIn',
    'contact.linkedin_value': 'in/yourprofile',
    'contact.linkedin_desc': '职业网络',
    'contact.twitter_label': 'Twitter',
    'contact.twitter_value': '@yourusername',
    'contact.twitter_desc': '关注我',
    'contact.download_resume': '下载简历',
    'contact.download_desc': '获取完整的PDF格式简历，包含详细的工作经验和技能。',
    'contact.wechat': '微信',
    'contact.scan_wechat': '扫码添加微信',
    'contact.location': '位置',
    'contact.available_remote': '接受远程工作',
    'contact.send_private_inquiry': '发送私密咨询',
    'contact.send_message': '发送消息',
    'contact.subject': '主题',
    'contact.placeholder_subject': '项目咨询、合作等',
    'contact.placeholder_message': '告诉我您的项目或想法...',

    // Footer
    'footer.made_with': '用',
    'footer.cyberpunk': '赛博朋克风格',
    'footer.rights': '版权所有。',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('zh')) {
        setLanguage('zh')
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
