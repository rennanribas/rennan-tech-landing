import {
  createBrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import PageLayout from './components/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import TechStack from './pages/TechStack'
import Contact from './pages/Contact'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'tech-stack',
        element: <TechStack />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]

export function Router({ url }: { url?: string } = {}) {
  if (typeof window === 'undefined') {
    const router = createMemoryRouter(routes, {
      initialEntries: [url || '/'],
    })
    return <RouterProvider router={router} />
  }

  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}
