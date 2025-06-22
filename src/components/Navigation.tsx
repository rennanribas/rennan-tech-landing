import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useNavigation } from '../hooks/useNavigation'
import { ThemeToggle } from './ThemeToggle'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { navItems } = useNavigation()

  const linkClassName = ({ isActive }: { isActive: boolean }): string =>
    `font-medium transition-colors ${
      isActive
        ? 'text-primary border-b-2 border-primary'
        : 'text-foreground/60 hover:text-foreground'
    }`

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    `font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-foreground/80 hover:text-foreground'
    }`

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border'>
      <div className='max-w-6xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <NavLink
            to='/'
            className='text-xl font-bold text-primary hover:text-primary/80 transition-colors'
          >
            Rennan Ribas
          </NavLink>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <div className='flex items-center space-x-6'>
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClassName}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 text-foreground/60 hover:text-foreground transition-colors'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 pb-4 border-t border-border'>
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
              <div className='pt-4 border-t border-border/50'>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
