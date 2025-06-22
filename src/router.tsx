import {
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom'
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
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'tech-stack', element: <TechStack /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]

export type RouterProps = { url?: string }

export function Router({ url }: RouterProps = {}) {
  const router =
    typeof window === 'undefined'
      ? createMemoryRouter(routes, { initialEntries: [url || '/'] })
      : createBrowserRouter(routes)
  return <RouterProvider router={router} />
}
