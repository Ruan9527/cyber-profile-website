/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 扩展的赛博朋克色彩系统
      colors: {
        // 核心颜色 - 保持现有
        'cyber-black': '#050505',
        'cyber-gray': '#2d2d2d',
        'cyber-yellow': '#fcee0a',
        'cyber-cyan': '#00f0ff',
        'cyber-red': '#ff003c',
        
        // 增强的文字颜色
        'cyber-white': '#e5e5e5',
        'cyber-text-secondary': '#a3a3a3',
        'cyber-text-tertiary': '#737373',
        
        // 新增辅助颜色 - 更丰富的赛博朋克调色板
        'cyber-purple': '#b967ff',
        'cyber-green': '#00ff9d',
        'cyber-orange': '#ff6b35',
        'cyber-pink': '#ff2d95',
        'cyber-blue': '#2d7dff',
        
        // 透明度色系 - 用于层次和效果
        'cyber-cyan-10': 'rgba(0, 240, 255, 0.1)',
        'cyber-cyan-20': 'rgba(0, 240, 255, 0.2)',
        'cyber-cyan-30': 'rgba(0, 240, 255, 0.3)',
        'cyber-cyan-40': 'rgba(0, 240, 255, 0.4)',
        'cyber-cyan-50': 'rgba(0, 240, 255, 0.5)',
        'cyber-cyan-60': 'rgba(0, 240, 255, 0.6)',
        'cyber-cyan-70': 'rgba(0, 240, 255, 0.7)',
        'cyber-cyan-80': 'rgba(0, 240, 255, 0.8)',
        'cyber-cyan-90': 'rgba(0, 240, 255, 0.9)',
        
        'cyber-yellow-10': 'rgba(252, 238, 10, 0.1)',
        'cyber-yellow-20': 'rgba(252, 238, 10, 0.2)',
        'cyber-yellow-30': 'rgba(252, 238, 10, 0.3)',
        'cyber-yellow-40': 'rgba(252, 238, 10, 0.4)',
        'cyber-yellow-50': 'rgba(252, 238, 10, 0.5)',
        
        'cyber-red-10': 'rgba(255, 0, 60, 0.1)',
        'cyber-red-20': 'rgba(255, 0, 60, 0.2)',
        'cyber-red-30': 'rgba(255, 0, 60, 0.3)',
        'cyber-red-40': 'rgba(255, 0, 60, 0.4)',
        'cyber-red-50': 'rgba(255, 0, 60, 0.5)',
        
        // 渐变背景
        'cyber-gradient-start': '#050505',
        'cyber-gradient-middle': '#1a1a2e',
        'cyber-gradient-end': '#16213e',
      },
      
      // 扩展的字体系统
      fontFamily: {
        // 中文字体 - 保持现有
        'cyber': ['Microsoft YaHei', 'Heiti SC', 'sans-serif'],
        
        // 英文字体 - 更独特的选择
        'display': ['Rajdhani', 'Orbitron', 'Microsoft YaHei', 'sans-serif'],
        'display-alt': ['Aldrich', 'Share Tech Mono', 'monospace'],
        'body-en': ['Exo 2', 'Segoe UI', 'sans-serif'],
        'mono-tech': ['Share Tech Mono', 'Cascadia Code', 'monospace'],
        'futuristic': ['Michroma', 'Rajdhani', 'sans-serif'],
      },
      
      // 光标系统
      cursor: {
        'tactical': 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M2 2L14 28L18 18L28 14L2 2Z\' fill=\'%2300f0ff\' stroke=\'black\' stroke-width=\'1.5\'/%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E"), auto',
        'target': 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M2 2L11 26L15 16L25 12L2 2Z\' fill=\'%23ff003c\' stroke=\'white\' stroke-width=\'1.5\'/%3E%3Cpath d=\'M15 16L28 28\' stroke=\'%23ff003c\' stroke-width=\'2\'/%3E%3Crect x=\'26\' y=\'26\' width=\'4\' height=\'4\' fill=\'%23fcee0a\' stroke=\'black\'/%3E%3C/svg%3E"), pointer',
        'hack': 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 2L2 22H22L12 2Z\' fill=\'%23b967ff\' stroke=\'white\' stroke-width=\'1\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'2\' fill=\'%2300ff9d\'/%3E%3C/svg%3E"), pointer',
        'data': 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'2\' y=\'2\' width=\'24\' height=\'24\' rx=\'4\' fill=\'%2300f0ff\' fill-opacity=\'0.2\' stroke=\'%2300f0ff\' stroke-width=\'1.5\'/%3E%3Cpath d=\'M8 8H20V20H8V8Z\' fill=\'%23ff003c\'/%3E%3Cpath d=\'M14 14L24 24\' stroke=\'%23fcee0a\' stroke-width=\'2\'/%3E%3C/svg%3E"), pointer',
      },
      
      // 动画扩展
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s linear infinite',
        'scan': 'scan 2s linear infinite',
        'neon-flicker': 'neonFlicker 1.5s ease-in-out infinite',
        'data-stream': 'dataStream 10s linear infinite',
        'particle-float': 'particleFloat 8s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-fast': 'rotate 8s linear infinite',
      },
      
      // 关键帧定义
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.8' },
        },
        dataStream: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -50px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      
      // 背景图像扩展
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
        'cyber-grid-dense': 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
        'circuit-pattern': 'radial-gradient(circle at 25% 25%, rgba(0, 240, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 0, 60, 0.05) 0%, transparent 50%)',
        'data-stream': 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.2), transparent)',
        'noise-texture': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
      },
      
      // 扩展的阴影效果
      boxShadow: {
        'cyber-sm': '0 0 10px rgba(0, 240, 255, 0.3), 0 0 20px rgba(0, 240, 255, 0.1)',
        'cyber': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2)',
        'cyber-lg': '0 0 30px rgba(0, 240, 255, 0.7), 0 0 60px rgba(0, 240, 255, 0.3)',
        'cyber-xl': '0 0 40px rgba(0, 240, 255, 0.9), 0 0 80px rgba(0, 240, 255, 0.4)',
        'cyber-red': '0 0 20px rgba(255, 0, 60, 0.5), 0 0 40px rgba(255, 0, 60, 0.2)',
        'cyber-yellow': '0 0 20px rgba(252, 238, 10, 0.5), 0 0 40px rgba(252, 238, 10, 0.2)',
        'cyber-purple': '0 0 20px rgba(185, 103, 255, 0.5), 0 0 40px rgba(185, 103, 255, 0.2)',
        'inner-cyber': 'inset 0 0 20px rgba(0, 240, 255, 0.3), inset 0 0 40px rgba(0, 240, 255, 0.1)',
      },
      
      // 文本阴影扩展
      textShadow: {
        'cyber-sm': '0 0 10px rgba(0, 240, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)',
        'cyber': '0 0 20px rgba(0, 240, 255, 0.7), 0 0 40px rgba(0, 240, 255, 0.3), 0 2px 6px rgba(0, 0, 0, 0.9)',
        'cyber-red': '0 0 20px rgba(255, 0, 60, 0.7), 0 0 40px rgba(255, 0, 60, 0.3), 0 2px 6px rgba(0, 0, 0, 0.9)',
        'cyber-yellow': '0 0 20px rgba(252, 238, 10, 0.7), 0 0 40px rgba(252, 238, 10, 0.3), 0 2px 6px rgba(0, 0, 0, 0.9)',
      },
      
      // 渐变扩展
      backgroundSize: {
        'cyber-grid': '50px 50px',
        'cyber-grid-dense': '30px 30px',
      },
      
      // 混合模式
      mixBlendMode: {
        'screen': 'screen',
        'overlay': 'overlay',
        'hard-light': 'hard-light',
      },
      
      // 变换扩展
      transformOrigin: {
        'center-bottom': 'center bottom',
        'center-top': 'center top',
      },
    },
  },
  plugins: [],
}