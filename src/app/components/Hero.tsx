'use client'

import { useState } from 'react'
import { Github, Linkedin, Twitter, Mail, Download } from 'lucide-react'
import { PersonalInfo } from '@/types'

const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Full Stack Developer",
  bio: "Passionate about creating amazing web experiences with cyberpunk aesthetics and cutting-edge technology.",
  avatar: "/placeholder-avatar.jpg",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourusername"
}

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-gray/10 to-cyber-black">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative inline-block group">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-40 h-40 rounded-full border-4 border-cyber-cyan shadow-2xl shadow-cyber-cyan/50 transition-transform duration-300 group-hover:scale-110"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {isHovered && (
              <>
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="absolute inset-0 w-40 h-40 rounded-full border-4 border-cyber-red opacity-50 animate-glitch-img-1"
                />
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="absolute inset-0 w-40 h-40 rounded-full border-4 border-cyber-yellow opacity-50 animate-glitch-img-2"
                />
              </>
            )}
          </div>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-6 glitch-effect" data-text={personalInfo.name}>
          <span className="text-cyber-cyan">{personalInfo.name}</span>
        </h1>

        <h2 className="font-display text-2xl md:text-3xl text-cyber-yellow mb-6 font-bold">
          {personalInfo.title}
        </h2>

        <p className="text-lg md:text-xl text-cyber-gray mb-12 max-w-3xl mx-auto leading-relaxed">
          {personalInfo.bio}
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button flex items-center gap-2 group"
          >
            <Github className="w-5 h-5 group-hover:animate-pulse" />
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button flex items-center gap-2 group"
          >
            <Linkedin className="w-5 h-5 group-hover:animate-pulse" />
            LinkedIn
          </a>
          <a
            href={personalInfo.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button flex items-center gap-2 group"
          >
            <Twitter className="w-5 h-5 group-hover:animate-pulse" />
            Twitter
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="cyber-button flex items-center gap-2 group"
          >
            <Mail className="w-5 h-5 group-hover:animate-pulse" />
            Contact
          </a>
        </div>

        {/* Download Resume Button */}
        <button className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow flex items-center gap-3 mx-auto text-lg">
          <Download className="w-6 h-6" />
          Download Resume
        </button>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-cyber-yellow rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-cyber-red rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-cyber-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    </section>
  )
}