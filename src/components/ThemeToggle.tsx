import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, effectiveTheme, setTheme } = useTheme()

  const themes = [
    {
      value: 'light' as const,
      icon: Sun,
      label: 'Light mode',
      activeColor: 'bg-amber-500 text-white',
      hoverColor: 'hover:bg-amber-100 dark:hover:bg-amber-900/20',
    },
    {
      value: 'dark' as const,
      icon: Moon,
      label: 'Dark mode',
      activeColor: 'bg-indigo-600 text-white',
      hoverColor: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/20',
    },
    {
      value: 'system' as const,
      icon: Laptop,
      label: 'System preference',
      activeColor: 'bg-emerald-600 text-white',
      hoverColor: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/20',
    },
  ]

  return (
    <div className='relative'>
      {/* Modern segmented control design */}
      <div className='flex items-center bg-muted/50 backdrop-blur-sm rounded-xl p-1 border border-border/50 shadow-sm'>
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          const isActive = theme === themeOption.value
          const isEffectivelyActive =
            effectiveTheme === themeOption.value && theme === 'system'

          return (
            <button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`
                relative flex items-center justify-center p-2.5 rounded-lg 
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
                group
                ${
                  isActive
                    ? `${themeOption.activeColor} shadow-md transform scale-105 shadow-black/10`
                    : `${themeOption.hoverColor} text-muted-foreground`
                }
              `}
              title={themeOption.label}
              aria-label={themeOption.label}
              aria-pressed={isActive}
            >
              {/* Icon with smooth animations */}
              <Icon
                className={`
                  h-4 w-4 transition-all duration-300
                  ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                `}
              />

              {/* Active indicator dot */}
              {isActive && (
                <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full animate-pulse' />
              )}

              {/* System theme effective indicator */}
              {isEffectivelyActive && theme === 'system' && (
                <div className='absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse' />
              )}
            </button>
          )
        })}
      </div>

      {/* Current effective theme indicator */}
      <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground font-medium'>
        {theme === 'system' && (
          <span className='opacity-75'>Auto: {effectiveTheme}</span>
        )}
      </div>
    </div>
  )
}
