import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import TechStack from './pages/TechStack'
import Contact from './pages/Contact'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='tech-stack' element={<TechStack />} />
        <Route path='contact' element={<Contact />} />
      </Route>
    </Routes>
  )
}
