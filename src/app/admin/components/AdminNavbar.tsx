'use client'

import { useState } from 'react'
import { Menu, X, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    // 登出后重定向到登录页面
    window.location.href = '/admin/login'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/90 backdrop-blur-lg border-b border-cyber-cyan/30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo和品牌 */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-cyber-cyan hover:bg-cyber-cyan/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center ml-4 lg:ml-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg"></div>
              <span className="ml-3 text-xl font-bold text-cyber-cyan">
                管理后台
              </span>
            </div>
          </div>

          {/* 用户菜单 */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-cyber-gray/30 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.email || '管理员'}</p>
                  <p className="text-xs text-white/50">管理员</p>
                </div>
              </button>

              {/* 用户下拉菜单 */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-cyber-black border border-cyber-cyan/30 rounded-lg shadow-lg py-1">
                  <div className="px-4 py-2 border-b border-cyber-gray/30">
                    <p className="text-sm font-medium">{user?.email || '管理员'}</p>
                    <p className="text-xs text-white/50">管理员</p>
                  </div>
                  <a
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-cyber-gray/30 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    设置
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-cyber-red hover:bg-cyber-red/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyber-gray/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-cyber-cyan/10"
            >
              仪表板
            </a>
            <a
              href="/admin/skills"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-cyber-cyan/10"
            >
              技能管理
            </a>
            <a
              href="/admin/projects"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-cyber-cyan/10"
            >
              项目管理
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}