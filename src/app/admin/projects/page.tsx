'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Filter,
  FolderKanban,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { ProjectAdminService } from '@/lib/projectAdminService'
import { Project } from '@/types'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import ProjectFormModal from '../components/ProjectFormModal'

interface ProjectWithId extends Project {
  id: string
}

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<ProjectWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectWithId | null>(null)

  // 加载项目数据
  const loadProjects = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await ProjectAdminService.getAllProjects()
      setProjects(data)
    } catch (err) {
      console.error('加载项目失败:', err)
      setError(err instanceof Error ? err.message : '加载项目失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  // 过滤项目
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // 分类统计
  const categoryStats = {
    it_ops: projects.filter(p => p.category === 'it_ops').length,
    ai: projects.filter(p => p.category === 'ai').length,
    data: projects.filter(p => p.category === 'data').length,
    backend: projects.filter(p => p.category === 'backend').length,
    fullstack: projects.filter(p => p.category === 'fullstack').length,
    healthcare_it: projects.filter(p => p.category === 'healthcare_it').length,
    total: projects.length
  }

  // 处理删除项目
  const handleDeleteProject = (project: ProjectWithId) => {
    setSelectedProject(project)
    setShowDeleteModal(true)
  }

  // 确认删除
  const confirmDelete = async () => {
    if (!selectedProject) return

    try {
      await ProjectAdminService.deleteProject(selectedProject.id)
      await loadProjects() // 重新加载数据
      setShowDeleteModal(false)
      setSelectedProject(null)
    } catch (err) {
      console.error('删除项目失败:', err)
      setError(err instanceof Error ? err.message : '删除项目失败')
    }
  }

  // 处理编辑项目
  const handleEditProject = (project: ProjectWithId) => {
    setSelectedProject(project)
    setShowProjectModal(true)
  }

  // 处理项目表单提交完成
  const handleProjectFormSubmit = () => {
    setShowProjectModal(false)
    setSelectedProject(null)
    loadProjects() // 重新加载数据
  }

  // 获取分类颜色
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'it_ops': return 'text-cyber-cyan'
      case 'ai': return 'text-cyber-purple'
      case 'data': return 'text-cyber-orange'
      case 'backend': return 'text-cyber-red'
      case 'fullstack': return 'text-cyber-yellow'
      case 'healthcare_it': return 'text-cyber-pink'
      default: return 'text-cyber-gray'
    }
  }

  // 获取分类背景色
  const getCategoryBgColor = (category?: string) => {
    switch (category) {
      case 'it_ops': return 'bg-cyber-cyan/15'
      case 'ai': return 'bg-cyber-purple/15'
      case 'data': return 'bg-cyber-orange/15'
      case 'backend': return 'bg-cyber-red/15'
      case 'fullstack': return 'bg-cyber-yellow/15'
      case 'healthcare_it': return 'bg-cyber-pink/15'
      default: return 'bg-cyber-gray/15'
    }
  }

  // 获取分类标签
  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'it_ops': return 'IT运维'
      case 'ai': return '人工智能'
      case 'data': return '数据处理'
      case 'backend': return '后端开发'
      case 'fullstack': return '全栈开发'
      case 'healthcare_it': return '医疗信息化'
      default: return '未分类'
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyber-cyan mb-2"
              style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
            项目管理
          </h1>
          <p className="text-white/70">管理网站展示的项目案例</p>
        </div>
        <button
          onClick={() => {
            setSelectedProject(null)
            setShowProjectModal(true)
          }}
          className="cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-purple hover:border-cyber-purple flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加项目
        </button>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="cyber-card border-cyber-cyan/30">
          <div className="text-center">
            <p className="text-sm text-white/70">IT运维</p>
            <p className="text-2xl font-bold text-cyber-cyan">{categoryStats.it_ops}</p>
          </div>
        </div>
        <div className="cyber-card border-cyber-purple/30">
          <div className="text-center">
            <p className="text-sm text-white/70">人工智能</p>
            <p className="text-2xl font-bold text-cyber-purple">{categoryStats.ai}</p>
          </div>
        </div>
        <div className="cyber-card border-cyber-orange/30">
          <div className="text-center">
            <p className="text-sm text-white/70">数据处理</p>
            <p className="text-2xl font-bold text-cyber-orange">{categoryStats.data}</p>
          </div>
        </div>
        <div className="cyber-card border-cyber-red/30">
          <div className="text-center">
            <p className="text-sm text-white/70">后端开发</p>
            <p className="text-2xl font-bold text-cyber-red">{categoryStats.backend}</p>
          </div>
        </div>
        <div className="cyber-card border-cyber-yellow/30">
          <div className="text-center">
            <p className="text-sm text-white/70">全栈开发</p>
            <p className="text-2xl font-bold text-cyber-yellow">{categoryStats.fullstack}</p>
          </div>
        </div>
        <div className="cyber-card border-cyber-pink/30">
          <div className="text-center">
            <p className="text-sm text-white/70">医疗信息化</p>
            <p className="text-2xl font-bold text-cyber-pink">{categoryStats.healthcare_it}</p>
          </div>
        </div>
        <div className="cyber-card border-cyber-green/30">
          <div className="text-center">
            <p className="text-sm text-white/70">总计</p>
            <p className="text-2xl font-bold text-cyber-green">{categoryStats.total}</p>
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
              placeholder="搜索项目..."
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
              <option value="data">数据处理</option>
              <option value="backend">后端开发</option>
              <option value="fullstack">全栈开发</option>
              <option value="healthcare_it">医疗信息化</option>
            </select>
          </div>

          {/* 操作按钮 */}
          <button
            onClick={loadProjects}
            className="cyber-button bg-cyber-gray border-cyber-gray hover:bg-cyber-cyan hover:border-cyber-cyan flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            刷新数据
          </button>
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

      {/* 项目列表 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-cyan"></div>
          <p className="mt-4 text-cyber-cyan">加载项目数据中...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-2xl mb-4 mx-auto">
            <FolderKanban className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-cyber-cyan mb-2">暂无项目</h3>
          <p className="text-white/70 mb-6">还没有添加任何项目</p>
          <button
            onClick={() => {
              setSelectedProject(null)
              setShowProjectModal(true)
            }}
            className="cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-purple hover:border-cyber-purple"
          >
            添加第一个项目
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="cyber-card border-cyber-gray/30 group">
              {/* 项目图片 */}
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-white/30" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryBgColor(project.category)} ${getCategoryColor(project.category)}`}>
                    {getCategoryLabel(project.category)}
                  </span>
                </div>
              </div>

              {/* 项目信息 */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* 技术栈 */}
                <div>
                  <p className="text-xs text-white/50 mb-2">技术栈</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-cyber-gray/20 border border-cyber-gray/30 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-cyber-gray/20 border border-cyber-gray/30 rounded">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between pt-4 border-t border-cyber-gray/30">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-cyber-cyan hover:text-cyber-purple transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    查看项目
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="p-2 text-cyber-cyan hover:bg-cyber-cyan/10 rounded-lg transition-colors"
                      title="编辑"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="p-2 text-cyber-red hover:bg-cyber-red/10 rounded-lg transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 删除确认模态框 */}
      {showDeleteModal && selectedProject && (
        <DeleteConfirmationModal
          title="确认删除项目"
          message={`确定要删除项目 "${selectedProject.title}" 吗？此操作不可撤销。`}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false)
            setSelectedProject(null)
          }}
        />
      )}

      {/* 项目表单模态框 */}
      {showProjectModal && (
        <ProjectFormModal
          project={selectedProject}
          onClose={() => {
            setShowProjectModal(false)
            setSelectedProject(null)
          }}
          onSubmit={handleProjectFormSubmit}
        />
      )}
    </div>
  )
}