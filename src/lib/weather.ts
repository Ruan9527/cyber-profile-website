import { supabase } from './supabase'
import { WeatherData } from '@/types/weather'

export class WeatherService {
  private static CACHE_KEY = 'cyber_weather_cache'
  private static CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

  // 获取天气数据（主入口）
  static async getWeather(city?: string, lang = 'en'): Promise<WeatherData> {
    // 检查缓存
    const cached = this.getCachedWeather(city, lang)
    if (cached) {
      return { ...cached, cached: true }
    }

    // 检查Supabase客户端
    if (!supabase) {
      console.warn('Supabase client not initialized, using fallback data')
      return this.getFallbackWeather(city, lang)
    }

    try {
      // 调用Edge Function
      const { data, error } = await supabase.functions.invoke('weather', {
        body: { 
          city: city || this.getDefaultCity(lang),
          lang 
        }
      })

      if (error) {
        throw new Error(`Weather API error: ${error.message}`)
      }

      // 处理Edge Function返回的错误
      if (data.error) {
        throw new Error(data.error)
      }

      // 缓存数据
      this.cacheWeather(data, city, lang)
      
      return data
    } catch (error) {
      console.error('Weather service error:', error)
      // 如果API失败，尝试使用缓存或返回兜底数据
      const fallback = this.getFallbackWeather(city, lang)
      return fallback
    }
  }

  // 获取默认城市（基于语言）
  private static getDefaultCity(lang: string): string {
    if (lang === 'zh') {
      return process.env.NEXT_PUBLIC_DEFAULT_CITY_ZH || '旧金山'
    }
    return process.env.NEXT_PUBLIC_DEFAULT_CITY || 'San Francisco'
  }

  // 获取缓存数据
  private static getCachedWeather(city?: string, lang = 'en'): WeatherData | null {
    if (typeof window === 'undefined') return null

    const cacheKey = `${this.CACHE_KEY}_${city || 'default'}_${lang}`
    const cached = localStorage.getItem(cacheKey)
    
    if (!cached) return null

    try {
      const { data, timestamp } = JSON.parse(cached)
      const now = Date.now()
      
      // 检查缓存是否过期
      if (now - timestamp < this.CACHE_DURATION) {
        return data
      } else {
        // 清除过期缓存
        localStorage.removeItem(cacheKey)
      }
    } catch (error) {
      console.error('Failed to parse cached weather:', error)
    }
    
    return null
  }

  // 缓存天气数据
  private static cacheWeather(data: WeatherData, city?: string, lang = 'en'): void {
    if (typeof window === 'undefined') return

    const cacheKey = `${this.CACHE_KEY}_${city || 'default'}_${lang}`
    const cacheData = {
      data,
      timestamp: Date.now()
    }
    
    try {
      localStorage.setItem(cacheKey, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Failed to cache weather data:', error)
    }
  }

  // 获取兜底数据（API失败时使用）
  private static getFallbackWeather(city?: string, lang = 'en'): WeatherData {
    const defaultCity = this.getDefaultCity(lang)
    const fallbackText = lang === 'zh' ? '晴朗' : 'Sunny'
    
    return {
      city: city || defaultCity,
      locationId: 'fallback',
      now: {
        temp: '22',
        feelsLike: '23',
        icon: '100',
        iconText: '☀️',
        text: fallbackText,
        humidity: '65',
        windScale: '2',
        updateTime: new Date().toISOString(),
      },
      air: null,
      timestamp: new Date().toISOString(),
      error: 'Using fallback data',
      fallback: true,
      cached: false,
    }
  }

  // 温度颜色映射（赛博朋克主题）- 使用现有颜色
  static getTempColor(temp: string): string {
    const t = parseInt(temp)
    if (isNaN(t)) return 'text-cyber-cyan'
    
    if (t >= 30) return 'text-cyber-red'      // 热：红色
    if (t >= 25) return 'text-cyber-yellow'   // 温暖：黄色
    if (t >= 15) return 'text-cyber-cyan'     // 凉爽：青色
    return 'text-cyber-gray'                  // 冷：灰色
  }

  // 获取颜色类名（Tailwind）- 使用现有赛博朋克主题颜色
  static getTempColorClass(temp: string): string {
    const t = parseInt(temp)
    if (isNaN(t)) return 'text-cyber-cyan'
    
    if (t >= 30) return 'text-cyber-red'      // 热：红色
    if (t >= 25) return 'text-cyber-yellow'   // 温暖：黄色
    if (t >= 15) return 'text-cyber-cyan'     // 凉爽：青色
    return 'text-cyber-gray'                  // 冷：灰色
  }

  // 获取空气质量颜色
  static getAirQualityColor(category: string): string {
    if (category.includes('优') || category.includes('Good')) {
      return 'bg-green-500/20 text-green-400'
    }
    if (category.includes('良') || category.includes('Moderate')) {
      return 'bg-yellow-500/20 text-yellow-400'
    }
    if (category.includes('轻度污染') || category.includes('Unhealthy for Sensitive Groups')) {
      return 'bg-orange-500/20 text-orange-400'
    }
    if (category.includes('中度污染') || category.includes('Unhealthy')) {
      return 'bg-red-500/20 text-red-400'
    }
    if (category.includes('重度污染') || category.includes('Very Unhealthy')) {
      return 'bg-purple-500/20 text-purple-400'
    }
    if (category.includes('严重污染') || category.includes('Hazardous')) {
      return 'bg-gray-800/20 text-gray-400'
    }
    return 'bg-cyber-cyan/20 text-cyber-cyan'
  }

  // 清除所有天气缓存
  static clearAllCache(): void {
    if (typeof window === 'undefined') return
    
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(this.CACHE_KEY)) {
        keysToRemove.push(key)
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }
}