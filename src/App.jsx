import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ZonesPage from './pages/ZonesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SignalsPage from './pages/SignalsPage'

export default function App() {
  const [page, setPage] = useState('Dashboard')

  const pages = { Dashboard, Zones: ZonesPage, Analytics: AnalyticsPage, Signals: SignalsPage }
  const ActivePage = pages[page] || Dashboard

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar activePage={page} onNavigate={setPage} />
      <main>
        <ActivePage />
      </main>
    </div>
  )
}
