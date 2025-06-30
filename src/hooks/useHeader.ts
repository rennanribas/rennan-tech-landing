export interface HeaderItem {
  to: string
  label: string
}

export const useHeader = (): { navItems: HeaderItem[] } => {
  const navItems: HeaderItem[] = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/tech-stack', label: 'Tech Stack' },
    { to: '/contact', label: 'Contact' },
  ]

  return { navItems }
}