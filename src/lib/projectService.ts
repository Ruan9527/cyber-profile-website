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
        category: item.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack') || undefined
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
        title: "Kubernetes Cluster Management Platform",
        description: "Enterprise-grade Kubernetes management platform with automated scaling, monitoring, and security compliance for cloud-native infrastructure.",
        image: "/placeholder-project1.jpg",
        tech: ["Kubernetes", "Helm", "Prometheus", "Grafana", "AWS"],
        link: "https://github.com/project1",
        category: 'it_ops'
      },
      {
        title: "AI-Powered Monitoring System",
        description: "Intelligent monitoring system using machine learning to predict infrastructure failures and automate incident response.",
        image: "/placeholder-project2.jpg",
        tech: ["Python", "TensorFlow", "FastAPI", "Docker", "Redis"],
        link: "https://github.com/project2",
        category: 'ai'
      },
      {
        title: "Data Pipeline Automation Platform",
        description: "Automated data pipeline orchestration tool for ETL processes, real-time streaming, and data quality monitoring.",
        image: "/placeholder-project3.jpg",
        tech: ["Apache Airflow", "Python", "PostgreSQL", "Kafka", "Snowflake"],
        link: "https://github.com/project3",
        category: 'data'
      },
      {
        title: "Cloud Infrastructure as Code",
        description: "Infrastructure automation using Terraform and Ansible for multi-cloud deployment, with CI/CD integration and compliance checks.",
        image: "/placeholder-project4.jpg",
        tech: ["Terraform", "Ansible", "AWS", "GitLab CI", "Python"],
        link: "https://github.com/project4",
        category: 'backend'
      },
      {
        title: "Full-Stack DevOps Dashboard",
        description: "Comprehensive DevOps dashboard providing real-time insights into deployments, system health, and team performance metrics.",
        image: "/placeholder-project5.jpg",
        tech: ["Next.js", "Supabase", "Tailwind CSS", "Docker", "GitHub Actions"],
        link: "https://github.com/project5",
        category: 'fullstack'
      },
      {
        title: "ML Model Deployment Platform",
        description: "End-to-end machine learning model deployment platform with version control, A/B testing, and performance monitoring.",
        image: "/placeholder-project6.jpg",
        tech: ["Python", "FastAPI", "Docker", "MLflow", "Kubernetes"],
        link: "https://github.com/project6",
        category: 'ai'
      },
      {
        title: "Network Security Scanner",
        description: "Automated network security scanner for vulnerability assessment, penetration testing, and compliance reporting.",
        image: "/placeholder-project1.jpg",
        tech: ["Python", "Nmap", "ELK Stack", "React", "PostgreSQL"],
        link: "https://github.com/project7",
        category: 'it_ops'
      },
      {
        title: "Real-time Data Analytics Dashboard",
        description: "Real-time analytics dashboard for business intelligence with interactive visualizations and predictive analytics.",
        image: "/placeholder-project2.jpg",
        tech: ["React", "D3.js", "WebSocket", "Node.js", "MongoDB"],
        link: "https://github.com/project8",
        category: 'data'
      },
    ]
  }

  // 清除项目缓存
  static clearCache(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem(this.CACHE_KEY)
  }
}