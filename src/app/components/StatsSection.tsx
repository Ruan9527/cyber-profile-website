'use client'

import { useState, useEffect } from 'react'
import { Users, MessageSquare, Download, TrendingUp, Eye, Activity, Zap, Clock } from 'lucide-react'
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
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 3),
        todayVisitors: prev.todayVisitors + (Math.random() > 0.7 ? 1 : 0)
      }))
    }, 5000)

    return () => clearInterval(interval)
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

  const activityData = [
    { time: "00:00", visitors: 12, messages: 2 },
    { time: "04:00", visitors: 8, messages: 0 },
    { time: "08:00", visitors: 25, messages: 5 },
    { time: "12:00", visitors: 45, messages: 12 },
    { time: "16:00", visitors: 38, messages: 8 },
    { time: "20:00", visitors: 52, messages: 15 },
    { time: "23:59", visitors: 18, messages: 3 }
  ]

  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-cyber-black to-cyber-gray/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
          <span className="text-cyber-cyan">{t('stats.title')}</span>
        </h2>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className={`cyber-card group relative overflow-hidden ${isAnimating ? 'animate-pulse' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Enhanced glitch overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyber-cyan/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 bg-${stat.color}/15 border-2 border-${stat.color}/50 rounded-lg group-hover:scale-110 transition-transform`}
                         style={{ boxShadow: `0 0 15px rgba(0, 240, 255, 0.3)` }}>
                      <Icon className={`w-7 h-7 text-${stat.color}`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded"
                         style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.2)' }}>
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="text-4xl font-bold text-cyber-cyan mb-2 group-hover:scale-105 transition-transform"
                        style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
                      {stat.value}
                    </div>
                  </div>

                  <div className="text-sm font-bold text-cyber-yellow mb-1"
                      style={{ textShadow: '0 0 10px rgba(252, 238, 10, 0.3)' }}>
                    {stat.title}
                  </div>

                  <div className="text-xs text-white/70 uppercase tracking-wider">
                    {stat.description}
                  </div>
                </div>

                {/* Enhanced animated border effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-pulse"
                     style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }} />
              </div>
            )
          })}
        </div>

        {/* Activity Chart and Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Chart */}
          <div className="cyber-card">
            <h3 className="font-display text-xl font-bold text-cyber-yellow mb-6 flex items-center gap-3"
                style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.4)' }}>
              <Activity className="w-6 h-6" />
              24-Hour Activity
            </h3>

            <div className="space-y-4">
              {activityData.map((data, index) => (
                <div key={data.time} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/70 font-mono-tech uppercase">
                      {data.time}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-cyber-cyan" />
                        <span className="text-xs text-cyber-cyan font-bold">{data.visitors}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-cyber-yellow" />
                        <span className="text-xs text-cyber-yellow font-bold">{data.messages}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-3 bg-cyber-black/50 border border-cyber-cyan/40 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber-cyan to-cyber-yellow transition-all duration-1000"
                         style={{
                           width: `${(data.visitors / 60) * 100}%`,
                           boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
                         }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="cyber-card">
            <h3 className="font-display text-xl font-bold text-cyber-yellow mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Live Feed
            </h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                { type: 'visitor', message: 'New visitor from United States', time: 'Just now', color: 'cyber-cyan' },
                { type: 'download', message: 'Resume downloaded by John D.', time: '2 min ago', color: 'cyber-red' },
                { type: 'message', message: 'Sarah left a message', time: '5 min ago', color: 'cyber-yellow' },
                { type: 'visitor', message: 'Visitor from Japan viewed portfolio', time: '8 min ago', color: 'cyber-cyan' },
                { type: 'project', message: 'Someone viewed AI Chat project', time: '12 min ago', color: 'cyber-gray' },
                { type: 'download', message: 'Resume downloaded by Maria K.', time: '15 min ago', color: 'cyber-red' },
                { type: 'visitor', message: 'Returning visitor from Germany', time: '18 min ago', color: 'cyber-cyan' },
                { type: 'message', message: 'Mike left a comment', time: '22 min ago', color: 'cyber-yellow' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-cyber-black/30 border-l-2 border-cyber-cyan/50 group hover:bg-cyber-black/50 transition-colors">
                  <div className={`p-2 bg-${activity.color}/10 rounded-lg group-hover:scale-110 transition-transform`}>
                    {activity.type === 'visitor' && <Eye className={`w-4 h-4 text-${activity.color}`} />}
                    {activity.type === 'download' && <Download className={`w-4 h-4 text-${activity.color}`} />}
                    {activity.type === 'message' && <MessageSquare className={`w-4 h-4 text-${activity.color}`} />}
                    {activity.type === 'project' && <Activity className={`w-4 h-4 text-${activity.color}`} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/70 group-hover:text-cyber-cyan transition-colors">
                      {activity.message}
                    </p>
                    <p className="text-xs text-white/60 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-12 cyber-card">
          <h3 className="font-display text-xl font-bold text-cyber-yellow mb-6">System Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-2">99.9%</div>
              <div className="text-sm text-white/70 uppercase tracking-wider">Uptime</div>
              <div className="mt-2 h-2 bg-cyber-black/50 border border-green-500/30 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '99.9%' }} />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-cyan mb-2">1.2s</div>
              <div className="text-sm text-white/70 uppercase tracking-wider">Avg Load Time</div>
              <div className="mt-2 h-2 bg-cyber-black/50 border border-cyber-cyan/30 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-yellow" style={{ width: '20%' }} />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-yellow mb-2">A+</div>
              <div className="text-sm text-white/70 uppercase tracking-wider">Performance Grade</div>
              <div className="mt-2 h-2 bg-cyber-black/50 border border-cyber-yellow/30 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyber-yellow to-cyber-red" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}