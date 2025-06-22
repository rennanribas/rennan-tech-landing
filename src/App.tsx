import { Outlet } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'

export default function App() {
  useTheme()

  return <Outlet />
}
