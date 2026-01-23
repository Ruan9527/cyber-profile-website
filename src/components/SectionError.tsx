'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react'

interface SectionErrorProps {
  title?: string
  message: string
  onRetry?: () => void
  showOfflineIndicator?: boolean
}

export const SectionError: React.FC<SectionErrorProps> = ({
  title = "加载失败",
  message,
  onRetry,
  showOfflineIndicator = false
}) => {
  const isOffline = !navigator.onLine

  return (
    <div className="text-center py-12">
      <div className="inline-flex flex-col items-center gap-4">
        {/* 错误图标 */}
        <div className="relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyber-red/15 border-2 border-cyber-red/50 rounded-full">
            <AlertTriangle className="w-8 h-8 text-cyber-red" />
          </div>
          {/* 离线指示器 */}
          {showOfflineIndicator && isOffline && (
            <div className="absolute -top-2 -right-2">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-cyber-gray/80 border border-cyber-gray/60 rounded-full">
                <WifiOff className="w-3 h-3 text-cyber-red" />
              </div>
            </div>
          )}
        </div>

        {/* 错误标题 */}
        <div>
          <h3 className="font-display text-xl font-bold text-cyber-red mb-2"
              style={{ textShadow: '0 0 15px rgba(255, 102, 128, 0.5)' }}>
            {title}
          </h3>
          <p className="text-white/70 mb-4 max-w-sm mx-auto leading-relaxed">
            {message}
          </p>
        </div>

        {/* 网络状态提示 */}
        {showOfflineIndicator && (
          <div className="flex items-center gap-2 text-cyber-yellow text-sm">
            {isOffline ? (
              <>
                <WifiOff className="w-4 h-4" />
                网络连接已断开
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4" />
                网络连接正常
              </>
            )}
          </div>
        )}

        {/* 重试按钮 */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            重试加载
          </button>
        )}
      </div>
    </div>
  )
}

// 专门用于SkillsSection的错误组件
export const SkillsError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <SectionError
    title="技能数据加载失败"
    message="无法获取技能信息，请检查网络连接或稍后重试。"
    onRetry={onRetry}
    showOfflineIndicator={true}
  />
)

// 专门用于ProjectsSection的错误组件
export const ProjectsError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <SectionError
    title="项目数据加载失败"
    message="无法获取项目信息，请检查网络连接或稍后重试。"
    onRetry={onRetry}
    showOfflineIndicator={true}
  />
)

export default SectionError