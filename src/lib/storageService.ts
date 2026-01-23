import { supabaseAdmin } from './supabase-admin'

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export class StorageService {
  static readonly BUCKET_NAME = 'images'
  static readonly MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  static readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml'
  ]

  // 检查Storage是否可用
  static async checkStorageAvailability(): Promise<boolean> {
    if (!supabaseAdmin) {
      console.error('Supabase管理员客户端未初始化')
      return false
    }

    try {
      const { data, error } = await supabaseAdmin.storage.listBuckets()
      if (error) {
        console.error('检查存储桶失败:', error)
        return false
      }
      
      const hasImagesBucket = data.some(bucket => bucket.name === this.BUCKET_NAME)
      if (!hasImagesBucket) {
        console.warn(`存储桶 "${this.BUCKET_NAME}" 不存在`)
      }
      
      return hasImagesBucket
    } catch (error) {
      console.error('检查Storage可用性失败:', error)
      return false
    }
  }

  // 验证文件
  static validateFile(file: File): { isValid: boolean; error?: string } {
    // 检查文件类型
    if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: `不支持的文件类型。只支持: ${this.ALLOWED_MIME_TYPES.join(', ')}`
      }
    }

    // 检查文件大小
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `文件大小不能超过 ${this.MAX_FILE_SIZE / 1024 / 1024}MB`
      }
    }

    return { isValid: true }
  }

  // 上传文件
  static async uploadFile(
    file: File, 
    folder: string = 'uploads',
    fileName?: string
  ): Promise<UploadResult> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    // 验证文件
    const validation = this.validateFile(file)
    if (!validation.isValid) {
      throw new Error(validation.error || '文件验证失败')
    }

    try {
      // 生成文件名
      const fileExt = file.name.split('.').pop()
      const uniqueName = fileName || `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      // 上传文件
      const { data, error } = await supabaseAdmin.storage
        .from(this.BUCKET_NAME)
        .upload(uniqueName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        throw new Error(`上传失败: ${error.message}`)
      }

      // 获取公开URL
      const { data: urlData } = supabaseAdmin.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(uniqueName)

      if (!urlData?.publicUrl) {
        throw new Error('无法获取文件URL')
      }

      return {
        url: urlData.publicUrl,
        path: uniqueName
      }
    } catch (error) {
      console.error('文件上传错误:', error)
      throw error
    }
  }

  // 删除文件
  static async deleteFile(filePath: string): Promise<boolean> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { error } = await supabaseAdmin.storage
        .from(this.BUCKET_NAME)
        .remove([filePath])

      if (error) {
        throw new Error(`删除文件失败: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error('删除文件错误:', error)
      throw error
    }
  }

  // 获取文件列表
  static async listFiles(folder: string = '', limit: number = 100): Promise<string[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { data, error } = await supabaseAdmin.storage
        .from(this.BUCKET_NAME)
        .list(folder, {
          limit,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        })

      if (error) {
        throw new Error(`获取文件列表失败: ${error.message}`)
      }

      return data
        .filter(item => !item.id) // 排除文件夹
        .map(item => `${folder ? folder + '/' : ''}${item.name}`)
    } catch (error) {
      console.error('获取文件列表错误:', error)
      throw error
    }
  }

  // 检查文件是否存在
  static async fileExists(filePath: string): Promise<boolean> {
    if (!supabaseAdmin) {
      throw new Error('Supabase管理员客户端未初始化')
    }

    try {
      const { data } = await supabaseAdmin.storage
        .from(this.BUCKET_NAME)
        .list('', {
          search: filePath
        })

      return !!(data && data.length > 0)
    } catch (error) {
      console.error('检查文件存在性错误:', error)
      return false
    }
  }
}

// 导出检查函数
export async function isStorageConfigured(): Promise<boolean> {
  try {
    return await StorageService.checkStorageAvailability()
  } catch (error) {
    console.error('检查Storage配置失败:', error)
    return false
  }
}

// 导出默认实例
export default StorageService