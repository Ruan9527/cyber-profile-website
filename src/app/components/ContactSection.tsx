'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, Twitter, QrCode, Phone, MapPin, Download, ExternalLink } from 'lucide-react'

export default function ContactSection() {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'your.email@example.com',
      link: 'mailto:your.email@example.com',
      color: 'cyber-cyan',
      description: 'Drop me a line'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'yourusername',
      link: 'https://github.com/yourusername',
      color: 'cyber-gray',
      description: 'Check my code'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile',
      color: 'cyber-blue',
      description: 'Professional network'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@yourusername',
      link: 'https://twitter.com/yourusername',
      color: 'cyber-yellow',
      description: 'Follow my thoughts'
    }
  ]

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
    <section className="py-20 px-4 relative bg-gradient-to-b from-cyber-black to-cyber-gray/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 glitch-effect" data-text="CONNECT">
          <span className="text-cyber-cyan">CONNECT</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="cyber-card">
              <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6" />
                Get In Touch
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
                        hoveredContact === contact.label ? 'border-cyber-cyan/60' : ''
                      }`}
                      onMouseEnter={() => setHoveredContact(contact.label)}
                      onMouseLeave={() => setHoveredContact(null)}
                    >
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyber-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`p-3 bg-${contact.color}/10 border-2 border-${contact.color}/30 rounded-lg group-hover:scale-110 transition-transform group-hover:rotate-12`}>
                          <Icon className={`w-5 h-5 text-${contact.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-cyber-gray uppercase tracking-wider mb-1">
                            {contact.label}
                          </div>
                          <div className="text-cyber-cyan font-bold group-hover:text-cyber-yellow transition-colors">
                            {contact.value}
                          </div>
                          <div className="text-xs text-cyber-gray mt-1">
                            {contact.description}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-cyber-gray group-hover:text-cyber-cyan transition-colors" />
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
                  <h3 className="font-display text-xl font-bold text-cyber-yellow mb-2">
                    Download Resume
                  </h3>
                  <p className="text-cyber-gray">
                    Get my complete resume in PDF format with detailed work experience and skills.
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
              <h3 className="font-display text-xl font-bold text-cyber-yellow mb-4 flex items-center justify-center gap-3">
                <QrCode className="w-6 h-6" />
                WeChat
              </h3>
              
              <div className="relative inline-block group mb-4">
                <div className="w-32 h-32 bg-cyber-black border-4 border-cyber-cyan rounded-lg p-2 group-hover:border-cyber-yellow transition-colors">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-yellow/20 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-cyber-cyan" />
                  </div>
                </div>
                {/* Glitch effect on hover */}
                <div className="absolute inset-0 w-32 h-32 bg-cyber-red/20 border-4 border-cyber-red rounded-lg p-2 opacity-0 group-hover:opacity-50 animate-glitch-img-1 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-br from-cyber-red/20 to-cyber-yellow/20 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-cyber-red" />
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-cyber-gray mb-2">
                Scan to connect on WeChat
              </p>
              <div className="text-xs text-cyber-yellow font-mono-tech uppercase tracking-wider">
                @cyberdev
              </div>
            </div>

            {/* Locations */}
            <div className="cyber-card">
              <h3 className="font-display text-xl font-bold text-cyber-yellow mb-4 flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Location
              </h3>
              
              <div className="space-y-3">
                {locations.map((location, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyber-cyan mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-cyber-cyan font-bold">
                        {location.city}
                      </div>
                      <div className="text-sm text-cyber-gray">
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
                <div className="flex items-center gap-2 text-sm text-cyber-yellow">
                  <Phone className="w-4 h-4" />
                  Available for remote work
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 cyber-card">
          <h3 className="font-display text-2xl font-bold text-cyber-yellow mb-6 text-center">
            Send a Direct Message
          </h3>
          
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cyber-gray text-sm font-bold mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  className="cyber-input"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-cyber-gray text-sm font-bold mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  className="cyber-input"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-cyber-gray text-sm font-bold mb-2 uppercase tracking-wider">
                Subject
              </label>
              <input
                type="text"
                className="cyber-input"
                placeholder="Project inquiry, collaboration, etc."
              />
            </div>
            
            <div>
              <label className="block text-cyber-gray text-sm font-bold mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                rows={6}
                className="cyber-input resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </div>
            
            <div className="text-center">
              <button className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow px-8">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}