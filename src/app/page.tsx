import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsSectionNew from './components/SkillsSectionNew'
import ProjectsSectionNew from './components/ProjectsSectionNew'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ChatBot from './components/ChatBot'
import MouseEffects from './components/MouseEffects'
import MouseParallaxBackground from './components/MouseParallaxBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <MouseParallaxBackground />
      <MouseEffects />
      <Navbar />
      <Hero />
      <SkillsSectionNew />
      <ProjectsSectionNew />
      <Footer />
      <BackToTop />
      <ChatBot />
    </main>
  )
}