import React from 'react'

const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

function gvsColor(v) {
  if (v >= 85) return '#1D9E75'
  if (v >= 70) return '#5DCAA5'
  if (v >= 55) return '#EF9F27'
  return '#D85A30'
}

export default function TopZones({ zones, onSelect, selectedId }) {
  if (!zones) return null
  const top = zones.slice(0, 7)

  return (
    <div style={panel}>
      <div style={panelHead}><span style={panelTitle}>Top ranked zones</span></div>
      <div style={{ padding: '0.5rem 0' }}>
        {top.map((z, i) => {
          const color = gvsColor(z.gvs)
          const isSelected = selectedId === z.id
          return (
            <div
              key={z.id}
              onClick={() => onSelect(z)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 1rem',
                cursor: 'pointer', borderBottom: i < top.length - 1 ? '0.5px solid var(--border)' : 'none',
                background: isSelected ? 'var(--teal-dim)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => !isSelected && (e.currentTarget.style.background = 'var(--bg-card-hover)')}
              onMouseLeave={e => !isSelected && (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', width: 20 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{z.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{z.city} · {z.tags}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color }}>{z.gvs}</div>
                <div style={{ height: 3, width: 48, borderRadius: 2, background: 'var(--border-strong)', marginTop: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${z.gvs}%`, background: color, borderRadius: 2 }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
