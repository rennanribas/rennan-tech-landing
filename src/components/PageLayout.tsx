import { Outlet } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Navigation from './Navigation'

/**
 * Root Layout Component - Single Source of Truth
 *
 * Responsibilities:
 * - Theme management (global app state)
 * - Navigation structure
 * - Page layout and spacing
 * - Global app wrapper
 */
export default function PageLayout() {
  // Initialize theme system at the app level
  useTheme()

  return (
    <div className='min-h-screen bg-background'>
      {/* Global Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <main className='pt-24 pb-16'>
        <div className='max-w-6xl mx-auto px-6'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
