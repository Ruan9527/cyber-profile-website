import { supabase } from './supabase'
import { Project } from '@/types'

export class ProjectService {
  private static CACHE_KEY = 'cyber_projects_cache'
  private static CACHE_DURATION = 30 * 60 * 1000 // 30分钟缓存

  // 获取所有项目
  static async getProjects(): Promise<Project[]> {
    // 检查缓存
    const cached = this.getCachedProjects()
    if (cached) {
      return cached
    }

    // 检查Supabase客户端
    if (!supabase) {
      console.warn('Supabase client not initialized, using fallback projects data')
      return this.getFallbackProjects()
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('category', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Projects fetch error: ${error.message}`)
      }

      // 转换数据为Project类型
      const projects: Project[] = data.map(item => ({
        title: item.title,
        description: item.description,
        image: item.image,
        tech: item.tech || [],
        link: item.link,
        category: item.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack' | 'healthcare_it') || undefined
      }))

      // 缓存数据
      this.cacheProjects(projects)
      
      return projects
    } catch (error) {
      console.error('Project service error:', error)
      // 如果API失败，尝试使用缓存或返回兜底数据
      const fallback = this.getFallbackProjects()
      return fallback
    }
  }

  // 按类别获取项目
  static async getProjectsByCategory(category?: string): Promise<Project[]> {
    const projects = await this.getProjects()
    
    if (!category || category === 'all') {
      return projects
    }

    return projects.filter(project => project.category === category)
  }

  // 获取缓存数据
  private static getCachedProjects(): Project[] | null {
    if (typeof window === 'undefined') return null

    const cached = localStorage.getItem(this.CACHE_KEY)
    
    if (!cached) return null

    try {
      const { data, timestamp } = JSON.parse(cached)
      const now = Date.now()
      
      // 检查缓存是否过期
      if (now - timestamp < this.CACHE_DURATION) {
        return data
      } else {
        // 清除过期缓存
        localStorage.removeItem(this.CACHE_KEY)
      }
    } catch (error) {
      console.error('Failed to parse cached projects:', error)
    }
    
    return null
  }

  // 缓存项目数据
  private static cacheProjects(projects: Project[]): void {
    if (typeof window === 'undefined') return

    const cacheData = {
      data: projects,
      timestamp: Date.now()
    }
    
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Failed to cache projects data:', error)
    }
  }

  // 获取兜底数据（硬编码项目）
  private static getFallbackProjects(): Project[] {
    return [
      {
        title: "麻城市公共卫生信息化补短板项目",
        description: "负责麻城市卫健局直属区域内 4 家县级医院，24 个基层医院，536 个村卫生室的实名就医（电子健康卡）平台、县级健康门户（健康麻城小程序）、区域统一支付平台的建设落地。制定项目计划、资源调度、项目相关方协调推进；跟踪研发进度并组织项目实施、培训、验收等；推动医院端数据标准化落地与接口对接等。",
        image: "/placeholder-project1.jpg",
        tech: ["微信小程序", "Java", "Spring Boot", "MySQL", "Redis", "HL7/FHIR", "微信支付", "支付宝支付"],
        link: "#",
        category: 'healthcare_it'
      },
      {
        title: "联勤医院收费管理平台建设",
        description: "负责全国十余家联勤医院收费管理平台项目实施落地工作。包括收费系统部署、医院业务流程梳理、第三方支付对接、医保支付接口集成、财务系统对接等。",
        image: "/placeholder-project2.jpg",
        tech: ["Java", "Spring Boot", "Vue.js", "Oracle", "医保接口", "财务系统集成", "Redis", "Docker"],
        link: "#",
        category: 'healthcare_it'
      },
      {
        title: "湖北省传染病监测预警与应急指挥能力提升项目包",
        description: "负责武汉市三级、二级、一级医疗机构数据采集软件部署、实施工作，涉及数据清理、标准化、上报等。包括数据采集通路建设、医疗机构数据接口对接、数据质量监控、疫情预警分析等。",
        image: "/placeholder-project3.jpg",
        tech: ["Python", "ETL", "数据仓库", "PostgreSQL", "报表工具", "医院信息系统接口", "数据标准化", "数据可视化"],
        link: "#",
        category: 'healthcare_it'
      },
    ]
  }

  // 清除项目缓存
  static clearCache(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem(this.CACHE_KEY)
  }
}