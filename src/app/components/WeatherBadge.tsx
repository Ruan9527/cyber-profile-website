'use client'

import { useState, useEffect, useRef } from 'react'
import { Cloud, Sun, AlertCircle, RefreshCw } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { WeatherService } from '@/lib/weather'
import WeatherDetailsPanel from './WeatherDetailsPanel'
import { WeatherData } from '@/types/weather'

interface WeatherBadgeProps {
  className?: string
  compact?: boolean // 紧凑模式，用于移动端
  variant?: 'default' | 'minimal' // 默认显示弹出框，minimal不显示弹出框
}

// 预定义城市列表（仅保留北京/武汉，定位为当前位置时作为辅助选项）
const PRESET_CITIES = [
  { name: 'Beijing', nameZh: '北京' },
  { name: 'Wuhan', nameZh: '武汉' },
]

export default function WeatherBadge({ className = '', compact = false, variant = 'default' }: WeatherBadgeProps) {
  const { language, t } = useLanguage()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  // Whether the current city is resolved from geolocation (for UI indicator)
  const [locationResolved, setLocationResolved] = useState<boolean>(false)
  const detailsRef = useRef<HTMLDivElement>(null)

  // 获取选中的城市名称（基于语言）
  const getSelectedCityName = () => {
    if (!selectedCity) return ''
    const city = PRESET_CITIES.find(c => c.name === selectedCity || c.nameZh === selectedCity)
    if (!city) return selectedCity
    return language === 'zh' ? city.nameZh : city.name
  }

  // 获取城市显示名称
  const getCityDisplayName = (cityName: string) => {
    const city = PRESET_CITIES.find(c => c.name === cityName || c.nameZh === cityName)
    if (!city) return cityName
    return language === 'zh' ? city.nameZh : city.name
  }

  // 加载天气数据
  const fetchWeather = async (city?: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await WeatherService.getWeather(city, language)
      setWeather(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather')
      console.error('Weather fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // 初始化：从localStorage加载选中的城市
  useEffect(() => {
    const savedCity = localStorage.getItem('cyber_weather_selected_city')
    if (savedCity) {
      setSelectedCity(savedCity)
    }
  }, [])

  // 当语言或选中城市变化时，获取天气数据
  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity)
    } else {
      // 首次加载尝试自动定位，若失败则回退到武汉
      handleAutoLocation()
    }
    // 每10分钟更新一次
    const interval = setInterval(() => {
      fetchWeather(selectedCity || undefined)
    }, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [selectedCity, language])

  // 点击外部关闭详情面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        setShowDetails(false)
      }
    }

    if (showDetails) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDetails])

  // 自动定位
  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    setIsLocating(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          // 简易逆地理映射：根据经纬度判定为武汉或北京
          let mappedCity = 'Wuhan'
          const lat = latitude
          const lon = longitude
          if (lat >= 29 && lat <= 32 && lon >= 113 && lon <= 115) {
            mappedCity = 'Wuhan'
          } else if (lat >= 39 && lat <= 41 && lon >= 116 && lon <= 118) {
            mappedCity = 'Beijing'
          } else {
            mappedCity = 'Wuhan'
          }
          setSelectedCity(mappedCity)
          localStorage.setItem('cyber_weather_selected_city', mappedCity)
          await fetchWeather(mappedCity)
          setLocationResolved(true)
        } catch (err) {
          setLocationError('定位失败，使用武汉作为默认城市')
          setSelectedCity('Wuhan')
          setLocationResolved(false)
          await fetchWeather('Wuhan')
        } finally {
          setIsLocating(false)
        }
      },
      (error) => {
        let errorMessage = 'Location access denied'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timeout'
            break
        }
        // 定位失败，使用武汉作为默认城市
        setLocationError('定位失败，使用武汉作为默认城市')
        setSelectedCity('Wuhan')
        setLocationResolved(false)
        fetchWeather('Wuhan')
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  // 选择城市
  const handleSelectCity = (cityName: string) => {
    setSelectedCity(cityName)
    localStorage.setItem('cyber_weather_selected_city', cityName)
    setShowDetails(false)
  }

  // 手动刷新天气
  const handleRefresh = () => {
    WeatherService.clearAllCache()
    fetchWeather(selectedCity || undefined)
  }

  if (loading && !weather) {
    if (variant === 'minimal') {
      return (
        <div className={`flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-full shadow-sm ${className}`}>
          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
          <span className="font-space-grotesk text-futuristic-text text-sm font-medium">--</span>
        </div>
      )
    }
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg ${className}`}>
        <div className="animate-spin">
          <RefreshCw className="w-4 h-4 text-cyber-cyan" />
        </div>
        {!compact && (
          <span className="text-xs text-cyber-cyan/70">加载中...</span>
        )}
      </div>
    )
  }

  if (error && !weather) {
    if (variant === 'minimal') {
      return (
        <div className={`flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-full shadow-sm ${className}`}>
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="font-space-grotesk text-futuristic-text text-sm font-medium">--</span>
        </div>
      )
    }
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-cyber-black/50 border border-cyber-red/30 rounded-lg ${className}`}>
        <AlertCircle className="w-4 h-4 text-cyber-red" />
        {!compact && (
          <span className="text-xs text-cyber-red/70">错误</span>
        )}
      </div>
    )
  }

  if (!weather) return null

  const tempColorClass = WeatherService.getTempColorClass(weather.now.temp)
  const cityName = getSelectedCityName() || weather.city

  // Minimal variant - no popup, glass style
  if (variant === 'minimal') {
    // Choose icon based on weather condition
    const getWeatherIcon = () => {
      const condition = weather.now.text.toLowerCase()
      if (condition.includes('晴') || condition.includes('sun')) {
        return <Sun className="w-5 h-5 text-yellow-500" />
      } else if (condition.includes('云') || condition.includes('cloud')) {
        return <Cloud className="w-5 h-5 text-gray-500" />
      } else {
        return <div className="text-lg leading-none">{weather.now.iconText}</div>
      }
    }

    return (
      <div className={`flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-full shadow-sm ${className}`}>
        {getWeatherIcon()}
        <span className="font-space-grotesk text-gray-900 text-sm font-medium">
          {weather.now.temp}°C
        </span>
        {!compact && (
          <span className="font-space-grotesk text-gray-600 text-xs truncate max-w-[60px]">
            {cityName}
          </span>
        )}
      </div>
    )
  }

  // Default variant - with popup and interactive features
  return (
    <div className="relative" ref={detailsRef}>
      {/* 天气徽章主体 */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        onMouseEnter={() => !compact && setShowDetails(true)}
        className={`flex items-center gap-2 px-3 py-1.5 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 transition-all group ${className}`}
        style={{
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.1)'
        }}
      >
        {/* 天气图标 */}
        <div className="text-lg leading-none">{weather.now.iconText}</div>
        
        {/* 温度 */}
        <div className={`font-bold ${tempColorClass}`}>
          {weather.now.temp}°C
        </div>
        
        {/* 城市名称（桌面端显示） */}
        {!compact && (
          <div className="text-xs text-cyber-yellow/80 truncate max-w-[80px]">
            {cityName}
          </div>
        )}
        
        {/* 缓存状态指示器 */}
        {weather.cached && (
          <div className="text-[8px] text-cyber-cyan/50" title="Cached data">C</div>
        )}
        
        {/* 兜底数据指示器 */}
        {weather.fallback && (
          <div className="text-[8px] text-cyber-red/50" title="Fallback data">F</div>
        )}
      </button>

        {/* 详细信息弹出层 */}
        {showDetails && (
          <div className="fixed top-20 right-3 w-60 cyber-card z-[100] animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-7rem)] overflow-y-auto border border-cyber-cyan/40">
          <div className="p-3">
            {/* 标题栏 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-cyber-cyan" />
                <h3 className="font-bold text-cyber-cyan truncate">{cityName}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1 text-cyber-yellow/60 hover:text-cyber-yellow transition-colors"
                  title="Refresh weather"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 text-cyber-yellow/60 hover:text-cyber-yellow transition-colors"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* 自动定位按钮 */}
        <div className="mb-4 flex justify-center">
          {locationError && (
            <div className="mt-2 text-xs text-cyber-red text-center">
              {locationError}
            </div>
          )}
        </div>

        {/* Weather details panel (new modular component) */}
        <WeatherDetailsPanel weather={weather} tempColorClass={tempColorClass} />

            {/* 城市选择：同一行放置当前位置/北京/武汉，带简单选中标识 */}
            <div className="flex items-center gap-2 border-t border-cyber-cyan/20 pt-3 mt-2">
              <button onClick={handleAutoLocation} className={`px-2 py-1.5 text-xs rounded border transition-colors ${locationResolved ? 'bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/60' : 'border-cyber-cyan/20 bg-cyber-black/30 text-cyber-yellow/80 hover:bg-cyber-cyan/10'}`}>
                当前位置
              </button>
              <button onClick={() => handleSelectCity('Beijing')} className={`px-2 py-1.5 text-xs rounded border transition-colors ${selectedCity === 'Beijing' ? 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan' : 'border-cyber-cyan/20 bg-cyber-black/30 text-cyber-yellow/80 border-cyber-cyan/20 hover:bg-cyber-cyan/10'}`}>
                北京
              </button>
              <button onClick={() => handleSelectCity('Wuhan')} className={`px-2 py-1.5 text-xs rounded border transition-colors ${selectedCity === 'Wuhan' ? 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan' : 'border-cyber-cyan/20 bg-cyber-black/30 text-cyber-yellow/80 border-cyber-cyan/20 hover:bg-cyber-cyan/10'}`}>
                武汉
              </button>
            </div>
            

            {/* 空气质量（如果有） */}
            {weather.air && (
              <div className="border-t border-cyber-cyan/20 pt-4 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyber-cyan/80">空气质量</span>
                  <span className={`px-2 py-1 rounded text-xs ${WeatherService.getAirQualityColor(weather.air.category)}`}>
                    {weather.air.aqi} - {weather.air.category}
                  </span>
                </div>
                {weather.air.primary && (
                  <div className="text-xs text-cyber-yellow/60 mt-1">
                    Primary: {weather.air.primary}
                  </div>
                )}
              </div>
            )}

            {/* 更新时间（已移除中文翻译： Updated 行已移除，若未来需要可新增简短状态） */}
          </div>
        </div>
      )}
    </div>
  )
}
