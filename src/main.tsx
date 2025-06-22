import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import './index.css'

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <Router />
  </BrowserRouter>
)
