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
          isUser ? 'bg-futuristic-blue/20 border border-futuristic-blue' : 'bg-futuristic-cyan/20 border border-futuristic-cyan'
        }`}>
          {isUser ? <User className="w-5 h-5 text-futuristic-blue" /> : <Bot className="w-5 h-5 text-futuristic-cyan" />}
        </div>

        {/* Message Bubble */}
        <div className={`py-3 px-4 rounded-2xl ${
          isUser
            ? 'bg-futuristic-blue/10 border border-futuristic-blue/30 text-gray-800'
            : 'bg-gray-100 border border-gray-300 text-gray-800'
        }`}>
          <p className="font-space-grotesk text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
