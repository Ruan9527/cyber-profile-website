'use client'

import { useState } from 'react'
import { 
  Home, 
  Server, 
  FolderKanban, 
  Image, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: '仪表板', href: '/admin', icon: Home },
  { name: '技能管理', href: '/admin/skills', icon: Server },
  { name: '项目管理', href: '/admin/projects', icon: FolderKanban },
  { name: '媒体库', href: '/admin/media', icon: Image },
  { name: '设置', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={`
      hidden lg:flex flex-col border-r border-cyber-cyan/30 
      bg-cyber-black/50 backdrop-blur-lg transition-all duration-300
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
      {/* 侧边栏头部 */}
      <div className="p-4 border-b border-cyber-cyan/30">
        <div className={`flex items-center justify-between ${collapsed ? 'justify-center' : ''}`}>
          {!collapsed && (
            <h2 className="text-lg font-bold text-cyber-cyan">管理面板</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-cyber-cyan/10 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-cyber-cyan" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-cyber-cyan" />
            )}
          </button>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-cyber-cyan/20 border border-cyber-cyan/50 text-cyber-cyan' 
                      : 'hover:bg-cyber-gray/30 text-white/70 hover:text-white'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyber-cyan' : ''}`} />
                  {!collapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 侧边栏底部 */}
      <div className="p-4 border-t border-cyber-cyan/30">
        {!collapsed && (
          <div className="text-xs text-white/50">
            <p>© 2024 赛博朋克个人网站</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  )
}