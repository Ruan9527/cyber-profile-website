'use client'

import { useState, useEffect } from 'react'
import { X, Save, AlertCircle, Link as LinkIcon, Image as ImageIcon, Tag, Globe } from 'lucide-react'
import ImageUploader from './ImageUploader'
import { ProjectAdminService, ProjectCreateData, ProjectUpdateData } from '@/lib/projectAdminService'
import { Project } from '@/types'

interface ProjectFormModalProps {
  project: (Project & { id: string }) | null
  onClose: () => void
  onSubmit: () => void
}

export default function ProjectFormModal({ project, onClose, onSubmit }: ProjectFormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    tech: [''],
    category: 'it_ops' as 'it_ops' | 'ai' | 'data' | 'backend' | 'fullstack'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 初始化表单数据
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        link: project.link,
        tech: project.tech.length > 0 ? project.tech : [''],
        category: project.category || 'it_ops'
      })
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        link: '',
        tech: [''],
        category: 'it_ops'
      })
    }
  }, [project])

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 验证表单数据
      if (!formData.title.trim()) {
        throw new Error('项目标题不能为空')
      }
      if (!formData.description.trim()) {
        throw new Error('项目描述不能为空')
      }
      if (!formData.link.trim()) {
        throw new Error('项目链接不能为空')
      }
      
      // 清理技术栈数组（移除空字符串）
      const cleanedTech = formData.tech.filter(tech => tech.trim() !== '')

      if (project) {
        // 更新现有项目
        const updateData: ProjectUpdateData = {
          title: formData.title,
          description: formData.description,
          image: formData.image,
          link: formData.link,
          tech: cleanedTech,
          category: formData.category
        }
        await ProjectAdminService.updateProject(project.id, updateData)
      } else {
        // 创建新项目
        const createData: ProjectCreateData = {
          title: formData.title,
          description: formData.description,
          image: formData.image,
          link: formData.link,
          tech: cleanedTech,
          category: formData.category
        }
        await ProjectAdminService.createProject(createData)
      }

      onSubmit()
    } catch (err) {
      console.error('保存项目失败:', err)
      setError(err instanceof Error ? err.message : '保存项目失败')
    } finally {
      setLoading(false)
    }
  }

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 处理技术栈变化
  const handleTechChange = (index: number, value: string) => {
    const newTech = [...formData.tech]
    newTech[index] = value
    setFormData(prev => ({
      ...prev,
      tech: newTech
    }))
  }

  // 添加技术栈字段
  const addTechField = () => {
    setFormData(prev => ({
      ...prev,
      tech: [...prev.tech, '']
    }))
  }

  // 移除技术栈字段
  const removeTechField = (index: number) => {
    if (formData.tech.length > 1) {
      const newTech = formData.tech.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        tech: newTech
      }))
    }
  }

  // 获取分类标签
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'it_ops': return 'IT运维'
      case 'ai': return '人工智能'
      case 'data': return '数据处理'
      case 'backend': return '后端开发'
      case 'fullstack': return '全栈开发'
      default: return '未分类'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="cyber-card border-cyber-cyan/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* 模态框头部 */}
        <div className="flex items-center justify-between p-6 border-b border-cyber-cyan/30">
          <h2 className="text-xl font-bold text-cyber-cyan">
            {project ? '编辑项目' : '添加新项目'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-cyber-gray/30 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="m-6 flex items-center gap-3 p-4 bg-cyber-red/15 border border-cyber-red/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-cyber-red flex-shrink-0" />
            <p className="text-sm text-cyber-red">{error}</p>
          </div>
        )}

        {/* 表单内容 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 项目标题 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white/70 mb-2">
              项目标题 *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
              placeholder="例如：智能监控系统、AI助手、数据分析平台"
              disabled={loading}
            />
          </div>

          {/* 项目描述 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white/70 mb-2">
              项目描述 *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent resize-none"
              placeholder="详细描述项目功能、技术特点和实现效果..."
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 项目链接 */}
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-white/70 mb-2">
                项目链接 *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-cyan/70" />
                <input
                  id="link"
                  name="link"
                  type="url"
                  required
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
                  placeholder="https://github.com/yourname/project"
                  disabled={loading}
                />
              </div>
            </div>

            {/* 项目分类 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white/70 mb-2">
                项目分类 *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
                disabled={loading}
              >
                <option value="it_ops">IT运维</option>
                <option value="ai">人工智能</option>
                <option value="data">数据处理</option>
                <option value="backend">后端开发</option>
                <option value="fullstack">全栈开发</option>
              </select>
            </div>
          </div>

          {/* 项目图片 */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              项目图片
            </label>
            <ImageUploader
              onUploadComplete={(url) => {
                setFormData(prev => ({
                  ...prev,
                  image: url
                }))
              }}
              currentImageUrl={formData.image}
              folder="projects"
              maxSizeMB={5}
            />
          </div>

          {/* 技术栈 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-white/70">
                技术栈 *
              </label>
              <button
                type="button"
                onClick={addTechField}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-cyber-cyan/20 border border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/30 rounded-lg transition-colors"
                disabled={loading}
              >
                <Tag className="w-4 h-4" />
                添加技术
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.tech.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
                    placeholder="例如：React、Node.js、Python"
                    disabled={loading}
                  />
                  {formData.tech.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTechField(index)}
                      className="px-3 py-2 bg-cyber-red/20 border border-cyber-red/50 text-cyber-red hover:bg-cyber-red/30 rounded-lg transition-colors"
                      disabled={loading}
                    >
                      移除
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <p className="mt-2 text-xs text-white/50">
              技术栈将显示在项目卡片上，用于展示项目使用的核心技术。
            </p>
          </div>

          {/* 表单操作 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cyber-button bg-cyber-gray border-cyber-gray hover:bg-cyber-red hover:border-cyber-red"
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-purple hover:border-cyber-purple flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  保存中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  保存项目
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}