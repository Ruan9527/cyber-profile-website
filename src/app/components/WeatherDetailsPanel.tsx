"use client"

import React from 'react'
import { Thermometer, Droplets, Wind } from 'lucide-react'
import { WeatherData } from '@/types/weather'

type WeatherDetailsPanelProps = {
  weather: WeatherData
  tempColorClass: string
}

export default function WeatherDetailsPanel({ weather, tempColorClass }: WeatherDetailsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* 左侧：当前天气与温度，带中文标题，显著性更强 */}
      <div className="text-center p-2 rounded-lg bg-cyber-black/20">
        <div className="text-sm text-cyber-yellow mb-1">当前天气</div>
        <div className={`text-5xl md:text-6xl font-bold ${tempColorClass} mb-1`}>
          {weather.now.temp}°C
        </div>
        <div className="text-sm text-cyber-yellow">{weather.now.text}</div>
      </div>

      {/* 右侧：细节指标区块，包含体感温度/湿度/风力，汉化标签 */}
      <div className="space-y-2 p-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-cyber-cyan/80 flex items-center gap-1">
            <Thermometer className="w-3 h-3" />
            体感温度
          </span>
          <span className="text-cyber-yellow">{weather.now.feelsLike}°C</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-cyber-cyan/80 flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            湿度
          </span>
          <span className="text-cyber-yellow">{weather.now.humidity}%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-cyber-cyan/80 flex items-center gap-1">
            <Wind className="w-3 h-3" />
            风力
          </span>
          <span className="text-cyber-yellow">{weather.now.windScale}</span>
        </div>
      </div>
    </div>
  )
}
