export interface WeatherNow {
  temp: string;          // 温度
  feelsLike: string;     // 体感温度
  icon: string;          // 天气图标代码
  iconText: string;      // 天气图标表情
  text: string;          // 天气描述
  humidity: string;      // 湿度
  windScale: string;     // 风力等级
  updateTime: string;    // 更新时间
}

export interface AirQuality {
  aqi: string;          // 空气质量指数
  category: string;     // 空气质量类别
  primary: string;      // 主要污染物
}

export interface WeatherData {
  city: string;
  locationId: string;
  now: WeatherNow;
  air: AirQuality | null;
  timestamp: string;
  error?: string;
  cached?: boolean;
  fallback?: boolean;
}

// 城市信息接口
export interface CityOption {
  name: string;
  nameEn: string;
  locationId: string;
  country?: string;
  adm?: string; // 行政区划
}

// 用户位置信息
export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  accuracy?: number;
  timestamp: number;
}