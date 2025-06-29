import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigation } from '../hooks/useNavigation'
import { ThemeToggle } from './ThemeToggle'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { navItems } = useNavigation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClassName = ({ isActive }: { isActive: boolean }): string =>
    `relative font-semibold transition-all duration-300 px-4 py-3 rounded-xl group ${
      isActive ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
    }`

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    `relative font-medium transition-all duration-300 py-3 px-4 rounded-xl ${
      isActive
        ? 'text-primary bg-primary/5'
        : 'text-foreground/80 hover:text-foreground hover:bg-muted/30'
    }`

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-xl'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 lg:h-20'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to='/'
              className='text-xl lg:text-2xl font-bold text-foreground hover:text-primary transition-all duration-300 tracking-tight'
            >
              Rennan Ribas
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-8'>
            <div className='flex items-center space-x-1'>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <NavLink to={item.to} className={linkClassName}>
                    {({ isActive }) => (
                      <>
                        <span className='relative z-10'>{item.label}</span>
                        {isActive && (
                          <motion.div
                            className='absolute inset-0 bg-primary/10 rounded-xl'
                            layoutId='activeTab'
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                        <div className='absolute inset-0 bg-muted/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <motion.div
              className='ml-8 pl-8 border-l border-border/20'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden p-3 text-foreground/60 hover:text-foreground transition-all duration-300 rounded-xl hover:bg-muted/30'
            aria-label='Toggle menu'
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence mode='wait'>
              {isMenuOpen ? (
                <motion.div
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key='menu'
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className='lg:hidden'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className='px-4 py-6 border-t border-border/20 bg-background/50 backdrop-blur-xl'>
                <div className='flex flex-col space-y-2'>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={mobileLinkClassName}
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div
                    className='pt-6 mt-4 border-t border-border/20'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 + 0.2 }}
                  >
                    <ThemeToggle />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
