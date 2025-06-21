import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './pages/About'
import TechStack from './pages/TechStack'
import Contact from './pages/Contact'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/about') setCurrentPage('about')
    else if (path === '/tech-stack') setCurrentPage('tech-stack')
    else if (path === '/contact') setCurrentPage('contact')
    else setCurrentPage('home')
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />
      case 'tech-stack':
        return <TechStack />
      case 'contact':
        return <Contact />
      default:
        return (
          <div className="min-h-screen">
            <Navigation currentPage="home" />
            <Hero />
          </div>
        )
    }
  }

  return renderPage()
}
