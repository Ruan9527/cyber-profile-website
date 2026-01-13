'use client'

import { useState, useEffect } from 'react'
import { Send, MessageCircle, User, Mail, Clock } from 'lucide-react'
import { Message } from '@/types'
import { supabase } from '@/lib/supabase'

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Mock messages for now - will be replaced with Supabase data
  const mockMessages: Message[] = [
    {
      id: 1,
      name: "Alex Chen",
      email: "alex@example.com",
      content: "Amazing cyberpunk portfolio! The glitch effects are incredible. Love the attention to detail.",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_approved: true
    },
    {
      id: 2,
      name: "Sarah Kim",
      email: "sarah@example.com", 
      content: "Your design sense is out of this world! The neon aesthetic really captures that cyberpunk vibe perfectly.",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      is_approved: true
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      content: "Great work on the interactive elements! Would love to collaborate on a future project.",
      created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      is_approved: true
    }
  ]

  useEffect(() => {
    // Load messages from Supabase or fallback to mock data
    const loadMessages = async () => {
      // Check if Supabase is properly configured
      const isSupabaseConfigured = 
        process.env.NEXT_PUBLIC_SUPABASE_URL && 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

      if (!isSupabaseConfigured) {
        // Use mock data if Supabase is not configured
        setMessages(mockMessages.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ))
        return
      }

      try {
        console.log('🔗 尝试连接 Supabase...')
        console.log('🔗 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        
        console.log('🔍 查询所有留言（包括未批准的）...')
        const { data: allData, error: allError } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })
          
        console.log('📊 所有数据:', allData)
        
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('❌ Supabase 连接失败:', error)
          // Fallback to mock data if Supabase fails
          setMessages(mockMessages.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ))
        } else {
          console.log('✅ Supabase 连接成功! 获取到', data?.length || 0, '条留言')
          setMessages(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
        // Fallback to mock data
        setMessages(mockMessages.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ))
      }
    }

    loadMessages()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Check if Supabase is properly configured
    const isSupabaseConfigured = 
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

    try {
      if (isSupabaseConfigured) {
        console.log('📝 正在提交留言到 Supabase...')
        // Insert message into Supabase
        const { error } = await supabase
          .from('messages')
          .insert([{
            name: formData.name,
            email: formData.email,
            content: formData.content,
            is_approved: true
          }])

        if (error) {
          console.error('❌ 留言提交失败:', error)
          throw error
        } else {
          console.log('✅ 留言提交成功!')
        }
      } else {
        // Mock submission if Supabase is not configured
        console.log('📝 Mock 模式提交留言:', formData)
      }

      // Add message to local state
      const newMessage: Message = {
        id: messages.length + 1,
        ...formData,
        created_at: new Date().toISOString(),
        is_approved: true
      }
      
      setMessages([newMessage, ...messages])
      setFormData({ name: '', email: '', content: '' })
      setSubmitStatus('success')
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('Error submitting message:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <section className="py-20 px-4 relative bg-gradient-to-b from-cyber-gray/5 to-cyber-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-cyber-cyan">GUEST BOOK</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Message Form */}
          <div className="cyber-card">
            <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              Leave a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="cyber-input pl-10"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="cyber-input pl-10"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="cyber-input resize-none"
                  placeholder="Share your thoughts..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cyber-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-cyber-cyan/10 border-2 border-cyber-cyan/50 text-cyber-cyan text-center font-bold">
                  Message sent successfully! 🎉
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-cyber-red/10 border-2 border-cyber-red/50 text-cyber-red text-center font-bold">
                  Error sending message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Messages Display */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6" />
              Recent Messages
            </h3>

            {messages.length === 0 ? (
              <div className="cyber-card text-center py-8">
                <p className="text-white/70">No messages yet. Be the first to leave one!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="cyber-card group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-cyber-cyan group-hover:text-cyber-yellow transition-colors">
                        {message.name}
                      </h4>
                      <p className="text-xs text-white/60 uppercase tracking-wider">
                        {formatTimeAgo(message.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 cyber-card px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-cyan mb-2">
                {messages.length}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">
                Total Messages
              </div>
            </div>
            <div className="w-px h-8 bg-cyber-gray/30" />
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-yellow">
                24/7
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">
                Active Monitor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}