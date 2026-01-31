'use client'

import { Message } from '@/types/chat'
import { User, Bot } from 'lucide-react'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-cyber-cyan/20 border border-cyber-cyan' : 'bg-cyber-purple/20 border border-cyber-purple'
        }`}>
          {isUser ? <User className="w-5 h-5 text-cyber-cyan" /> : <Bot className="w-5 h-5 text-cyber-purple" />}
        </div>

        {/* Message Bubble */}
        <div className={`py-3 px-4 rounded-2xl ${
          isUser
            ? 'bg-cyber-cyan/20 border border-cyber-cyan/40 text-white'
            : 'bg-cyber-purple/20 border border-cyber-purple/40 text-white'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{message.content}</p>
        </div>
      </div>
    </div>
  )
}
