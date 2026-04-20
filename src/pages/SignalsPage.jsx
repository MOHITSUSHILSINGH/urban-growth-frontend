import React, { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { fetchSignals } from '../services/api'
import SignalFeed from '../components/SignalFeed'

const wrap = { maxWidth: 1400, margin: '0 auto', padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }

const typeStyle = {
  Infra:  { bg: 'rgba(29,158,117,0.18)', color: '#5DCAA5' },
  Market: { bg: 'rgba(55,138,221,0.18)', color: '#378ADD' },
  Policy: { bg: 'rgba(239,159,39,0.18)', color: '#EF9F27' },
  Price:  { bg: 'rgba(216,90,48,0.18)',  color: '#D85A30' },
}

export default function SignalsPage() {
  const { data: signals } = useApi(fetchSignals)
  const [filter, setFilter] = useState('All')

  const counts = (signals || []).reduce((acc, s) => { acc[s.signal_type] = (acc[s.signal_type] || 0) + 1; return acc }, {})

  return (
    <div style={wrap}>
      <div>
        <div style={{ marginBottom: 16, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {Object.entries(counts).map(([type, count]) => {
            const ts = typeStyle[type] || { bg: 'var(--bg-card)', color: 'var(--text-primary)' }
            return (
              <div key={type} style={{ background: ts.bg, border: `0.5px solid ${ts.color}30`, borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', cursor: 'pointer' }} onClick={() => setFilter(type)}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: ts.color, textTransform: 'uppercase', marginBottom: 4 }}>{type}</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: ts.color }}>{count}</div>
                <div style={{ fontSize: 11, color: ts.color, opacity: 0.7 }}>signals</div>
              </div>
            )
          })}
        </div>
        <SignalFeed signals={signals} filter={filter} onFilterChange={setFilter} />
      </div>

      {/* Sources legend */}
      <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Signal sources</div>
        {[
          { name: 'Municipal Corp Portals', icon: '🏛', desc: 'Tenders, CLU, public works' },
          { name: '99acres / MagicBricks', icon: '🏘', desc: 'Listing density & pricing' },
          { name: 'DDA / RERA Gazette', icon: '📋', desc: 'Regulatory approvals' },
          { name: 'Rental Aggregator', icon: '📊', desc: 'Absorption & yield data' },
        ].map((s, i, arr) => (
          <div key={s.name} style={{ display: 'flex', gap: 10, paddingBottom: 12, marginBottom: 12, borderBottom: i < arr.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
