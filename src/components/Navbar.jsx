import React from 'react'
import { Activity } from 'lucide-react'

export default function Navbar({ activePage, onNavigate }) {
  const pages = ['Dashboard', 'Zones', 'Analytics', 'Signals']
  return (
    <nav style={{ background: 'var(--bg-surface)', borderBottom: '0.5px solid var(--border)', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: 32, height: 54, position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>
        <Activity size={16} color='var(--teal)' />
        <span>UrbanGrowth</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--teal)', background: 'var(--teal-dim)', padding: '2px 8px', borderRadius: 10 }}>Engine v1.0</span>
      </div>
      <div style={{ display: 'flex', gap: 2, flex: 1 }}>
        {pages.map(p => (
          <button key={p} onClick={() => onNavigate(p)} style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, padding: '6px 14px', borderRadius: 6,
            border: 'none', cursor: 'pointer', transition: 'all 0.15s',
            background: activePage === p ? 'var(--teal-dim)' : 'transparent',
            color: activePage === p ? 'var(--teal)' : 'var(--text-secondary)',
          }}>{p}</button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
        Live · NCR + Metro
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </nav>
  )
}
