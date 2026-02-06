import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card'
import { Server, FolderKanban, Users, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: '总技能数',
      value: '16',
      icon: Server,
      color: 'text-cyber-cyan',
      bgColor: 'bg-cyber-cyan/15',
      borderColor: 'border-cyber-cyan/30',
    },
    {
      title: '总项目数',
      value: '8',
      icon: FolderKanban,
      color: 'text-cyber-purple',
      bgColor: 'bg-cyber-purple/15',
      borderColor: 'border-cyber-purple/30',
    },
    {
      title: '今日访问量',
      value: '0',
      icon: Users,
      color: 'text-cyber-yellow',
      bgColor: 'bg-cyber-yellow/15',
      borderColor: 'border-cyber-yellow/30',
    },
    {
      title: '数据更新',
      value: '刚刚',
      icon: BarChart3,
      color: 'text-cyber-red',
      bgColor: 'bg-cyber-red/15',
      borderColor: 'border-cyber-red/30',
    },
  ]

  const recentActivities = [
    { id: 1, action: '添加了新技能', item: 'React Native', time: '10分钟前', user: '管理员' },
    { id: 2, action: '更新了项目', item: 'Kubernetes管理平台', time: '1小时前', user: '管理员' },
    { id: 3, action: '上传了图片', item: 'project-ai-monitoring.jpg', time: '2小时前', user: '管理员' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-cyber-cyan mb-2"
            style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
          管理后台
        </h1>
        <p className="text-white/70">欢迎回来！这里可以管理网站的所有内容。</p>
      </div>

      {/* 统计数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className={`cyber-card border ${stat.borderColor}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cyber-card border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-cyan">快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/skills"
              className="flex items-center justify-between p-3 border border-cyber-cyan/30 rounded-lg hover:bg-cyber-cyan/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyber-cyan/15 rounded-lg">
                  <Server className="w-4 h-4 text-cyber-cyan" />
                </div>
                <span>管理技能</span>
              </div>
              <span className="text-cyber-cyan/70 group-hover:text-cyber-cyan transition-colors">→</span>
            </a>
            <a
              href="/admin/projects"
              className="flex items-center justify-between p-3 border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyber-purple/15 rounded-lg">
                  <FolderKanban className="w-4 h-4 text-cyber-purple" />
                </div>
                <span>管理项目</span>
              </div>
              <span className="text-cyber-purple/70 group-hover:text-cyber-purple transition-colors">→</span>
            </a>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card className="cyber-card border-cyber-purple/30">
          <CardHeader>
            <CardTitle className="text-cyber-purple">最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border border-cyber-gray/30 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}: {activity.item}</p>
                    <p className="text-xs text-white/50">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}