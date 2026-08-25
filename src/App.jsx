import Header from './components/layout/Header'
import SiteBackground from './components/layout/SiteBackground'
import About from './components/sections/About'
import Certificates from './components/sections/Certificates'
import Contact from './components/sections/Contact'
import Education from './components/sections/Education'
import Footer from './components/sections/Footer'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import { useSectionNavigation } from './hooks/useSectionNavigation'
import { useTheme } from './hooks/useTheme'

function App() {
  const navigateToSection = useSectionNavigation()
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      data-theme={theme}
      className="relative min-h-screen w-full overflow-x-clip bg-[#120f17] text-white transition-colors duration-500"
    >
      <SiteBackground theme={theme} />

      <div className="relative z-10">
        <Header theme={theme} onToggleTheme={toggleTheme} onNavigate={navigateToSection} />

        <main>
          <Hero onNavigate={navigateToSection} />
          <About />
          <Education />
          <Skills />
          <Certificates />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App
