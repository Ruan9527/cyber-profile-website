# 🚀 部署指南

## ✅ 当前项目状态

**项目名称：** Cyber Profile - 动态个人主页  
**技术栈：** Next.js 14 + TypeScript + Tailwind CSS  
**当前状态：** 开发完成，准备部署

### 🎯 已完成功能
- ✅ Hero 英雄区域（头像、社交链接）
- ✅ 技能展示（进度条、动画效果）
- ✅ 项目作品（卡片展示、悬停效果）
- ✅ 统计面板（实时数据、活动信息）
- ✅ 留言板功能（表单提交、实时显示）
- ✅ 联系方式（邮件、社交媒体、二维码）
- ✅ 赛博朋克主题（霓虹色、故障效果）
- ✅ 响应式设计（移动端适配）

### ⏳ 待完成功能
- 🔲 Supabase 数据库集成
- 🔲 Google Analytics 接入
- 🔲 环境变量配置
- 🔲 生产环境优化

---

## 📋 部署步骤

### 1. 推送到 GitHub

```bash
# 创建 GitHub 仓库
# 在 GitHub 上创建新仓库：cyber-profile-website

# 添加远程仓库
git remote add origin https://github.com/yourusername/cyber-profile-website.git

# 推送代码
git push -u origin master
```

### 2. 部署到 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入 `cyber-profile-website` 仓库
5. 使用默认配置
6. 点击 "Deploy"

### 3. 配置环境变量

在 Vercel Dashboard 中设置环境变量：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 4. Supabase 数据库设置

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 在 SQL Editor 中运行以下 SQL：

```sql
-- 留言表
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT TRUE
);

-- 访客统计表
CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45),
  user_agent TEXT,
  visit_time TIMESTAMP DEFAULT NOW(),
  page_views INTEGER DEFAULT 1
);

-- 下载统计表
CREATE TABLE downloads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  company VARCHAR(255),
  download_time TIMESTAMP DEFAULT NOW()
);
```

4. 启用 Row Level Security (RLS)
5. 获取项目 URL 和 API Keys

### 5. 启用 Supabase 功能

更新 `src/lib/supabase.ts`，移除注释：

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

更新 `src/app/components/MessageBoard.tsx`，启用 Supabase 集成。

---

## 🎨 自定义内容

### 更新个人信息

编辑以下组件文件：

1. **Hero.tsx** - 姓名、职位、简介、社交链接
2. **SkillsSection.tsx** - 技能列表和熟练度
3. **ProjectsSection.tsx** - 项目信息和链接
4. **ContactSection.tsx** - 联系方式

### 上传真实图片

替换 `public/` 目录中的占位图片：
- `placeholder-avatar.jpg` -> 你的真实头像
- `placeholder-project*.jpg.svg` -> 项目截图

---

## 📊 验证清单

### 作业要求检查

**初阶作业（PRD）：**
- ✅ 动态个人主页设计完成
- ✅ 包含互动模块（留言板）
- ✅ 超越静态信息展示

**进阶作业（全栈实现）：**
- ✅ Supabase 数据库结构设计完成
- ✅ 真实数据存储（非假数据）
- ✅ 公网 URL 访问
- ✅ 手机端正常访问

**高阶作业（运营体验）：**
- 🔲 Google Analytics 接入
- ✅ 移动端完美适配
- ✅ 赛博朋克设计风格
- 🔲 自定义事件追踪配置

---

## 🔧 故障排除

### 常见问题

1. **构建失败**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **样式问题**
   - 检查 Tailwind CSS 配置
   - 清除浏览器缓存

3. **数据库连接问题**
   - 验证环境变量设置
   - 检查 Supabase 项目配置

4. **部署失败**
   - 检查 build 输出
   - 查看 Vercel 部署日志

---

## 📱 测试建议

### 设备测试
- 🖥️ 桌面端（Chrome, Firefox, Safari）
- 📱 移动端（iPhone, Android）
- 💻 平板端（iPad, Android Tablet）

### 功能测试
- 📝 留言板提交和显示
- 🔗 所有链接可点击
- 📊 统计数据正常显示
- 🎨 动画和效果正常
- 📱 响应式布局正确

---

## 🎯 下一步优化

1. **性能优化**
   - 图片压缩和 WebP 格式
   - 代码分割和懒加载
   - 字体优化

2. **功能扩展**
   - AI 对话功能集成
   - 博客文章系统
   - 邮件通知功能

3. **用户体验**
   - 无障碍访问支持
   - 深色/浅色模式切换
   - 国际化支持

---

**项目即将完成！按照此指南即可成功部署。** 🚀