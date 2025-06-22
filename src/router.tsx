import { createBrowserRouter } from 'react-router-dom'
import PageLayout from './components/PageLayout'

import Home from './pages/Home'
import About from './pages/About'
import TechStack from './pages/TechStack'
import Contact from './pages/Contact'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'tech-stack', element: <TechStack /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])
