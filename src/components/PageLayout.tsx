import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function PageLayout() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />
      <main className='pt-24 pb-16'>
        <div className='max-w-6xl mx-auto px-6'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
