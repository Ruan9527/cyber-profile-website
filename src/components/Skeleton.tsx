'use client'

import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  width?: string | number
  height?: string | number
  animation?: boolean
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = true
}) => {
  const baseClasses = 'bg-cyber-gray/20 border border-cyber-gray/30'

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  }

  const animationClass = animation ? 'animate-pulse' : ''

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClass} ${className}`}
      style={style}
    />
  )
}

// 专门用于SkillsSection的骨架屏
export const SkillsSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="cyber-card space-y-4 p-6">
        {/* 分类标题骨架 */}
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="text" width={120} height={24} className="font-display" />
        </div>

        {/* 技能条目骨架 */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, skillIndex) => (
            <div key={skillIndex} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton variant="text" width={100} height={16} />
                <Skeleton variant="text" width={40} height={16} />
              </div>
              <Skeleton variant="rectangular" height={8} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

// 专门用于ProjectsSection的骨架屏
export const ProjectsSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="cyber-card overflow-hidden">
        {/* 项目图片骨架 */}
        <Skeleton variant="rectangular" height={208} className="w-full mb-5" />

        {/* 项目内容骨架 */}
        <div className="space-y-3 p-6">
          <Skeleton variant="text" width={180} height={24} className="font-display" />
          <div className="space-y-2">
            <Skeleton variant="text" width="100%" height={16} />
            <Skeleton variant="text" width="80%" height={16} />
          </div>
          {/* 技术栈骨架 */}
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, techIndex) => (
              <Skeleton key={techIndex} variant="rectangular" width={80} height={24} className="rounded" />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)

// 通用卡片骨架屏
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="cyber-card p-6 space-y-4">
        <Skeleton variant="text" width={120} height={24} className="font-display" />
        <div className="space-y-2">
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="80%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="rectangular" width={60} height={32} className="rounded" />
        </div>
      </div>
    ))}
  </div>
)

export default Skeleton