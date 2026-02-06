/**
 * 图片工具函数
 */

/**
 * 生成SVG格式的模糊占位符
 * @param width 图片宽度
 * @param height 图片高度
 * @returns Base64编码的SVG字符串
 */
export function generateBlurPlaceholder(width: number, height: number): string {
  // 生成渐变SVG作为占位符
  const gradient = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d2d2d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(gradient).toString('base64')}`
}

/**
 * 检查图片路径是否存在
 * @param src 图片路径
 * @returns 是否是占位符
 */
export function isPlaceholderImage(src: string): boolean {
  // 占位符模式匹配
  return src.includes('placeholder-') || 
         src.startsWith('/placeholder') ||
         src.includes('.jpg.svg') ||
         src.includes('.png.svg')
}

/**
 * 根据图片URL生成占位符
 * @param imageUrl 原始图片URL
 * @param width 图片宽度
 * @param height 图片高度
 * @returns Base64编码的SVG占位符
 */
export function generatePlaceholderFromUrl(imageUrl: string, width: number, height: number): string {
  // 简单的渐变背景
  const gradient = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d2d2d;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <text x="50%" y="50%" 
            dominant-baseline="middle" 
            text-anchor="middle" 
            fill="#666"
            font-size="${Math.max(12, Math.floor(width / 10))}">Loading...</text>
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(gradient).toString('base64')}`
}
