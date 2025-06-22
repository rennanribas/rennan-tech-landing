import { hydrateRoot } from 'react-dom/client'
import { Router } from './router'
import './index.css'

/**
 * Client-side hydration
 * Hydrates the server-rendered HTML with React interactivity
 */
function startApp(): void {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    throw new Error(
      'Root element not found. Make sure there is an element with id="root" in your HTML.'
    )
  }

  try {
    // Hydrate the SSR-rendered content
    hydrateRoot(rootElement, <Router />)
  } catch (error) {
    console.error('Hydration error:', error)
    // Fallback to client-side rendering if hydration fails
    import('react-dom/client').then(({ createRoot }) => {
      createRoot(rootElement).render(<Router />)
    })
  }
}

// Start the application
startApp()
