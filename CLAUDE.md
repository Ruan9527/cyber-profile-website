# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 常用开发命令

### 核心命令
```bash
# 开发服务器
npm run dev          # 启动开发服务器 (localhost:3000)

# 构建与部署
npm run build        # 生产构建
npm run start        # 启动生产服务器
npm run lint         # 代码检查
```

### 环境设置
```bash
# 环境变量配置
cp .env.local.example .env.local  # 复制环境变量模板
# 编辑 .env.local 文件，添加：
# - Supabase URL 和密钥
# - Google Analytics ID
# - 站点URL
```

## 🏗️ 项目架构概述

### 目录结构
```
src/
├── app/                    # Next.js App Router
│   ├── components/         # 可复用UI组件
│   │   ├── Navbar.tsx      # 导航栏（包含多语言切换）
│   │   ├── Hero.tsx        # 英雄区域
│   │   ├── SkillsSection.tsx # 技能展示
│   │   ├── ProjectsSection.tsx # 项目展示
│   │   ├── StatsSection.tsx   # 统计面板
│   │   ├── ContactSection.tsx # 联系表单
│   │   ├── WeatherBadge.tsx   # 天气组件
│   │   └── GoogleAnalytics.tsx # GA集成
│   ├── layout.tsx          # 根布局（包含语言提供者）
│   ├── page.tsx            # 主页组件
│   └── globals.css         # 全局样式（设计系统核心）
├── contexts/
│   └── LanguageContext.tsx # 多语言上下文
├── hooks/
│   ├── useFormValidation.ts # 表单验证钩子
│   └── useTypewriter.ts    # 打字机效果钩子
├── lib/
│   ├── supabase.ts         # Supabase客户端配置
│   ├── weather.ts          # 天气服务（Edge Function集成）
│   └── imageUtils.ts       # 图片处理工具
└── types/
    ├── index.ts            # 通用类型定义
    └── weather.ts          # 天气相关类型
```

### 关键架构模式

1. **多语言系统**
   - 使用 `LanguageContext` 提供全局语言状态
   - 翻译文件内置于上下文中（en/zh 双语）
   - 使用 `useLanguage()` 钩子访问翻译函数 `t(key)`

2. **Supabase集成**
   - 条件性初始化客户端（避免未配置时崩溃）
   - 通过Edge Function调用天气API
   - 数据库表：messages, visitors, downloads等

3. **天气服务**
   - 5分钟本地缓存机制
   - 优雅降级策略（API失败时使用兜底数据）
   - 温度颜色映射到赛博朋克主题色

## 🎨 设计系统关键点

### 颜色系统（Tailwind扩展）
```javascript
// tailwind.config.js 中定义的颜色
'cyber-black': '#050505',      // 主背景
'cyber-gray': '#2d2d2d',       // 次要背景
'cyber-cyan': '#00f0ff',       // 主强调色
'cyber-yellow': '#fcee0a',     // 次要强调色
'cyber-red': '#ff003c',        // 警告/错误色
'cyber-purple': '#b967ff',     // 辅助色
'cyber-green': '#00ff9d',      // 成功色
```

### 字体系统
- 中文：Microsoft YaHei, Heiti SC
- 英文显示字体：Rajdhani, Orbitron
- 技术字体：Share Tech Mono, Cascadia Code
- 正文英文：Exo 2, Segoe UI

### 自定义光标系统
- `cursor-tactical`: 默认光标（青色箭头）
- `cursor-target`: 交互元素光标（红色目标）
- `cursor-hack`: 技术元素光标（紫色三角形）
- `cursor-data`: 表单元素光标（青色数据框）

### 动画效果
- `animate-glitch`: 故障效果
- `animate-scan`: 扫描线效果
- `animate-neon-flicker`: 霓虹闪烁
- `animate-float`: 浮动效果
- 所有动画都包含 `will-change` 优化

### 组件样式类
- `.cyber-button`: 赛博朋克风格按钮
- `.cyber-input`: 风格化输入框
- `.cyber-card`: 卡片组件（多种变体）
- `.text-cyber-cyan`: 青色霓虹文字
- `.text-cyber-red`: 红色霓虹文字

## ⚠️ 开发注意事项

### 1. 客户端组件标记
```typescript
// 所有使用状态、效果或浏览器API的组件都需要
'use client'
```

### 2. 多语言集成
```typescript
// 正确使用翻译
const { t } = useLanguage()
return <h1>{t('hero.title')}</h1>

// 避免硬编码文本
```

### 3. 环境变量处理
```typescript
// 安全访问环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// 客户端组件中只能使用 NEXT_PUBLIC_ 前缀的变量
```

### 4. 图片优化
- 使用 `ImageWithPlaceholder` 组件处理图片
- 配置了 `next.config.js` 中的远程图片模式
- 支持 WebP 和 AVIF 格式

### 5. 性能优化
- 动画使用 `will-change` 提示
- 图片延迟加载
- 组件懒加载（如果需要）
- 减少不必要的重渲染

### 6. 错误边界
- Supabase客户端条件初始化
- 天气服务优雅降级
- 表单验证客户端处理

## 🚀 部署流程要点

### Vercel部署
1. **环境变量配置**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_GA_ID=your_ga_id
   NEXT_PUBLIC_SITE_URL=your_production_url
   ```

2. **Supabase设置**
   - 创建项目并获取URL和密钥
   - 设置数据库表（messages, visitors, downloads）
   - 部署Edge Function用于天气API

3. **构建配置**
   - Next.js 14 App Router
   - TypeScript严格模式
   - Tailwind CSS JIT编译

### 开发与生产差异
- 开发：使用本地缓存和模拟数据
- 生产：需要完整的Supabase配置
- 天气API需要有效的Edge Function

## 🔧 故障排除

### 常见问题
1. **Supabase未初始化**
   - 检查环境变量是否正确
   - 确认Supabase项目已创建

2. **天气服务失败**
   - 检查Edge Function是否部署
   - 查看浏览器控制台错误
   - 服务会优雅降级到兜底数据

3. **样式问题**
   - 确保Tailwind类名正确
   - 检查自定义CSS变量
   - 验证字体是否加载

4. **多语言不生效**
   - 确认LanguageProvider包裹了应用
   - 检查localStorage中的语言设置
   - 验证翻译键名是否正确

### 调试工具
- 浏览器开发者工具
- Next.js开发服务器热重载
- TypeScript类型检查
- ESLint代码检查

## 📚 相关文件参考

- `tailwind.config.js` - 设计系统配置
- `src/app/globals.css` - 全局样式和动画
- `src/contexts/LanguageContext.tsx` - 多语言实现
- `src/lib/weather.ts` - 天气服务模式
- `src/lib/supabase.ts` - 数据库集成模式

---

*这个文件旨在帮助Claude Code快速理解项目架构和开发模式，避免重复探索已有信息。*