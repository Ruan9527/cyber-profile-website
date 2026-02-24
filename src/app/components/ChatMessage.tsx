'use client'

import { Message } from '@/types/chat'
import { User, MessageCircle } from 'lucide-react'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-3 h-3 text-blue-500" />
          </div>
        )}
        {isUser && (
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <User className="w-3 h-3 text-gray-500" />
          </div>
        )}

        {/* Message Bubble */}
        <div className={`px-4 py-2.5 rounded-2xl ${
          isUser
            ? 'bg-white border border-gray-100 text-gray-700 rounded-br-md'
            : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 text-gray-700 rounded-bl-md'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
