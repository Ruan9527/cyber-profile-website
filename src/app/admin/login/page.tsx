'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { signIn, loading, error } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      return
    }

    const result = await signIn(email, password)
    
    if (!result.error) {
      // 登录成功，useAuth hook会处理重定向
    }
  }

  const handleForgotPassword = () => {
    // 实现忘记密码功能
    alert('请联系管理员重置密码')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-black via-cyber-gray/10 to-cyber-black p-4">
      <div className="w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-2xl mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-cyber-cyan mb-2"
              style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
            管理后台登录
          </h1>
          <p className="text-white/70">请输入您的凭据以继续</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="cyber-card border-cyber-cyan/30 p-6 space-y-6">
          {/* 错误提示 */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-cyber-red/15 border border-cyber-red/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-cyber-red" />
              <p className="text-sm text-cyber-red">{error}</p>
            </div>
          )}

          {/* 邮箱输入 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
              邮箱地址
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-cyber-cyan/70" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
                placeholder="admin@example.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* 密码输入 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
              密码
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-cyber-cyan/70" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-12 py-3 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-transparent"
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-cyber-cyan/70 hover:text-cyber-cyan" />
                ) : (
                  <Eye className="h-5 w-5 text-cyber-cyan/70 hover:text-cyber-cyan" />
                )}
              </button>
            </div>
          </div>

          {/* 记住我和忘记密码 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 bg-cyber-black/50 border-cyber-cyan/30 rounded focus:ring-cyber-cyan"
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                记住我
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-cyber-cyan hover:text-cyber-cyan/80 transition-colors"
              disabled={loading}
            >
              忘记密码？
            </button>
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-purple hover:border-cyber-purple disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                登录中...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                登录
              </>
            )}
          </button>

          {/* 演示凭据提示 */}
          <div className="text-center">
            <p className="text-xs text-white/50">
              演示凭据: admin@example.com / password
            </p>
          </div>
        </form>

        {/* 返回首页链接 */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-cyber-cyan hover:text-cyber-cyan/80 transition-colors"
          >
            ← 返回网站首页
          </a>
        </div>
      </div>
    </div>
  )
}