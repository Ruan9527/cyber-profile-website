import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsSectionNew from './components/SkillsSectionNew'
import ProjectsSectionNew from './components/ProjectsSectionNew'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ChatBot from './components/ChatBot'

export default function Home() {
  return (
    <main className="min-h-screen">
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