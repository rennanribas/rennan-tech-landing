import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  currentPage?: string
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/tech-stack', label: 'Tech Stack', id: 'tech-stack' },
    { href: '/contact', label: 'Contact', id: 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-mocha-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-dusk-700 hover:text-dusk-600 transition-colors">
            Rennan Ribas
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-dusk-700 border-b-2 border-dusk-700'
                    : 'text-mocha-700 hover:text-dusk-600'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-mocha-700 hover:text-dusk-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-mocha-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-dusk-700'
                      : 'text-mocha-700 hover:text-dusk-600'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}