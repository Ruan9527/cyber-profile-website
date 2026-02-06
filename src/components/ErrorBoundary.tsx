'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // 在生产环境中，这里可以发送错误报告到监控服务
    // reportError(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义的 fallback UI，使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误 UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-black via-cyber-gray/10 to-cyber-black p-4">
          <div className="max-w-md w-full">
            <div className="cyber-card border-cyber-red/50 p-8 text-center">
              {/* 错误图标 */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyber-red/15 border-2 border-cyber-red/50 rounded-full mb-6">
                <AlertTriangle className="w-8 h-8 text-cyber-red" />
              </div>

              {/* 错误标题 */}
              <h2 className="font-display text-2xl font-bold text-cyber-red mb-4"
                  style={{ textShadow: '0 0 15px rgba(255, 102, 128, 0.5)' }}>
                出错了！
              </h2>

              {/* 错误描述 */}
              <p className="text-white/80 mb-6 leading-relaxed">
                抱歉，页面出现了一些问题。请尝试刷新页面或返回首页。
              </p>

              {/* 开发环境下的错误详情 */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="text-cyber-yellow cursor-pointer mb-2 hover:text-cyber-yellow/80">
                    查看错误详情 (开发环境)
                  </summary>
                  <div className="bg-cyber-black/50 p-4 rounded-lg border border-cyber-gray/30 text-xs font-mono text-cyber-red overflow-auto max-h-32">
                    <div className="mb-2">
                      <strong>错误:</strong> {this.state.error.message}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>组件栈:</strong>
                        <pre className="whitespace-pre-wrap mt-1">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-purple hover:border-cyber-purple flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  重新加载
                </button>
                <a
                  href="/"
                  className="cyber-button bg-cyber-gray border-cyber-gray hover:bg-cyber-cyan hover:border-cyber-cyan flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  返回首页
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook版本的错误边界 (React 18+)
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { setError, resetError }
}

export default ErrorBoundary