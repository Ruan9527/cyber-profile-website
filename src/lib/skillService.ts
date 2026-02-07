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
        category: item.category as 'it_ops' | 'ai' | 'project_management',
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
      // IT运维技能
      { name: "Linux/Unix", level: 90, category: "it_ops", description: "系统管理与脚本编写" },
      { name: "Docker", level: 85, category: "it_ops", description: "容器化部署与管理" },
      { name: "Kubernetes", level: 80, category: "it_ops", description: "容器编排与集群管理" },
      { name: "AWS/Cloud", level: 75, category: "it_ops", description: "云基础设施与管理" },
      { name: "CI/CD", level: 85, category: "it_ops", description: "持续集成与部署流水线" },
      { name: "监控与告警", level: 80, category: "it_ops", description: "系统监控与告警配置" },
      { name: "网络安全", level: 70, category: "it_ops", description: "网络防护与安全策略" },
      { name: "自动化运维", level: 85, category: "it_ops", description: "运维自动化脚本与工具" },
      // AI技能
      { name: "Python", level: 90, category: "ai", description: "数据科学与机器学习" },
      { name: "TensorFlow", level: 80, category: "ai", description: "深度学习框架" },
      { name: "PyTorch", level: 75, category: "ai", description: "深度学习研究框架" },
      { name: "OpenAI API", level: 85, category: "ai", description: "GPT模型集成与应用" },
      { name: "MLOps", level: 70, category: "ai", description: "机器学习运维流程" },
      { name: "数据可视化", level: 80, category: "ai", description: "数据探索与可视化工具" },
      { name: "自然语言处理", level: 75, category: "ai", description: "NLP模型与文本分析" },
      { name: "计算机视觉", level: 70, category: "ai", description: "图像识别与处理" },
      // 项目管理技能
      { name: "敏捷/Scrum", level: 85, category: "project_management", description: "Sprint规划与迭代管理" },
      { name: "进度管理", level: 85, category: "project_management", description: "里程碑规划与进度跟踪" },
      { name: "需求分析", level: 80, category: "project_management", description: "PRD撰写与需求管理" },
      { name: "跨团队协调", level: 80, category: "project_management", description: "跨部门协作与干系人管理" },
      { name: "质量管理", level: 80, category: "project_management", description: "QA流程与测试策略" },
      { name: "风险管理", level: 75, category: "project_management", description: "风险评估与应急预案" },
      { name: "资源调配", level: 75, category: "project_management", description: "团队资源规划与分配" },
      { name: "成本管理", level: 70, category: "project_management", description: "项目预算控制与成本分析" },
    ]
  }

  // 清除技能缓存
  static clearCache(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem(this.CACHE_KEY)
  }
}
