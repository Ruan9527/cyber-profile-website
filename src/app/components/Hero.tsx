'use client'

import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, Download } from 'lucide-react'
import { PersonalInfo } from '@/types'

const personalInfo: PersonalInfo = {
  name: "圆周率的达",
  title: "Bunny Developer",
  bio: "Passionate about creating amazing web experiences with cyberpunk aesthetics and cutting-edge technology.",
  avatar: "/avatar.jpg",
  email: "ruanlong9527@gmail.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourusername"
}

export default function Hero() {


  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background grid effect with enhanced gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-black via-cyber-gray/20 to-cyber-black">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        {/* Enhanced background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-yellow/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative inline-block group">
            <Image
              src={personalInfo.avatar}
              alt={personalInfo.name}
              width={240}
              height={240}
              className="w-60 h-60 rounded-full border-6 border-cyber-cyan transition-transform duration-300 group-hover:scale-105"
              style={{
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.6), 0 0 80px rgba(0, 240, 255, 0.3), 0 0 120px rgba(0, 240, 255, 0.15)'
              }}
            />
            {/* Avatar glow ring */}
            <div className="absolute inset-0 -m-4 rounded-full border-2 border-cyber-yellow/50 animate-pulse" />
          </div>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-black mb-6 glitch-effect" data-text={personalInfo.name}
            style={{
              textShadow: '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)'
            }}>
          <span className="text-cyber-cyan">{personalInfo.name}</span>
        </h1>

        <h2 className="font-display text-2xl md:text-3xl text-cyber-yellow mb-6 font-bold"
            style={{
              textShadow: '0 0 15px rgba(252, 238, 10, 0.5)'
            }}>
          {personalInfo.title}
        </h2>

        <p className="text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed"
           style={{
             textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
           }}>
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
        <button className="cyber-button bg-cyber-red border-cyber-red hover:bg-cyber-yellow hover:border-cyber-yellow flex items-center gap-3 mx-auto text-lg px-8">
          <Download className="w-6 h-6" />
          Download Resume
        </button>
      </div>

      {/* Enhanced animated background elements with glow */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"
           style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.4)' }} />
      <div className="absolute top-40 right-20 w-3 h-3 bg-cyber-yellow rounded-full animate-pulse"
           style={{ animationDelay: '1s', boxShadow: '0 0 12px rgba(252, 238, 10, 0.8), 0 0 24px rgba(252, 238, 10, 0.4)' }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-cyber-red rounded-full animate-pulse"
           style={{ animationDelay: '2s', boxShadow: '0 0 10px rgba(255, 0, 60, 0.8), 0 0 20px rgba(255, 0, 60, 0.4)' }} />
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-cyber-cyan rounded-full animate-pulse"
           style={{ animationDelay: '0.5s', boxShadow: '0 0 15px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.4)' }} />
    </section>
  )
}