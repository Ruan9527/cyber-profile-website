'use client'

import { useState, useEffect } from 'react'
import { Users, MessageSquare, Download, TrendingUp } from 'lucide-react'
import { Stats } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StatsSection() {
  const { t } = useLanguage()
  const [stats, setStats] = useState<Stats>({
    totalVisitors: 1247,
    totalMessages: 89,
    totalDownloads: 156,
    todayVisitors: 42
  })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // 只在首次加载时触发动画
    const timer = setTimeout(() => setHasAnimated(true), 100)
    
    // 减少数据更新频率
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 3),
        todayVisitors: prev.todayVisitors + (Math.random() > 0.85 ? 1 : 0)
      }))
    }, 10000) // 从5000ms增加到10000ms

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const statCards = [
    {
      title: "Total Visitors",
      value: stats.totalVisitors.toLocaleString(),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      color: "cyber-cyan",
      description: "All-time visitors"
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      change: "+8.2%",
      changeType: "positive" as const,
      icon: MessageSquare,
      color: "cyber-yellow",
      description: "Guest book entries"
    },
    {
      title: "Downloads",
      value: stats.totalDownloads,
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Download,
      color: "cyber-red",
      description: "Resume downloads"
    },
    {
      title: "Today's Visitors",
      value: stats.todayVisitors,
      change: "+5.7%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "cyber-gray",
      description: "Visitors today"
    }
  ]

  return (
    <section className="py-12 px-4 relative bg-gradient-to-b from-cyber-black to-cyber-gray/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8"
            style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
          <span className="text-cyber-cyan">{t('stats.title')}</span>
        </h2>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className={`cyber-card group relative overflow-hidden ${hasAnimated ? 'animate-pulse-glow' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Enhanced glitch overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyber-cyan/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 text-center p-6">
                  <div className={`p-3 bg-${stat.color}/15 border-2 border-${stat.color}/50 rounded-lg inline-flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                       style={{ boxShadow: `0 0 15px rgba(0, 240, 255, 0.3)` }}>
                    <Icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>

                  <div className="text-3xl font-bold text-cyber-cyan mb-2 group-hover:scale-105 transition-transform"
                      style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
                    {stat.value}
                  </div>

                  <div className="text-sm font-bold text-cyber-yellow mb-1"
                      style={{ textShadow: '0 0 10px rgba(252, 238, 10, 0.3)' }}>
                    {stat.title}
                  </div>

                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                </div>

                {/* Animated border effect */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-pulse"
                     style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
