import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageLayout from './components/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import LeetCode from './pages/LeetCode'
import Sorting from './pages/Sorting'
import Provinces from './pages/Provinces'
import SmallestMissingPositive from './pages/SmallestMissingPositive'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element with id="root" not found.')

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='leetcode' element={<LeetCode />} />
          <Route path='leetcode/sorting' element={<Sorting />} />
          <Route path='provinces' element={<Provinces />} />
          <Route path='smallest-missing-positive' element={<SmallestMissingPositive />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
