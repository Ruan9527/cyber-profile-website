'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function AuthGuard({ children, requireAdmin = true }: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // 如果未在加载中且未认证，重定向到登录页面
    if (!loading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [loading, isAuthenticated, router])

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-black via-cyber-gray/10 to-cyber-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyber-cyan"></div>
          <p className="mt-4 text-cyber-cyan">验证身份中...</p>
        </div>
      </div>
    )
  }

  // 开发模式下跳过认证检查（临时解决方案）
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment && !isAuthenticated) {
    console.warn('开发模式：跳过认证检查')
    return <>{children}</>
  }

  // 如果未认证，显示重定向提示
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-black via-cyber-gray/10 to-cyber-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyber-cyan"></div>
          <p className="mt-4 text-cyber-cyan">正在重定向到登录页面...</p>
        </div>
      </div>
    )
  }

  // 如果需要管理员权限，检查用户角色
  if (requireAdmin) {
    // 这里可以添加管理员权限检查
    // 例如：检查用户是否具有管理员角色
    // 暂时假设所有认证用户都是管理员
    // const isAdmin = user?.user_metadata?.role === 'admin'
    // if (!isAdmin) {
    //   return <div>权限不足</div>
    // }
  }

  // 已认证，渲染子内容
  return <>{children}</>
}