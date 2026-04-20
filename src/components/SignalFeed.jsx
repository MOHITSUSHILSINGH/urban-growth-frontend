import React from 'react'

const typeStyle = {
  Infra:   { bg: 'rgba(29,158,117,0.18)',  color: '#5DCAA5' },
  Market:  { bg: 'rgba(55,138,221,0.18)',  color: '#378ADD' },
  Policy:  { bg: 'rgba(239,159,39,0.18)',  color: '#EF9F27' },
  Price:   { bg: 'rgba(216,90,48,0.18)',   color: '#D85A30' },
}
const iconBg = {
  Infra: 'rgba(29,158,117,0.14)', Market: 'rgba(55,138,221,0.14)',
  Policy: 'rgba(239,159,39,0.14)', Price: 'rgba(216,90,48,0.14)',
}

const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

export default function SignalFeed({ signals, filter, onFilterChange }) {
  if (!signals) return null
  const types = ['All', 'Infra', 'Market', 'Policy', 'Price']
  const filtered = filter && filter !== 'All' ? signals.filter(s => s.signal_type === filter) : signals

  return (
    <div style={panel}>
      <div style={panelHead}>
        <span style={panelTitle}>Live signal feed</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => onFilterChange(t)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
                borderRadius: 20, border: '0.5px solid',
                borderColor: filter === t ? 'var(--teal)' : 'var(--border)',
                background: filter === t ? 'var(--teal-dim)' : 'transparent',
                color: filter === t ? 'var(--teal)' : 'var(--text-tertiary)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '0.25rem 0', maxHeight: 340, overflowY: 'auto' }}>
        {filtered.map((s, i) => {
          const ts = typeStyle[s.signal_type] || typeStyle.Infra
          const ib = iconBg[s.signal_type] || iconBg.Infra
          return (
            <div key={s.id} style={{ display: 'flex', gap: 10, padding: '0.65rem 1rem', borderBottom: i < filtered.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: ib, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>{s.title}</span>
                  <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 10, fontFamily: 'var(--font-mono)', background: ts.bg, color: ts.color, flexShrink: 0 }}>{s.signal_type}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>
                  {s.source} · {s.time_ago}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
