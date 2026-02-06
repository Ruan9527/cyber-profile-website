'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Bot, Loader2, Trash2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import { ChatService } from '@/lib/chatService'
import { Message } from '@/types/chat'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // 加载历史记录
  useEffect(() => {
    const history = ChatService.getChatHistory()
    if (history.length > 0) {
      setMessages(history)
    } else {
      // 添加欢迎消息
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '👋 嗨！我是圆周率的达的AI助手！\n\n问我任何关于我的技术栈、项目经验、或者合作意向的问题，我会用幽默风趣的语气回答你！\n\n准备好开始了吗？😄',
        timestamp: Date.now()
      }])
    }
  }, [])

  // 自动调整输入框高度
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 120)
      textarea.style.height = `${newHeight}px`
    }
  }, [input])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')

    // 添加用户消息
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, newUserMessage])

    setIsLoading(true)

    try {
      const response = await ChatService.sendMessage(userMessage)

      // 添加AI回复
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我遇到了一些技术问题。请检查API配置或稍后再试试吧！🤖',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    if (confirm('确定要清空对话历史吗？')) {
      ChatService.clearChatHistory()
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '👋 嗨！我是圆周率的达的AI助手！\n\n问我任何关于我的技术栈、项目经验、或者合作意向的问题，我会用幽默风趣的语气回答你！\n\n准备好开始了吗？😄',
        timestamp: Date.now()
      }])
    }
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <div
        style={{
          position: 'fixed',
          bottom: '6rem',
          right: 0,
          zIndex: 1000
        }}
        className={`group transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-[1.5rem]'}`}
      >
        {/* 提示文本 */}
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gradient-to-r from-cyber-purple/98 to-cyber-pink/98 border border-cyber-purple/50 rounded-lg px-4 py-3 text-sm" style={{ boxShadow: '0 0 15px rgba(209, 153, 255, 0.3)' }}>
            <div className="font-bold text-sm mb-1 flex items-center gap-2 text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
              <Bot className="w-4 h-4" />
              AI 助手
              <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            </div>
            <div className="text-xs text-white/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>点击开始聊天对话</div>
          </div>
        </div>

        {/* 按钮 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-l-2xl rounded-r-none transition-all duration-300 hover:scale-105 flex items-center justify-center relative overflow-hidden ${
            isOpen
              ? 'bg-gradient-to-r from-cyber-red to-cyber-pink w-12 h-12 border-2 border-cyber-red'
              : 'bg-gradient-to-r from-cyber-purple to-cyber-pink border-2 border-cyber-purple/50'
          }`}
          style={{
            boxShadow: isOpen ? '0 0 15px rgba(255, 102, 128, 0.3)' : '0 0 15px rgba(209, 153, 255, 0.3)'
          }}
          aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        >
          {/* 背景动画 - 降低不透明度 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-shift" />

          {/* 在线状态指示灯 - 降低发光强度 */}
          {!isOpen && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-cyber-green rounded-full animate-pulse shadow-[0_0_8px_rgba(102,255,204,0.6)]" />
          )}

          {/* 图标和文字 - 增加文字阴影提高可读性 */}
          {isOpen ? (
            <X className="w-5 h-5 text-white relative z-10" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
          ) : (
            <div className="flex flex-col items-center gap-1 relative z-10">
              <Bot className="w-6 h-6 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }} />
              <span className="text-[8px] font-bold text-white tracking-wider" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>AI</span>
            </div>
          )}

          {/* 对话气泡装饰 - 降低发光强度 */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-cyan rounded-full flex items-center justify-center" style={{ boxShadow: '0 0 8px rgba(102,224,255,0.5)' }}>
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </button>
      </div>

      {/* 对话框 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '10rem',
            right: '4rem',
            left: 'auto',
            zIndex: 1000
          }}
          className="w-96 max-w-[calc(100vw-4rem)] bg-cyber-black/95 backdrop-blur-xl border border-cyber-cyan/30 rounded-2xl shadow-cyber-xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 px-5 py-4 border-b border-cyber-cyan/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyber-cyan/20 border-2 border-cyber-cyan flex items-center justify-center">
                  <Bot className="w-6 h-6 text-cyber-cyan" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>圆周率的达</h3>
                  <p className="text-xs text-cyber-cyan" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>AI助手 · 在线</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="p-2 rounded-lg hover:bg-cyber-cyan/10 text-cyber-gray hover:text-cyber-cyan transition-colors"
                  title="清空对话"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-cyber-red/10 text-cyber-gray hover:text-cyber-red transition-colors"
                  title="关闭"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-5 space-y-2 custom-scrollbar">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyber-purple/20 border border-cyber-purple flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyber-purple" />
                  </div>
                  <div className="py-3 px-4 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/30">
                    <Loader2 className="w-5 h-5 text-cyber-purple animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-cyber-cyan/30 bg-cyber-black/50">
            <div className="flex items-end gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入消息... (Enter发送，Shift+Enter换行)"
                className="flex-1 bg-cyber-gray/20 border border-cyber-cyan/30 rounded-xl px-4 py-3 text-white placeholder-white/40 resize-none focus:outline-none focus:border-cyber-cyan/60 focus:ring-1 focus:ring-cyber-cyan/20 transition-all"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-xl transition-all ${
                  input.trim() && !isLoading
                    ? 'bg-cyber-cyan text-black hover:bg-cyber-cyan/80 hover:scale-105'
                    : 'bg-cyber-gray/30 text-white/40 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="text-xl">↵</span>
                )}
              </button>
            </div>
            <p className="text-xs text-white/40 mt-2 text-center">
              由 DeepSeek 驱动 · 对话历史保存在本地
            </p>
          </div>
        </div>
      )}
    </>
  )
}
