'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, Twitter, QrCode, Phone, MapPin, Download, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactSection() {
  const { t } = useLanguage()
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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

  const handlePrivateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Send email using mailto or a service
      const mailtoLink = `mailto:ruanlong9527@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
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
    <section className="py-20 px-4 relative bg-gradient-to-b from-cyber-black via-cyber-gray/10 to-cyber-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}>
          <span className="text-cyber-cyan">{t('contact.title')}</span>
        </h2>

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
                <div className="w-40 h-40 bg-cyber-black border-4 border-cyber-cyan rounded-lg p-2 group-hover:border-cyber-yellow transition-all duration-300 group-hover:scale-105"
                     style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.2)' }}>
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-yellow/20 flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-cyber-cyan" />
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
                <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                  {t('message_board.name')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="cyber-input"
                  placeholder={t('message_board.placeholder_name')}
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                  {t('message_board.email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="cyber-input"
                  placeholder={t('message_board.placeholder_email')}
                />
              </div>
            </div>

            <div>
                <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                  {t('contact.subject')}
                </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="cyber-input"
                placeholder={t('contact.placeholder_subject')}
              />
            </div>

            <div>
                <label className="block text-white/70 text-sm font-bold mb-2 uppercase tracking-wider">
                  {t('message_board.message')}
                </label>
              <textarea
                rows={6}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="cyber-input resize-none"
                placeholder={t('contact.placeholder_message')}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('message_board.sending') : t('contact.send_message')}
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
      </div>
    </section>
  )
}