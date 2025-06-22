import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import TechStack from './pages/TechStack.tsx'
import Home from './pages/Home.tsx'
import PageLayout from './components/PageLayout'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PageLayout />,
        children: [
          { path: 'about', element: <About /> },
          { path: 'tech-stack', element: <TechStack /> },
          { path: 'contact', element: <Contact /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
