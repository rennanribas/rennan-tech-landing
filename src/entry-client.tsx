import { hydrateRoot, createRoot } from 'react-dom/client'
import { Router } from './router'
import './index.css'

function startApp(): void {
  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error('Root element with id="root" not found.')
  const hasSSRContent = rootElement.firstElementChild !== null
  if (hasSSRContent) {
    hydrateRoot(rootElement, <Router />)
  } else {
    createRoot(rootElement).render(<Router />)
  }
}
startApp()
