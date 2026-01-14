'use client'

import { useState, useEffect } from 'react'
import { Mail, Github, Linkedin, Twitter, QrCode, Phone, MapPin, Download, ExternalLink, AlertCircle, Loader2, MessageCircle, User, Clock, Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import useFormValidation from '@/hooks/useFormValidation'
import { Message } from '@/types'
import { supabase } from '@/lib/supabase'

export default function ContactSection() {
  const { t } = useLanguage()
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState<'private' | 'public'>('private')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [publicFormData, setPublicFormData] = useState({
    name: '',
    email: '',
    content: ''
  })
  const [publicMessages, setPublicMessages] = useState<any[]>([])
  const [showAllPublicMessages, setShowAllPublicMessages] = useState(false)

  const {
    errors,
    setErrors,
    isSubmitting: isFormSubmitting,
    setIsSubmitting,
    validateForm,
    handleFieldChange,
    clearErrors,
    getFieldError,
    getCharacterCount,
    getMaxLength
  } = useFormValidation({
    minNameLength: 2,
    maxNameLength: 50,
    minMessageLength: 10,
    maxMessageLength: 500,
    requireEmail: true,
    requireSubject: true
  })

  const contacts = [
    {
      icon: Mail,
      label: t('contact.email_label'),
      value: 'ruanlong9527@gmail.com',
      link: 'mailto:ruanlong9527@gmail.com',
      color: 'cyber-cyan',
      description: t('contact.email_desc')
    },
    {
      icon: Github,
      label: t('contact.github_label'),
      value: 'yourusername',
      link: 'https://github.com/yourusername',
      color: 'cyber-gray',
      description: t('contact.github_desc')
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin_label'),
      value: 'in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile',
      color: 'cyber-blue',
      description: t('contact.linkedin_desc')
    },
    {
      icon: Twitter,
      label: t('contact.twitter_label'),
      value: '@yourusername',
      link: 'https://twitter.com/yourusername',
      color: 'cyber-yellow',
      description: t('contact.twitter_desc')
    }
  ]

  // Mock messages for public message board
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

  // Load public messages
  useEffect(() => {
    const loadPublicMessages = async () => {
      // Check if Supabase is properly configured
      const isSupabaseConfigured = supabase !== null

      if (!isSupabaseConfigured) {
        // Use mock data if Supabase is not configured
        setPublicMessages(mockMessages.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ))
        return
      }

      try {
        // TypeScript type guard - ensure supabase is not null
        if (!supabase) {
          throw new Error('Supabase client not initialized')
        }

        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false })

        if (error) {
          // Fallback to mock data if Supabase fails
          setPublicMessages(mockMessages.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ))
        } else {
          setPublicMessages(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
        // Fallback to mock data
        setPublicMessages(mockMessages.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ))
      }
    }

    loadPublicMessages()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const handlePrivateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    clearErrors()

    try {
      // Send email using mailto or a service
      const mailtoLink = `mailto:ruanlong9527@gmail.com?subject=${encodeURIComponent(formData.subject.trim())}&body=${encodeURIComponent(
        `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
      )}`
      window.location.href = mailtoLink

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
     } finally {
       setIsSubmitting(false)
     }
   }

   // Public message board form validation
   const {
     errors: publicErrors,
     setErrors: setPublicErrors,
     isSubmitting: isPublicSubmitting,
     setIsSubmitting: setIsPublicSubmitting,
     validateForm: validatePublicForm,
     handleFieldChange: handlePublicFieldChange,
     clearErrors: clearPublicErrors,
     getFieldError: getPublicFieldError,
     getCharacterCount: getPublicCharacterCount,
     getMaxLength: getPublicMaxLength
   } = useFormValidation({
     minNameLength: 2,
     maxNameLength: 50,
     minMessageLength: 10,
     maxMessageLength: 500,
     requireEmail: true,
     requireSubject: false
   })

   const [publicSubmitStatus, setPublicSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

   const handlePublicSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     
     // Validate form
     const validationErrors = validatePublicForm(publicFormData)
     if (validationErrors.length > 0) {
       setPublicErrors(validationErrors)
       return
     }
     
     setIsPublicSubmitting(true)
     setPublicSubmitStatus('idle')
     clearPublicErrors()

     // Check if Supabase is properly configured
     const isSupabaseConfigured = supabase !== null

     try {
       if (isSupabaseConfigured) {
         // TypeScript type guard - ensure supabase is not null
         if (!supabase) {
           throw new Error('Supabase client not initialized')
         }

         // Insert message into Supabase
         const { error } = await supabase
           .from('messages')
           .insert([{
             name: publicFormData.name.trim(),
             email: publicFormData.email.trim(),
             content: publicFormData.content.trim(),
             is_approved: true
           }])

         if (error) {
           throw error
         }
       } else {
         // Mock submission if Supabase is not configured
         // (this case should not happen in production)
       }

       // Add message to local state
       const newMessage: Message = {
         id: publicMessages.length + 1,
         name: publicFormData.name.trim(),
         email: publicFormData.email.trim(),
         content: publicFormData.content.trim(),
         created_at: new Date().toISOString(),
         is_approved: true
       }
       
       setPublicMessages([newMessage, ...publicMessages])
       setPublicFormData({ name: '', email: '', content: '' })
       setPublicSubmitStatus('success')
       
       // Reset status after 3 seconds
       setTimeout(() => setPublicSubmitStatus('idle'), 3000)
     } catch (error) {
       console.error('Error submitting message:', error)
       setPublicSubmitStatus('error')
       setTimeout(() => setPublicSubmitStatus('idle'), 3000)
     } finally {
       setIsPublicSubmitting(false)
     }
   }

   const locations = [
    {
      icon: MapPin,
      city: 'San Francisco',
      country: 'United States',
      timezone: 'PST (UTC-8)'
    },
    {
      icon: MapPin,
      city: 'Available Remote',
      country: 'Worldwide',
      timezone: 'Flexible'
    }
  ]

   return (
     <section id="contact" className="py-16 px-4 relative bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black">
       <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10"
              style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
            <span className="text-cyber-cyan">{t('contact.title')}</span>
          </h2>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTab('private')}
              className={`px-6 py-3 font-bold rounded-lg border-2 transition-all duration-300 ${
                activeTab === 'private' 
                  ? 'cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow' 
                  : 'text-white/70 border-cyber-gray/50 hover:border-cyber-cyan hover:text-cyber-cyan'
              }`}
            >
              Private Inquiry
            </button>
            <button
              onClick={() => setActiveTab('public')}
              className={`px-6 py-3 font-bold rounded-lg border-2 transition-all duration-300 ${
                activeTab === 'public' 
                  ? 'cyber-button bg-cyber-cyan border-cyber-cyan hover:bg-cyber-yellow hover:border-cyber-yellow' 
                  : 'text-white/70 border-cyber-gray/50 hover:border-cyber-yellow hover:text-cyber-yellow'
              }`}
            >
              Public Message Board
            </button>
          </div>

          {activeTab === 'private' && (
          <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="cyber-card">
              <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 flex items-center gap-3"
                  style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.4)' }}>
                <Mail className="w-6 h-6" />
                {t('contact.get_in_touch')}
              </h3>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.map((contact) => {
                    const Icon = contact.icon
                    return (
                      <a
                        key={contact.label}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`cyber-card p-4 group relative overflow-hidden cursor-pointer ${
                          hoveredContact === contact.label ? 'border-cyber-cyan/80' : ''
                        }`}
                        onMouseEnter={() => setHoveredContact(contact.label)}
                        onMouseLeave={() => setHoveredContact(null)}
                      >
                        {/* Enhanced hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyber-cyan/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10 flex items-center gap-4">
                          <div className={`p-4 bg-${contact.color}/15 border-2 border-${contact.color}/50 rounded-lg group-hover:scale-110 transition-transform group-hover:rotate-12`}
                               style={{ boxShadow: `0 0 15px rgba(0, 240, 255, 0.3)` }}>
                            <Icon className={`w-6 h-6 text-${contact.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-cyber-gray uppercase tracking-wider mb-1">
                              {contact.label}
                            </div>
                            <div className="text-cyber-cyan font-bold group-hover:text-cyber-yellow transition-colors"
                                 style={{ textShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}>
                              {contact.value}
                            </div>
                            <div className="text-xs text-white/60 mt-1">
                              {contact.description}
                            </div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-cyber-gray group-hover:text-cyber-cyan transition-colors" />
                        </div>
                      </a>
                    )
                  })}
                </div>
            </div>

            {/* Resume Download */}
            <div className="cyber-card bg-gradient-to-r from-cyber-red/10 to-cyber-yellow/10 border-l-4 border-l-cyber-red">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-cyber-yellow mb-2"
                      style={{ textShadow: '0 0 10px rgba(252, 238, 10, 0.3)' }}>
                    {t('contact.download_resume')}
                  </h3>
                  <p className="text-white/70">
                    {t('contact.download_desc')}
                  </p>
                </div>
                <button className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  PDF
                </button>
              </div>
            </div>
          </div>

          {/* WeChat QR Code & Location */}
          <div className="space-y-6">
            {/* QR Code Section */}
            <div className="cyber-card text-center">
              <h3 className="font-display text-xl font-bold text-cyber-yellow mb-4 flex items-center justify-center gap-3"
                  style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.4)' }}>
                <QrCode className="w-6 h-6" />
                {t('contact.wechat')}
              </h3>

               <div className="relative inline-block group mb-4">
                 <div className="w-32 h-32 bg-cyber-black border-4 border-cyber-cyan rounded-lg p-2 group-hover:border-cyber-yellow transition-all duration-300 group-hover:scale-105"
                      style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.2)' }}>
                   {/* Placeholder for QR Code */}
                   <div className="w-full h-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-yellow/20 flex items-center justify-center">
                     <QrCode className="w-16 h-16 text-cyber-cyan" />
                   </div>
                 </div>
                 {/* QR code glow ring */}
                 <div className="absolute inset-0 -m-2 rounded-lg border-2 border-cyber-yellow/30 animate-pulse" />
               </div>

              <p className="text-sm text-white/70 mb-2">
                {t('contact.scan_wechat')}
              </p>
              <div className="text-xs text-cyber-yellow font-mono-tech uppercase tracking-wider"
                  style={{ textShadow: '0 0 10px rgba(252, 238, 10, 0.3)' }}>
                @cyberdev
              </div>
            </div>

            {/* Locations */}
            <div className="cyber-card">
              <h3 className="font-display text-xl font-bold text-cyber-yellow mb-4 flex items-center gap-3"
                  style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.4)' }}>
                <MapPin className="w-6 h-6" />
                {t('contact.location')}
              </h3>

              <div className="space-y-3">
                {locations.map((location, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyber-cyan mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-cyber-cyan font-bold">
                        {location.city}
                      </div>
                      <div className="text-sm text-white/70">
                        {location.country}
                      </div>
                      <div className="text-xs text-cyber-gray/60">
                        {location.timezone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-cyber-gray/30">
                <div className="flex items-center gap-2 text-sm text-cyber-yellow"
                     style={{ textShadow: '0 0 10px rgba(252, 238, 10, 0.3)' }}>
                  <Phone className="w-4 h-4" />
                  {t('contact.available_remote')}
                </div>
              </div>
            </div>
           </div>
          </div>

        {/* Contact Form - Private Inquiry */}
        <div className="mt-12 cyber-card">
          <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 text-center"
              style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.4)' }}>
            {t('contact.send_private_inquiry')}
          </h3>

          <form onSubmit={handlePrivateSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">
                     {t('message_board.name')}
                   </label>
                   <div className="text-xs text-white/50">
                     {formData.name.length}/{getMaxLength('name')}
                   </div>
                 </div>
                 <input
                   type="text"
                   required
                   value={formData.name}
                   onChange={(e) => {
                     setFormData({ ...formData, name: e.target.value })
                     handleFieldChange('name', e.target.value)
                   }}
                   className="cyber-input"
                   placeholder={t('message_board.placeholder_name')}
                   maxLength={getMaxLength('name')}
                 />
                 {/* Error message for name */}
                 {errors.some(e => e.field === 'name') && (
                   <div className="mt-2 flex items-center gap-2 text-cyber-red text-sm">
                     <AlertCircle className="w-4 h-4 flex-shrink-0" />
                     <span>{errors.find(e => e.field === 'name')?.message}</span>
                   </div>
                 )}
               </div>

               <div>
                 <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                   {t('message_board.email')}
                 </label>
                 <input
                   type="email"
                   required
                   value={formData.email}
                   onChange={(e) => {
                     setFormData({ ...formData, email: e.target.value })
                     handleFieldChange('email', e.target.value)
                   }}
                   className="cyber-input"
                   placeholder={t('message_board.placeholder_email')}
                 />
                 {/* Error message for email */}
                 {errors.some(e => e.field === 'email') && (
                   <div className="mt-2 flex items-center gap-2 text-cyber-red text-sm">
                     <AlertCircle className="w-4 h-4 flex-shrink-0" />
                     <span>{errors.find(e => e.field === 'email')?.message}</span>
                   </div>
                 )}
               </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">
                    {t('contact.subject')}
                  </label>
                  <div className="text-xs text-white/50">
                    {formData.subject.length}/100
                  </div>
                </div>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value })
                  handleFieldChange('subject', e.target.value)
                }}
                className="cyber-input"
                placeholder={t('contact.placeholder_subject')}
                maxLength={100}
              />
              {/* Error message for subject */}
              {errors.some(e => e.field === 'subject') && (
                <div className="mt-2 flex items-center gap-2 text-cyber-red text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.find(e => e.field === 'subject')?.message}</span>
                </div>
              )}
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">
                    {t('message_board.message')}
                  </label>
                  <div className="text-xs text-white/50">
                    {formData.message.length}/{getMaxLength('content')}
                  </div>
                </div>
              <textarea
                rows={6}
                required
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value })
                  handleFieldChange('content', e.target.value)
                }}
                className="cyber-input resize-none"
                placeholder={t('contact.placeholder_message')}
                maxLength={getMaxLength('content')}
              />
              {/* Error message for message */}
              {errors.some(e => e.field === 'content') && (
                <div className="mt-2 flex items-center gap-2 text-cyber-red text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.find(e => e.field === 'content')?.message}</span>
                </div>
              )}
            </div>

             <div className="text-center">
               <button
                 type="submit"
                 disabled={isFormSubmitting}
                 className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow px-8 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isFormSubmitting ? (
                   <>
                     <Loader2 className="w-5 h-5 animate-spin" />
                     {t('message_board.sending')}
                   </>
                 ) : (
                   t('contact.send_message')
                 )}
               </button>
             </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-cyber-cyan/10 border-2 border-cyber-cyan/50 text-cyber-cyan text-center font-bold">
                {t('message_board.success')}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-cyber-red/10 border-2 border-cyber-red/50 text-cyber-red text-center font-bold">
                {t('message_board.error')}
              </div>
            )}
           </form>
          </div>
        </>
        )}

       {activeTab === 'public' && (
         <div className="space-y-8">
           {/* Public Message Board */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Message Form */}
             <div className="cyber-card">
               <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 flex items-center gap-3"
                   style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.4)' }}>
                 <MessageCircle className="w-6 h-6" />
                 Leave a Public Message
               </h3>

               <form onSubmit={handlePublicSubmit} className="space-y-6">
                 <div>
                   <div className="flex justify-between items-center mb-2">
                     <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">
                       Your Name
                     </label>
                     <div className="text-xs text-white/50">
                       {publicFormData.name.length}/{getPublicMaxLength('name')}
                     </div>
                   </div>
                   <div className="relative">
                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
                     <input
                       type="text"
                       required
                       value={publicFormData.name}
                       onChange={(e) => {
                         setPublicFormData({ ...publicFormData, name: e.target.value })
                         handlePublicFieldChange('name', e.target.value)
                       }}
                       className="cyber-input pl-10"
                       placeholder="Enter your name"
                       maxLength={getPublicMaxLength('name')}
                     />
                   </div>
                   {/* Error message for name */}
                   {publicErrors.some(e => e.field === 'name') && (
                     <div className="mt-2 flex items-center gap-2 text-cyber-red text-sm">
                       <AlertCircle className="w-4 h-4 flex-shrink-0" />
                       <span>{publicErrors.find(e => e.field === 'name')?.message}</span>
                     </div>
                   )}
                 </div>

                 <div>
                   <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                     Email Address
                   </label>
                   <div className="relative">
                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
                     <input
                       type="email"
                       required
                       value={publicFormData.email}
                       onChange={(e) => {
                         setPublicFormData({ ...publicFormData, email: e.target.value })
                         handlePublicFieldChange('email', e.target.value)
                       }}
                       className="cyber-input pl-10"
                       placeholder="Enter your email"
                     />
                   </div>
                   {/* Error message for email */}
                   {publicErrors.some(e => e.field === 'email') && (
                     <div className="mt-2 flex items-center gap-2 text-cyber-red text-sm">
                       <AlertCircle className="w-4 h-4 flex-shrink-0" />
                       <span>{publicErrors.find(e => e.field === 'email')?.message}</span>
                     </div>
                   )}
                 </div>

                 <div>
                   <div className="flex justify-between items-center mb-2">
                     <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">
                       Your Message
                     </label>
                     <div className="text-xs text-white/50">
                       {publicFormData.content.length}/{getPublicMaxLength('content')}
                     </div>
                   </div>
                   <textarea
                     required
                     value={publicFormData.content}
                     onChange={(e) => {
                       setPublicFormData({ ...publicFormData, content: e.target.value })
                       handlePublicFieldChange('content', e.target.value)
                     }}
                     rows={4}
                     className="cyber-input resize-none"
                     placeholder="Share your thoughts..."
                     maxLength={getPublicMaxLength('content')}
                   />
                   {/* Error message for content */}
                   {publicErrors.some(e => e.field === 'content') && (
                     <div className="mt-2 flex items-center gap-2 text-cyber-red text-sm">
                       <AlertCircle className="w-4 h-4 flex-shrink-0" />
                       <span>{publicErrors.find(e => e.field === 'content')?.message}</span>
                     </div>
                   )}
                 </div>

                 <button
                   type="submit"
                   disabled={isPublicSubmitting}
                   className="cyber-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {isPublicSubmitting ? (
                     <>
                       <Loader2 className="w-5 h-5 animate-spin" />
                       Sending...
                     </>
                   ) : (
                     <>
                       <Send className="w-5 h-5" />
                       Post Message
                     </>
                   )}
                 </button>

                 {publicSubmitStatus === 'success' && (
                   <div className="p-4 bg-cyber-cyan/10 border-2 border-cyber-cyan/50 text-cyber-cyan text-center font-bold">
                     Message posted successfully!
                   </div>
                 )}

                 {publicSubmitStatus === 'error' && (
                   <div className="p-4 bg-cyber-red/10 border-2 border-cyber-red/50 text-cyber-red text-center font-bold">
                     Error posting message. Please try again.
                   </div>
                 )}
               </form>
             </div>

             {/* Messages Display */}
             <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
               <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 flex items-center gap-3"
                   style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.4)' }}>
                 <Clock className="w-6 h-6" />
                 Recent Messages
               </h3>

               {publicMessages.length === 0 ? (
                 <div className="cyber-card text-center py-8">
                   <p className="text-white/70">No messages yet. Be the first to share!</p>
                 </div>
               ) : (
                 <>
                   {(showAllPublicMessages ? publicMessages : publicMessages.slice(0, 3)).map((message) => (
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
                   ))}
                   {publicMessages.length > 3 && (
                     <div className="text-center pt-4">
                       <button
                         onClick={() => setShowAllPublicMessages(!showAllPublicMessages)}
                         className="cyber-button bg-cyber-gray/50 border-cyber-gray hover:bg-cyber-cyan hover:border-cyber-cyan"
                       >
                         {showAllPublicMessages ? 'Show Less' : `Show More (${publicMessages.length - 3}+)`}
                       </button>
                     </div>
                   )}
                 </>
               )}
             </div>
           </div>

           {/* Message Stats */}
           <div className="text-center">
             <div className="inline-flex items-center gap-8 cyber-card px-8 py-4">
               <div className="text-center">
                 <div className="text-2xl font-bold text-cyber-cyan mb-2"
                     style={{ textShadow: '0 0 15px rgba(0, 240, 255, 0.5)' }}>
                   {publicMessages.length}
                 </div>
                 <div className="text-xs text-white/60 uppercase tracking-wider">
                   Total Messages
                 </div>
               </div>
               <div className="w-px h-8 bg-cyber-gray/30" />
               <div className="text-center">
                 <div className="text-2xl font-bold text-cyber-yellow"
                     style={{ textShadow: '0 0 15px rgba(252, 238, 10, 0.5)' }}>
                   24/7
                 </div>
                 <div className="text-xs text-white/60 uppercase tracking-wider">
                   Active Monitor
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
       </div>
     </section>
  )
}