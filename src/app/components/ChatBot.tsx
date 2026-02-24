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
        content: '👋 Hi! I\'m the AI assistant for this portfolio!\n\nAsk me anything about tech stack, project experience, or collaboration opportunities. I\'ll respond in a friendly tone!\n\nReady to get started? 😄',
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
        content: 'Sorry, I encountered a technical issue. Please check API configuration or try again later! 🤖',
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
     if (confirm('Are you sure you want to clear conversation history?')) {
      ChatService.clearChatHistory()
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '👋 Hi! I\'m the AI assistant for this portfolio!\n\nAsk me anything about tech stack, project experience, or collaboration opportunities. I\'ll respond in a friendly tone!\n\nReady to get started? 😄',
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
            <div className="bg-white border border-gray-200/80 rounded-lg px-4 py-3 text-sm shadow-lg">
              <div className="font-bold text-sm mb-1 flex items-center gap-2 text-futuristic-dark">
                <Bot className="w-4 h-4" />
                AI Assistant
                <span className="w-2 h-2 bg-futuristic-blue rounded-full animate-pulse" />
              </div>
              <div className="text-xs text-gray-600">Click to start conversation</div>
            </div>
          </div>

        {/* Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-l-2xl rounded-r-none transition-all duration-300 hover:scale-105 flex items-center justify-center relative overflow-hidden ${
            isOpen
              ? 'bg-white w-12 h-12 border-2 border-gray-300'
              : 'bg-futuristic-blue border-2 border-futuristic-blue/80'
          }`}
          style={{
            boxShadow: isOpen ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 4px 20px rgba(0, 122, 255, 0.2)'
          }}
          aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        >
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient-shift" />

          {/* Online indicator */}
          {!isOpen && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-futuristic-blue rounded-full animate-pulse" />
          )}

          {/* Icon and text */}
          {isOpen ? (
            <X className="w-5 h-5 text-gray-700 relative z-10" />
          ) : (
            <div className="flex flex-col items-center gap-1 relative z-10">
              <Bot className="w-6 h-6 text-white" />
              <span className="text-[8px] font-bold text-white tracking-wider">AI</span>
            </div>
          )}

          {/* Chat bubble decoration */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-futuristic-blue rounded-full" />
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
          className="w-96 max-w-[calc(100vw-4rem)] bg-white/95 backdrop-blur-xl border border-gray-300/50 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-futuristic-blue/10 to-futuristic-cyan/10 px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-futuristic-blue/10 border-2 border-futuristic-blue flex items-center justify-center">
                   <Bot className="w-6 h-6 text-futuristic-blue" />
                </div>
                <div>
                   <h3 className="font-archivo font-bold text-futuristic-dark text-lg">Futuristic AI</h3>
                  <p className="text-xs text-futuristic-blue">AI Assistant · Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button
                  onClick={handleClear}
                  className="p-2 rounded-lg hover:bg-futuristic-blue/10 text-gray-500 hover:text-futuristic-blue transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Close"
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-futuristic-blue/20 border border-futuristic-blue flex items-center justify-center">
                    <Bot className="w-5 h-5 text-futuristic-blue" />
                  </div>
                  <div className="py-3 px-4 rounded-2xl bg-futuristic-blue/10 border border-futuristic-blue/30">
                    <Loader2 className="w-5 h-5 text-futuristic-blue animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
           <div className="p-4 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-end gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                 placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                 className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:border-futuristic-blue focus:ring-1 focus:ring-futuristic-blue/20 transition-all"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                 className={`p-3 rounded-xl transition-all ${
                  input.trim() && !isLoading
                    ? 'bg-futuristic-blue text-white hover:bg-futuristic-blue/80 hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="text-xl">↵</span>
                )}
              </button>
            </div>
             <p className="text-xs text-gray-500 mt-2 text-center">
               Powered by DeepSeek · Conversation history saved locally
             </p>
          </div>
        </div>
      )}
    </>
  )
}
