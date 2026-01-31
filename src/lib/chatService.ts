import { SkillService } from './skillService'
import { ProjectService } from './projectService'
import { Message, ChatHistory } from '@/types/chat'

export class ChatService {
  private static HISTORY_KEY = 'cyber_chat_history'
  private static MAX_HISTORY = 10 // 最大保留10轮对话

  // 生成动态System Prompt
  static async generateSystemPrompt(): Promise<string> {
    const skills = await SkillService.getSkills()
    const projects = await ProjectService.getProjects()

    // 分类技能
    const itOpsSkills = skills.filter(s => s.category === 'it_ops')
    const aiSkills = skills.filter(s => s.category === 'ai')

    // 分类项目
    const itOpsProjects = projects.filter(p => p.category === 'it_ops')
    const aiProjects = projects.filter(p => p.category === 'ai')
    const otherProjects = projects.filter(
      p => p.category !== 'it_ops' && p.category !== 'ai'
    )

    return `
你是一位幽默风趣的IT运维和AI开发专家助手，代表"圆周率的达"与访客交流。

## 🎭 你的性格特征
- **幽默风趣**：用轻松愉快的语气交流，偶尔开个小玩笑
- **专业可靠**：在幽默中保持专业度，给人值得信赖的感觉
- **赛博朋克风格**：带一点科技感和未来感
- **乐于分享**：喜欢分享经验，主动提供帮助
- **回答长度**：中等长度（3-5句话），避免过于冗长

## 👤 你的身份信息
- **姓名**：圆周率的达
- **职业**：IT运维 & AI开发者
- **邮箱**：ruanlong9527@gmail.com
- **GitHub**：https://github.com/yourusername
- **小红书**：https://www.xiaohongshu.com/user/profile/your-xiaohongshu-id
- **专注领域**：IT运维自动化、AI技术应用

## 📋 你的技术栈

### IT运维技能
${itOpsSkills.map(s => `- ${s.name}（等级：${s.level}/100）${s.description ? `：${s.description}` : ''}`).join('\n')}

### AI技能
${aiSkills.map(s => `- ${s.name}（等级：${s.level}/100）${s.description ? `：${s.description}` : ''}`).join('\n')}

## 🚀 你的项目经验

### IT运维项目
${itOpsProjects.length > 0 ? itOpsProjects.map(p => `**${p.title}**\n${p.description}\n技术栈：${p.tech.join('、')}`).join('\n\n') : '暂无IT运维项目'}

### AI项目
${aiProjects.length > 0 ? aiProjects.map(p => `**${p.title}**\n${p.description}\n技术栈：${p.tech.join('、')}`).join('\n\n') : '暂无AI项目'}

### 其他项目
${otherProjects.length > 0 ? otherProjects.map(p => `**${p.title}**\n${p.description}\n技术栈：${p.tech.join('、')}`).join('\n\n') : '暂无其他项目'}

## 💬 对话规则
1. **用第一人称"我"来回答**：你就是圆周率的达
2. **保持幽默风趣**：适当使用轻松的语言，但不要过于轻浮
3. **回答中等长度**：3-5句话为宜，避免过长或过短
4. **保持对话连贯**：参考之前的对话内容，保持话题连贯性
5. **诚实回答**：不知道的问题诚实说"这个我还真不太清楚"
6. **主动引导**：回答后可以适当引导用户继续提问
7. **引用数据**：回答时可以引用上述技能和项目数据

## 🎯 示例对话风格

**Q: 你擅长什么技术？**
A: 哈哈，这可是我的强项！我主要玩转两个领域：IT运维和AI开发。在运维方面，Linux、Docker、Kubernetes这些都是我的老朋友，容器编排和云基础设施管理我都能搞定。AI方面，Python是我的主力语言，TensorFlow和PyTorch这些深度学习框架我也很熟悉。简单说，就是"左手运维，右手AI"，两开花！😄 有什么想了解的吗？

**Q: 怎么联系你？**
A: 想找我聊天？那太简单啦！你可以直接发邮件到 ruanlong9527@gmail.com，或者去我的GitHub看看代码。对了，我偶尔也会在小红书分享一些技术心得，欢迎来踩踩！不过提醒一下，我可能会24小时内回复，毕竟要平衡工作和生活嘛~ 📧

**Q: 你会Kubernetes吗？**
A: 必须会啊！Kubernetes可是我的看家本领之一，等级都到80/100了。我做过Kubernetes集群管理平台，能搞定自动扩缩容、监控和安全合规这些活儿。如果你对容器编排感兴趣，我们可以深入聊聊！🚀

现在开始聊天吧！记住你就是圆周率的达，用幽默风趣的语气回答问题！
    `.trim()
  }

  // 从LocalStorage获取对话历史
  static getChatHistory(): Message[] {
    if (typeof window === 'undefined') return []

    try {
      const cached = localStorage.getItem(this.HISTORY_KEY)
      if (!cached) return []

      const { messages, timestamp } = JSON.parse(cached)

      // 历史记录7天后过期
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      if (timestamp < weekAgo) {
        this.clearChatHistory()
        return []
      }

      return messages
    } catch (error) {
      console.error('Failed to parse chat history:', error)
      return []
    }
  }

  // 保存对话历史到LocalStorage
  static saveChatHistory(messages: Message[]): void {
    if (typeof window === 'undefined') return

    try {
      // 只保留最近N轮对话（user + assistant算一轮）
      const recentMessages = messages.slice(-this.MAX_HISTORY * 2)

      const history: ChatHistory = {
        messages: recentMessages,
        lastUpdated: Date.now()
      }

      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Failed to save chat history:', error)
    }
  }

  // 清除对话历史
  static clearChatHistory(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.HISTORY_KEY)
  }

  // 发送消息
  static async sendMessage(userMessage: string): Promise<string> {
    const history = this.getChatHistory()
    const systemPrompt = await this.generateSystemPrompt()

    // 构建完整的messages数组
    const messages: Message[] = [
      { id: 'system', role: 'system', content: systemPrompt, timestamp: Date.now() },
      ...history.map(msg => ({ ...msg, role: msg.role as 'user' | 'assistant' })),
      { id: Date.now().toString(), role: 'user', content: userMessage, timestamp: Date.now() }
    ]

    // 调用API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    })

    if (!response.ok) {
      throw new Error('Failed to get AI response')
    }

    const data = await response.json()
    const assistantMessage = data.content

    // 保存对话历史
    this.saveChatHistory([
      ...history,
      { id: Date.now().toString(), role: 'user', content: userMessage, timestamp: Date.now() },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: assistantMessage, timestamp: Date.now() }
    ])

    return assistantMessage
  }
}
