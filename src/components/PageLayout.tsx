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
    <div className='min-h-screen bg-background bg-noise relative overflow-x-hidden'>
      {/* Background gradient overlay */}
      <div className='fixed inset-0 bg-gradient-hero pointer-events-none' />

      {/* Global Navigation */}
      <Navigation />

      {/* Main Content Area */}
      <main className='relative z-10 pt-16 lg:pt-20'>
        <div className='container-responsive'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
