import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useNavigation } from '../hooks/useNavigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { navItems } = useNavigation()

  const linkClassName = ({ isActive }: { isActive: boolean }): string =>
    `font-medium transition-colors ${isActive ? 'text-dusk-700 border-b-2 border-dusk-700' : 'text-mocha-700 hover:text-dusk-600'}`

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    `font-medium transition-colors ${isActive ? 'text-dusk-700' : 'text-mocha-700 hover:text-dusk-600'}`

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-mocha-200'>
      <div className='max-w-6xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <NavLink
            to='/'
            className='text-xl font-bold text-dusk-700 hover:text-dusk-600 transition-colors'
          >
            Rennan Ribas
          </NavLink>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClassName}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 text-mocha-700 hover:text-dusk-600 transition-colors'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 pb-4 border-t border-mocha-200'>
            <div className='flex flex-col space-y-4 pt-4'>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileLinkClassName}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
