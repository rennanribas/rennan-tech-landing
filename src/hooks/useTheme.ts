import { useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage on first render (SSR safe)
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system'
    }
    return 'system'
  })

  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return 'light'
  })

  // Apply theme to document with smooth transitions
  const applyTheme = useCallback((themeToApply: 'dark' | 'light') => {
    const root = document.documentElement

    // Add transition class for smooth theme switching (2025 UX trend)
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease'

    if (themeToApply === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Remove transition after change to avoid affecting other animations
    setTimeout(() => {
      root.style.transition = ''
    }, 300)
  }, [])

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light'
      setSystemTheme(newSystemTheme)

      // If user is using system theme, apply the new system preference
      if (theme === 'system') {
        applyTheme(newSystemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () =>
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [theme, applyTheme])

  // Apply theme on mount and theme changes
  useEffect(() => {
    const effectiveTheme = theme === 'system' ? systemTheme : theme
    applyTheme(effectiveTheme)
  }, [theme, systemTheme, applyTheme])

  const handleSetTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme)

    if (newTheme === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', newTheme)
    }
  }, [])

  // Get the current effective theme for UI state
  const effectiveTheme = theme === 'system' ? systemTheme : theme

  return {
    theme,
    effectiveTheme,
    systemTheme,
    setTheme: handleSetTheme,
  }
}
