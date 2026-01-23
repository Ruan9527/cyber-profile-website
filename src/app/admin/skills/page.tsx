'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Filter,
  Server,
  Brain,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { SkillAdminService } from '@/lib/skillAdminService'
import { Skill } from '@/types'
import SkillFormModal from '../components/SkillFormModal'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'

interface SkillWithId extends Skill {
  id: string
}

export default function SkillsManagementPage() {
  const [skills, setSkills] = useState<SkillWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillWithId | null>(null)
  const [editingSkill, setEditingSkill] = useState<SkillWithId | null>(null)

  // 加载技能数据
  const loadSkills = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await SkillAdminService.getAllSkills()
      setSkills(data)
    } catch (err) {
      console.error('加载技能失败:', err)
      setError(err instanceof Error ? err.message : '加载技能失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSkills()
  }, [])

  // 过滤技能
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || skill.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // 分类统计
  const categoryStats = {
    it_ops: skills.filter(s => s.category === 'it_ops').length,
    ai: skills.filter(s => s.category === 'ai').length,
    total: skills.length
  }

  // 处理添加技能
  const handleAddSkill = () => {
    setEditingSkill(null)
    setShowFormModal(true)
  }

  // 处理编辑技能
  const handleEditSkill = (skill: SkillWithId) => {
    setEditingSkill(skill)
    setShowFormModal(true)
  }

  // 处理删除技能
  const handleDeleteSkill = (skill: SkillWithId) => {
    setSelectedSkill(skill)
    setShowDeleteModal(true)
  }

  // 确认删除
  const confirmDelete = async () => {
    if (!selectedSkill) return

    try {
      await SkillAdminService.deleteSkill(selectedSkill.id)
      await loadSkills() // 重新加载数据
      setShowDeleteModal(false)
      setSelectedSkill(null)
    } catch (err) {
      console.error('删除技能失败:', err)
      setError(err instanceof Error ? err.message : '删除技能失败')
    }
  }

  // 导出技能数据
  const handleExport = () => {
    const dataStr = JSON.stringify(skills, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `skills-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // 处理表单提交
  const handleFormSubmit = async () => {
    await loadSkills() // 重新加载数据
    setShowFormModal(false)
  }

  // 获取熟练度颜色
  const getLevelColor = (level: number) => {
    if (level >= 90) return 'text-cyber-green'
    if (level >= 70) return 'text-cyber-yellow'
    if (level >= 50) return 'text-cyber-orange'
    return 'text-cyber-red'
  }

  // 获取分类图标和颜色
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'it_ops':
        return { icon: Server, color: 'text-cyber-cyan', bgColor: 'bg-cyber-cyan/15' }
      case 'ai':
        return { icon: Brain, color: 'text-cyber-purple', bgColor: 'bg-cyber-purple/15' }
      default:
        return { icon: Server, color: 'text-cyber-gray', bgColor: 'bg-cyber-gray/15' }
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-cyan mb-2"
              style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
            技能管理
          </h1>
          <p className="text-white/70">管理网站展示的技术技能</p>
        </div>
        <button
          onClick={handleAddSkill}
          className="cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-purple hover:border-cyber-purple flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加技能
        </button>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cyber-card border-cyber-cyan/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">IT运维技能</p>
              <p className="text-2xl font-bold">{categoryStats.it_ops}</p>
            </div>
            <div className="p-3 bg-cyber-cyan/15 rounded-lg">
              <Server className="w-6 h-6 text-cyber-cyan" />
            </div>
          </div>
        </div>
        <div className="cyber-card border-cyber-purple/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">AI技能</p>
              <p className="text-2xl font-bold">{categoryStats.ai}</p>
            </div>
            <div className="p-3 bg-cyber-purple/15 rounded-lg">
              <Brain className="w-6 h-6 text-cyber-purple" />
            </div>
          </div>
        </div>
        <div className="cyber-card border-cyber-yellow/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">总技能数</p>
              <p className="text-2xl font-bold">{categoryStats.total}</p>
            </div>
            <div className="p-3 bg-cyber-yellow/15 rounded-lg">
              <CheckCircle className="w-6 h-6 text-cyber-yellow" />
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="cyber-card border-cyber-gray/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-cyan/70" />
            <input
              type="text"
              placeholder="搜索技能..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
            />
          </div>

          {/* 分类筛选 */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-cyan/70" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
            >
              <option value="all">所有分类</option>
              <option value="it_ops">IT运维</option>
              <option value="ai">人工智能</option>
            </select>
          </div>

          {/* 操作按钮组 */}
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex-1 cyber-button bg-cyber-gray border-cyber-gray hover:bg-cyber-cyan hover:border-cyber-cyan flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              导出
            </button>
            <button
              className="flex-1 cyber-button bg-cyber-gray border-cyber-gray hover:bg-cyber-purple hover:border-cyber-purple flex items-center justify-center gap-2"
              onClick={() => alert('导入功能即将推出')}
            >
              <Upload className="w-4 h-4" />
              导入
            </button>
          </div>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="cyber-card border-cyber-red/50 bg-cyber-red/10">
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-cyber-red" />
            <p className="text-cyber-red">{error}</p>
          </div>
        </div>
      )}

      {/* 技能列表 */}
      <div className="cyber-card border-cyber-gray/30">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-cyan"></div>
            <p className="mt-4 text-cyber-cyan">加载技能数据中...</p>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70">暂无技能数据</p>
            {searchTerm || categoryFilter !== 'all' ? (
              <p className="mt-2 text-sm text-white/50">尝试调整搜索条件</p>
            ) : (
              <button
                onClick={handleAddSkill}
                className="mt-4 cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-purple hover:border-cyber-purple"
              >
                添加第一个技能
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyber-gray/30">
                  <th className="text-left py-3 px-4 text-white/70 font-medium">技能名称</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">分类</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">熟练度</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">描述</th>
                  <th className="text-left py-3 px-4 text-white/70 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkills.map((skill) => {
                  const { icon: CategoryIcon, color, bgColor } = getCategoryInfo(skill.category)
                  const levelColor = getLevelColor(skill.level)
                  
                  return (
                    <tr key={skill.id} className="border-b border-cyber-gray/10 hover:bg-cyber-gray/5">
                      <td className="py-3 px-4">
                        <div className="font-medium">{skill.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 ${bgColor} rounded-lg`}>
                            <CategoryIcon className={`w-4 h-4 ${color}`} />
                          </div>
                          <span className={color}>
                            {skill.category === 'it_ops' ? 'IT运维' : '人工智能'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`font-bold ${levelColor}`}>{skill.level}%</div>
                          <div className="flex-1 h-2 bg-cyber-black/50 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${skill.category === 'it_ops' ? 'from-cyber-cyan to-cyber-cyan/80' : 'from-cyber-purple to-cyber-purple/80'}`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-white/70 max-w-xs truncate">
                          {skill.description || '无描述'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditSkill(skill)}
                            className="p-2 text-cyber-cyan hover:bg-cyber-cyan/10 rounded-lg transition-colors"
                            title="编辑"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill)}
                            className="p-2 text-cyber-red hover:bg-cyber-red/10 rounded-lg transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 表单模态框 */}
      {showFormModal && (
        <SkillFormModal
          skill={editingSkill}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* 删除确认模态框 */}
      {showDeleteModal && selectedSkill && (
        <DeleteConfirmationModal
          title="确认删除技能"
          message={`确定要删除技能 "${selectedSkill.name}" 吗？此操作不可撤销。`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false)
            setSelectedSkill(null)
          }}
        />
      )}
    </div>
  )
}