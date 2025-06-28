import { Sun, Moon, Laptop } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, effectiveTheme, setTheme } = useTheme()

  const themes = [
    {
      value: 'light' as const,
      icon: Sun,
      label: 'Light mode',
    },
    {
      value: 'dark' as const,
      icon: Moon,
      label: 'Dark mode',
    },
    {
      value: 'system' as const,
      icon: Laptop,
      label: 'System preference',
    },
  ]

  return (
    <div className='relative flex items-center bg-muted/20 rounded-2xl p-1 border border-border/20 backdrop-blur-sm'>
      {themes.map((themeOption) => {
        const Icon = themeOption.icon
        const isActive = theme === themeOption.value

        return (
          <motion.button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`
              relative flex items-center justify-center p-3 rounded-xl z-10
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background
              ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }
            `}
            title={themeOption.label}
            aria-label={themeOption.label}
            aria-pressed={isActive}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={themeOption.value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className='h-4 w-4' />
              </motion.div>
            </AnimatePresence>
            
            {isActive && (
              <motion.div
                className='absolute inset-0 bg-primary/10 rounded-xl border border-primary/20'
                layoutId='activeTheme'
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
