'use client'

import { useState, useEffect } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'
import { SkillAdminService } from '@/lib/skillAdminService'
import { Skill } from '@/types'

interface SkillFormModalProps {
  skill: (Skill & { id: string }) | null
  onClose: () => void
  onSubmit: () => void
}

export default function SkillFormModal({ skill, onClose, onSubmit }: SkillFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: 'it_ops' as 'it_ops' | 'ai',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 初始化表单数据
  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        level: skill.level,
        category: skill.category,
        description: skill.description || ''
      })
    } else {
      setFormData({
        name: '',
        level: 50,
        category: 'it_ops',
        description: ''
      })
    }
  }, [skill])

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 验证表单数据
      if (!formData.name.trim()) {
        throw new Error('技能名称不能为空')
      }
      if (formData.level < 0 || formData.level > 100) {
        throw new Error('熟练度必须在 0-100 之间')
      }

      if (skill) {
        // 更新现有技能
        await SkillAdminService.updateSkill(skill.id, {
          name: formData.name,
          level: formData.level,
          category: formData.category,
          description: formData.description || undefined
        })
      } else {
        // 创建新技能
        await SkillAdminService.createSkill({
          name: formData.name,
          level: formData.level,
          category: formData.category,
          description: formData.description || undefined
        })
      }

      onSubmit()
    } catch (err) {
      console.error('保存技能失败:', err)
      setError(err instanceof Error ? err.message : '保存技能失败')
    } finally {
      setLoading(false)
    }
  }

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  // 熟练度颜色
  const getLevelColor = (level: number) => {
    if (level >= 90) return 'text-cyber-green'
    if (level >= 70) return 'text-cyber-yellow'
    if (level >= 50) return 'text-cyber-orange'
    return 'text-cyber-red'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="cyber-card border-cyber-cyan/30 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* 模态框头部 */}
        <div className="flex items-center justify-between p-6 border-b border-cyber-cyan/30">
          <h2 className="text-xl font-bold text-cyber-cyan">
            {skill ? '编辑技能' : '添加新技能'}
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
          {/* 技能名称 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
              技能名称 *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
              placeholder="例如：React、Docker、Python"
              disabled={loading}
            />
          </div>

          {/* 分类选择 */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white/70 mb-2">
              分类 *
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
            </select>
          </div>

          {/* 熟练度 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="level" className="text-sm font-medium text-white/70">
                熟练度 *
              </label>
              <span className={`text-lg font-bold ${getLevelColor(formData.level)}`}>
                {formData.level}%
              </span>
            </div>
            <input
              id="level"
              name="level"
              type="range"
              min="0"
              max="100"
              step="1"
              value={formData.level}
              onChange={handleChange}
              className="w-full h-2 bg-cyber-black/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyber-cyan"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-white/50 mt-2">
              <span>新手</span>
              <span>熟练</span>
              <span>精通</span>
              <span>专家</span>
            </div>
          </div>

          {/* 描述 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white/70 mb-2">
              描述
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent resize-none"
              placeholder="技能的简要描述..."
              disabled={loading}
            />
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
                  保存技能
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}