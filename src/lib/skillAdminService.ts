import { supabase } from './supabase'
import { Skill } from '@/types'

export interface SkillCreateData {
  name: string
  level: number
  category: 'it_ops' | 'ai' | 'project_management'
  description?: string
}

export interface SkillUpdateData extends Partial<SkillCreateData> {}

export class SkillAdminService {
  // 获取所有技能（管理员版本，包含ID）
  static async getAllSkills(): Promise<(Skill & { id: string })[]> {
    if (!supabase) {
      throw new Error('Supabase客户端未初始化')
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('level', { ascending: false })

      if (error) {
        throw new Error(`获取技能失败: ${error.message}`)
      }

        return data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        level: item.level,
        category: item.category as 'it_ops' | 'ai' | 'project_management',
        description: item.description || undefined
      })) || []
    } catch (error) {
      console.error('SkillAdminService错误:', error)
      throw error
    }
  }

  // 获取单个技能
  static async getSkillById(id: string): Promise<Skill & { id: string }> {
    if (!supabase) {
      throw new Error('Supabase客户端未初始化')
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(`获取技能失败: ${error.message}`)
      }

      return {
        id: data.id,
        name: data.name,
        level: data.level,
        category: data.category as 'it_ops' | 'ai' | 'project_management',
        description: data.description || undefined
      }
    } catch (error) {
      console.error('SkillAdminService错误:', error)
      throw error
    }
  }

  // 创建新技能
  static async createSkill(skillData: SkillCreateData): Promise<Skill & { id: string }> {
    if (!supabase) {
      throw new Error('Supabase客户端未初始化')
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{
          name: skillData.name,
          level: skillData.level,
          category: skillData.category,
          description: skillData.description
        }])
        .select()
        .single()

      if (error) {
        throw new Error(`创建技能失败: ${error.message}`)
      }

      return {
        id: data.id,
        name: data.name,
        level: data.level,
        category: data.category as 'it_ops' | 'ai' | 'project_management',
        description: data.description || undefined
      }
    } catch (error) {
      console.error('SkillAdminService错误:', error)
      throw error
    }
  }

  // 更新技能
  static async updateSkill(id: string, skillData: SkillUpdateData): Promise<Skill & { id: string }> {
    if (!supabase) {
      throw new Error('Supabase客户端未初始化')
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .update({
          name: skillData.name,
          level: skillData.level,
          category: skillData.category,
          description: skillData.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`更新技能失败: ${error.message}`)
      }

      return {
        id: data.id,
        name: data.name,
        level: data.level,
        category: data.category as 'it_ops' | 'ai' | 'project_management',
        description: data.description || undefined
      }
    } catch (error) {
      console.error('SkillAdminService错误:', error)
      throw error
    }
  }

  // 删除技能
  static async deleteSkill(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase客户端未初始化')
    }

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`删除技能失败: ${error.message}`)
      }
    } catch (error) {
      console.error('SkillAdminService错误:', error)
      throw error
    }
  }

  // 批量导入技能
  static async importSkills(skills: SkillCreateData[]): Promise<number> {
    if (!supabase) {
      throw new Error('Supabase客户端未初始化')
    }

    try {
      const { data, error } = await supabase
        .from('skills')
        .insert(skills.map(skill => ({
          name: skill.name,
          level: skill.level,
          category: skill.category,
          description: skill.description
        })))
        .select()

      if (error) {
        throw new Error(`导入技能失败: ${error.message}`)
      }

      return data?.length || 0
    } catch (error) {
      console.error('SkillAdminService错误:', error)
      throw error
    }
  }

  // 清空所有技能（危险操作）
  static async clearAllSkills(): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase客户端未初始化')
    }

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // 删除所有记录

      if (error) {
        throw new Error(`清空技能失败: ${error.message}`)
      }
    } catch (error) {
      console.error('SkillAdminService错误:', error)
      throw error
    }
  }
}