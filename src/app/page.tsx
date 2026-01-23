import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  )
}