import { hydrateRoot, createRoot } from 'react-dom/client'
import { Router } from './router'
import './index.css'

function startApp(): void {
  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error('Root element with id="root" not found.')
  try {
    hydrateRoot(rootElement, <Router />)
  } catch {
    createRoot(rootElement).render(<Router />)
  }
}
startApp()
