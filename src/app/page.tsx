import Hero from './components/Hero'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import StatsSection from './components/StatsSection'
import MessageBoard from './components/MessageBoard'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SkillsSection />
      <ProjectsSection />
      <StatsSection />
      <MessageBoard />
      <ContactSection />
    </main>
  )
}