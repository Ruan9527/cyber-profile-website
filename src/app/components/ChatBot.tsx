'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, MessageCircle, Trash2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import { ChatService } from '@/lib/chatService'
import { Message } from '@/types/chat'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatPanelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatPanelRef.current && 
          !chatPanelRef.current.contains(event.target as Node) &&
          buttonRef.current && 
          !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    const history = ChatService.getChatHistory()
    if (history.length > 0) {
      setMessages(history)
    } else {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '你好！👋 我是你的AI助手\n\n可以问我关于技术栈、项目经验或合作机会的问题，我很乐意为你解答！',
        timestamp: Date.now()
      }])
    }
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 100)
      textarea.style.height = `${newHeight}px`
    }
  }, [input])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')

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
        content: '出错了，请稍后再试',
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
        content: '你好！👋 我是你的AI助手\n\n可以问我关于技术栈、项目经验或合作机会的问题，我很乐意为你解答！',
        timestamp: Date.now()
      }])
    }
  }

  return (
    <>
      {/* Floating Button */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: '1.5rem',
          transform: 'translateY(-50%)',
          zIndex: 999
        }}
        className="flex items-center gap-3"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {!isOpen && showTooltip && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-200 mr-2">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-gray-100 whitespace-nowrap">
              <span className="text-sm text-gray-600 font-medium">AI分身</span>
            </div>
          </div>
        )}

        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
          aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatPanelRef}
          style={{
            position: 'fixed',
            top: '50%',
            right: '5rem',
            transform: 'translateY(-50%)',
            zIndex: 998
          }}
          className="w-80 md:w-96 max-h-[600px] bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-right-4 fade-in duration-300"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm -mb-1">AI分身</h3>
                  <p className="text-xs text-gray-400">随时为你服务</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500 transition-colors"
                  title="清空对话"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100/50">
            <div className="flex items-end gap-2 bg-gray-50/50 rounded-2xl p-1.5 border border-gray-100">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入消息..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none max-h-24"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  input.trim() && !isLoading
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
