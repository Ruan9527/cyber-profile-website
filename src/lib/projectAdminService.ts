import { supabaseAdmin } from './supabase-admin'
import { Project } from '@/types'

export interface ProjectCreateData {
  title: string
  description: string
  image: string
  tech: string[]
  link: string
  category?: 'it_ops' | 'ai' | 'data' | 'backend' | 'fullstack'
}

export interface ProjectUpdateData extends Partial<ProjectCreateData> {}

export class ProjectAdminService {
  // 获取所有项目（管理员版本，包含ID）
  static async getAllProjects(): Promise<(Project & { id: string })[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .order('category', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`获取项目失败: ${error.message}`)
      }

      return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        tech: item.tech || [],
        link: item.link,
        category: item.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack') || undefined
      }))
    } catch (error) {
      console.error('ProjectAdminService错误:', error)
      throw error
    }
  }

  // 获取单个项目
  static async getProjectById(id: string): Promise<Project & { id: string }> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(`获取项目失败: ${error.message}`)
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        tech: data.tech || [],
        link: data.link,
        category: data.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack') || undefined
      }
    } catch (error) {
      console.error('ProjectAdminService错误:', error)
      throw error
    }
  }

  // 创建新项目
  static async createProject(projectData: ProjectCreateData): Promise<Project & { id: string }> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .insert([{
          title: projectData.title,
          description: projectData.description,
          image: projectData.image,
          tech: projectData.tech,
          link: projectData.link,
          category: projectData.category
        }])
        .select()
        .single()

      if (error) {
        throw new Error(`创建项目失败: ${error.message}`)
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        tech: data.tech || [],
        link: data.link,
        category: data.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack') || undefined
      }
    } catch (error) {
      console.error('ProjectAdminService错误:', error)
      throw error
    }
  }

  // 更新项目
  static async updateProject(id: string, projectData: ProjectUpdateData): Promise<Project & { id: string }> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const updateData: any = {}
      if (projectData.title !== undefined) updateData.title = projectData.title
      if (projectData.description !== undefined) updateData.description = projectData.description
      if (projectData.image !== undefined) updateData.image = projectData.image
      if (projectData.tech !== undefined) updateData.tech = projectData.tech
      if (projectData.link !== undefined) updateData.link = projectData.link
      if (projectData.category !== undefined) updateData.category = projectData.category
      
      updateData.updated_at = new Date().toISOString()

      const { data, error } = await supabaseAdmin
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`更新项目失败: ${error.message}`)
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        tech: data.tech || [],
        link: data.link,
        category: data.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack') || undefined
      }
    } catch (error) {
      console.error('ProjectAdminService错误:', error)
      throw error
    }
  }

  // 删除项目
  static async deleteProject(id: string): Promise<void> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { error } = await supabaseAdmin
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`删除项目失败: ${error.message}`)
      }
    } catch (error) {
      console.error('ProjectAdminService错误:', error)
      throw error
    }
  }

  // 搜索项目
  static async searchProjects(query: string): Promise<(Project & { id: string })[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`搜索项目失败: ${error.message}`)
      }

      return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        tech: item.tech || [],
        link: item.link,
        category: item.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack') || undefined
      }))
    } catch (error) {
      console.error('ProjectAdminService错误:', error)
      throw error
    }
  }

  // 按类别获取项目
  static async getProjectsByCategory(category: string): Promise<(Project & { id: string })[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`按类别获取项目失败: ${error.message}`)
      }

      return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        tech: item.tech || [],
        link: item.link,
        category: item.category as ('it_ops' | 'ai' | 'data' | 'backend' | 'fullstack') || undefined
      }))
    } catch (error) {
      console.error('ProjectAdminService错误:', error)
      throw error
    }
  }
}