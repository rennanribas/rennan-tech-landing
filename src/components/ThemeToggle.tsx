import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex items-center space-x-2'>
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md ${
          theme === 'light'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary/80'
        }`}
      >
        <Sun className='h-5 w-5' />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md ${
          theme === 'dark'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary/80'
        }`}
      >
        <Moon className='h-5 w-5' />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md ${
          theme === 'system'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary/80'
        }`}
      >
        <Laptop className='h-5 w-5' />
      </button>
    </div>
  )
}
