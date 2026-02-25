import { supabase } from './supabase'
import { Skill } from '@/types'

console.log("SkillService module loaded");
export class SkillService {
  private static CACHE_KEY = 'cyber_skills_cache'
  private static CACHE_DURATION = 30 * 60 * 1000 // 30分钟缓存

  // 获取所有技能
  static async getSkills(): Promise<Skill[]> {
    console.log("SkillService.getSkills called");
    // 检查缓存
    const cached = this.getCachedSkills()
    if (cached) {
      return cached
    }

    // 检查Supabase客户端
    if (!supabase) {
      console.warn('Supabase client not initialized, using fallback skills data')
      return this.getFallbackSkills()
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('level', { ascending: false })
      console.log("SkillService fetched data:", data);

      if (error) {
        throw new Error(`Skills fetch error: ${error.message}`)
      }

      console.log("SkillService raw data:", data);
      // 转换数据为Skill类型
      const skills: Skill[] = data.map(item => ({
        name: item.name,
        level: item.level,
        category: item.category as 'it_ops' | 'ai' | 'project_management' | 'healthcare_it',
        description: item.description || undefined
      }))
      console.log("SkillService mapped skills:", skills);

      // 缓存数据
      this.cacheSkills(skills)
      
      return skills
    } catch (error) {
      console.error('Skill service error:', error)
      // 如果API失败，尝试使用缓存或返回兜底数据
      const fallback = this.getFallbackSkills()
      return fallback
    }
  }

  // 按类别获取技能
  static async getSkillsByCategory(): Promise<Record<string, Skill[]>> {
    const skills = await this.getSkills()
    
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)
  }

  // 获取缓存数据
  private static getCachedSkills(): Skill[] | null {
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
      console.error('Failed to parse cached skills:', error)
    }
    
    return null
  }

  // 缓存技能数据
  private static cacheSkills(skills: Skill[]): void {
    if (typeof window === 'undefined') return

    const cacheData = {
      data: skills,
      timestamp: Date.now()
    }
    
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Failed to cache skills data:', error)
    }
  }

      // 获取兜底数据（硬编码技能）
  private static getFallbackSkills(): Skill[] {
    console.log("SkillService.getFallbackSkills called");
    return [
      // 技术基础技能
      { name: "数据库管理", level: 90, category: "it_ops", description: "Oracle/PostgreSQL/MySQL等主流数据库管理与优化" },
      { name: "SQL查询与优化", level: 85, category: "it_ops", description: "复杂SQL查询、性能调优与数据分析" },
      { name: "Linux系统运维", level: 80, category: "it_ops", description: "系统管理、日常运维命令与脚本编写" },
      { name: "软件开发流程", level: 75, category: "it_ops", description: "需求分析、设计、开发、测试、部署全流程" },
      { name: "网络与安全基础", level: 70, category: "it_ops", description: "网络配置、安全防护与漏洞排查" },
      { name: "云基础设施", level: 75, category: "it_ops", description: "AWS/Cloud云服务部署与管理" },
      // AI技能
      { name: "Python编程", level: 85, category: "ai", description: "数据科学、自动化脚本与后端开发" },
      { name: "数据分析与可视化", level: 80, category: "ai", description: "数据探索、统计分析与可视化工具使用" },
      { name: "机器学习基础", level: 75, category: "ai", description: "经典机器学习算法与模型应用" },
      { name: "自然语言处理", level: 70, category: "ai", description: "NLP模型、文本分析与信息抽取" },
      { name: "计算机视觉", level: 65, category: "ai", description: "图像识别、处理与视觉模型应用" },
      { name: "自动化脚本", level: 80, category: "ai", description: "自动化任务、爬虫与工具开发" },
      // 项目管理技能
      { name: "PMP项目管理", level: 90, category: "project_management", description: "项目立项、计划制定、进度与成本控制" },
      { name: "项目规划与进度控制", level: 85, category: "project_management", description: "里程碑规划、进度跟踪与风险管理" },
      { name: "风险管理与应对", level: 80, category: "project_management", description: "风险识别、评估与应急预案制定" },
      { name: "团队组建与管理", level: 85, category: "project_management", description: "研发、实施、测试等角色分工与协作" },
      { name: "跨部门沟通协调", level: 90, category: "project_management", description: "推动医院、厂商及第三方平台合作" },
      { name: "需求分析与梳理", level: 85, category: "project_management", description: "与医院业务部门沟通，准确理解并梳理业务需求" },
      { name: "质量管理与测试", level: 80, category: "project_management", description: "QA流程、测试策略与质量控制" },
      { name: "成本控制与预算", level: 75, category: "project_management", description: "项目预算控制、成本分析与资源调配" },
      // 医疗信息化技能
      { name: "HIS/EMR/LIS系统", level: 85, category: "healthcare_it", description: "核心系统业务逻辑、数据流转与集成" },
      { name: "第三方支付对接", level: 80, category: "healthcare_it", description: "微信、支付宝等支付平台对接流程" },
      { name: "线上医保支付", level: 75, category: "healthcare_it", description: "医保支付业务场景设计与实现" },
      { name: "微信小程序/公众号", level: 80, category: "healthcare_it", description: "线上服务应用设计、开发与上线" },
      { name: "医疗数据流转", level: 75, category: "healthcare_it", description: "医疗数据集成、交换与标准化" },
      { name: "医院业务流程梳理", level: 85, category: "healthcare_it", description: "医院业务部门需求沟通与流程优化" },
    ]
  }

  // 清除技能缓存
  static clearCache(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem(this.CACHE_KEY)
  }
}
