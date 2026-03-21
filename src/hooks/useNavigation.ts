export interface NavigationItem {
  to: string
  label: string
}

export const useNavigation = (): { navItems: NavigationItem[] } => {
  const navItems: NavigationItem[] = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return { navItems }
}