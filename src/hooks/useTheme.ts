import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    document.documentElement.classList.toggle('dark', isDark)

    const storedTheme = (localStorage.getItem('theme') as Theme) || 'system'
    setTheme(storedTheme)
  }, [])

  const handleSetTheme = (newTheme: Theme) => {
    if (newTheme === 'system') {
      localStorage.removeItem('theme')
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', isDark)
    } else {
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
    setTheme(newTheme)
  }

  return { theme, setTheme: handleSetTheme }
}
