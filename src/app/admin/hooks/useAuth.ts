'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User, Session } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

export interface AuthActions {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })
  const router = useRouter()

  useEffect(() => {
    // 如果Supabase客户端未初始化，直接返回
    if (!supabase) {
      setState(prev => ({ ...prev, loading: false, error: 'Supabase客户端未初始化' }))
      return
    }

    // 检查当前会话
    const checkSession = async () => {
      if (!supabase) {
        setState(prev => ({ ...prev, loading: false, error: 'Supabase客户端未初始化' }))
        return
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        setState({
          user: session?.user || null,
          session: session,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('获取会话失败:', error)
        setState(prev => ({ ...prev, loading: false, error: error instanceof Error ? error.message : '获取会话失败' }))
      }
    }

    checkSession()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setState({
          user: session?.user || null,
          session: session,
          loading: false,
          error: null
        })

        // 登录成功后重定向到管理后台
        if (event === 'SIGNED_IN' && session) {
          router.push('/admin')
        }

        // 登出后重定向到登录页面
        if (event === 'SIGNED_OUT') {
          router.push('/admin/login')
        }
      }
    )

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase客户端未初始化' }
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) {
        setState(prev => ({ ...prev, loading: false, error: error.message }))
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '登录失败'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      return { error: errorMessage }
    }
  }

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase客户端未初始化' }
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signUp({ email, password })
      
      if (error) {
        setState(prev => ({ ...prev, loading: false, error: error.message }))
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '注册失败'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      return { error: errorMessage }
    }
  }

  const signOut = async () => {
    if (!supabase) {
      return
    }

    try {
      setState(prev => ({ ...prev, loading: true }))
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error('登出失败:', error)
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : '登出失败' }))
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const resetPassword = async (email: string) => {
    if (!supabase) {
      return { error: 'Supabase客户端未初始化' }
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`
      })
      
      if (error) {
        setState(prev => ({ ...prev, loading: false, error: error.message }))
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '重置密码失败'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      return { error: errorMessage }
    }
  }

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAuthenticated: !!state.user
  }
}