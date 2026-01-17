'use client'

import { useState, useEffect, useRef } from 'react'
import { Cloud, Thermometer, Droplets, Wind, AlertCircle, RefreshCw, MapPin, Navigation } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { WeatherService } from '@/lib/weather'
import { WeatherData } from '@/types/weather'

interface WeatherBadgeProps {
  className?: string
  compact?: boolean // 紧凑模式，用于移动端
}

// 预定义城市列表
const PRESET_CITIES = [
  { name: 'San Francisco', nameZh: '旧金山' },
  { name: 'Beijing', nameZh: '北京' },
  { name: 'Shanghai', nameZh: '上海' },
  { name: 'New York', nameZh: '纽约' },
  { name: 'Tokyo', nameZh: '东京' },
  { name: 'London', nameZh: '伦敦' },
]

export default function WeatherBadge({ className = '', compact = false }: WeatherBadgeProps) {
  const { language, t } = useLanguage()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
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
    fetchWeather(selectedCity || undefined)
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
          // 这里可以调用逆地理编码API，简化起见先使用预设城市
          // 实际应用中应该调用Edge Function进行逆地理编码
          const estimatedCity = 'San Francisco' // 简化处理
          setSelectedCity(estimatedCity)
          localStorage.setItem('cyber_weather_selected_city', estimatedCity)
          await fetchWeather(estimatedCity)
        } catch (err) {
          setLocationError('Failed to estimate location')
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
        setLocationError(errorMessage)
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
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-cyber-black/50 border border-cyber-cyan/30 rounded-lg ${className}`}>
        <div className="animate-spin">
          <RefreshCw className="w-4 h-4 text-cyber-cyan" />
        </div>
        {!compact && (
          <span className="text-xs text-cyber-cyan/70">Loading...</span>
        )}
      </div>
    )
  }

  if (error && !weather) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-cyber-black/50 border border-cyber-red/30 rounded-lg ${className}`}>
        <AlertCircle className="w-4 h-4 text-cyber-red" />
        {!compact && (
          <span className="text-xs text-cyber-red/70">Error</span>
        )}
      </div>
    )
  }

  if (!weather) return null

  const tempColorClass = WeatherService.getTempColorClass(weather.now.temp)
  const cityName = getSelectedCityName() || weather.city

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
        <div className="absolute top-full right-0 mt-2 w-72 cyber-card z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4">
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
              <button
                onClick={handleAutoLocation}
                disabled={isLocating}
                className="flex items-center justify-center p-2 rounded-full border border-cyber-cyan/30 hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300 group"
                title="my location"
              >
                <Navigation className={`w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform ${isLocating ? 'animate-spin' : ''}`} />
              </button>
              {locationError && (
                <div className="mt-2 text-xs text-cyber-red text-center">
                  {locationError}
                </div>
              )}
            </div>

            {/* 主要天气信息 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${tempColorClass} mb-1`}>
                  {weather.now.temp}°C
                </div>
                <div className="text-sm text-cyber-yellow">
                  {weather.now.text}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyber-cyan/80 flex items-center gap-1">
                    <Thermometer className="w-3 h-3" />
                    Feels like
                  </span>
                  <span className="text-cyber-yellow">{weather.now.feelsLike}°C</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyber-cyan/80 flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    Humidity
                  </span>
                  <span className="text-cyber-yellow">{weather.now.humidity}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyber-cyan/80 flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    Wind
                  </span>
                  <span className="text-cyber-yellow">{weather.now.windScale}</span>
                </div>
              </div>
            </div>

            {/* 城市选择器 */}
            <div className="border-t border-cyber-cyan/20 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-cyber-yellow" />
                <span className="text-xs uppercase tracking-wider text-cyber-yellow">
                  Select City
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_CITIES.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleSelectCity(city.name)}
                    className={`px-2 py-1.5 text-xs rounded border transition-colors ${
                      selectedCity === city.name
                        ? 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan'
                        : 'bg-cyber-black/30 text-cyber-yellow/80 border-cyber-cyan/20 hover:bg-cyber-cyan/10'
                    }`}
                  >
                    {language === 'zh' ? city.nameZh : city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 空气质量（如果有） */}
            {weather.air && (
              <div className="border-t border-cyber-cyan/20 pt-4 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyber-cyan/80">Air Quality</span>
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

            {/* 更新时间 */}
            <div className="border-t border-cyber-cyan/20 pt-3 mt-4">
              <div className="text-xs text-cyber-cyan/60 text-center">
                Updated: {new Date(weather.now.updateTime).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
                {weather.cached && ' (Cached)'}
                {weather.fallback && ' (Fallback)'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}