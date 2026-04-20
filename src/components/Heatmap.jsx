import React, { useState } from 'react'

function gvsColor(v) {
  if (v >= 85) return { bg: '#085041', fg: '#9FE1CB' }
  if (v >= 70) return { bg: '#0F6E56', fg: '#E1F5EE' }
  if (v >= 55) return { bg: '#1D9E75', fg: '#fff' }
  if (v >= 42) return { bg: '#FAC775', fg: '#412402' }
  return { bg: '#EF9F27', fg: '#4A1B0C' }
}

const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

export default function Heatmap({ data, onCellClick }) {
  const [hovered, setHovered] = useState(null)

  if (!data) return null
  const { zones, horizons, cells } = data

  const cellMap = {}
  cells.forEach(c => { cellMap[`${c.zone}__${c.horizon}`] = c })

  return (
    <div style={panel}>
      <div style={panelHead}>
        <span style={panelTitle}>Growth velocity heatmap — 24–60 month horizon</span>
        {hovered && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal)' }}>
            {hovered.zone} · {hovered.horizon} · GVS {hovered.gvs} · {hovered.driver}
          </span>
        )}
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `140px repeat(${horizons.length}, 1fr)`, gap: 3 }}>
          <div />
          {horizons.map(h => (
            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', textAlign: 'center', padding: '4px 0' }}>{h}</div>
          ))}
          {zones.map(zone => (
            <React.Fragment key={zone}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', paddingRight: 8 }}>
                {zone.split('–')[0]}
              </div>
              {horizons.map(h => {
                const cell = cellMap[`${zone}__${h}`]
                if (!cell) return <div key={h} />
                const { bg, fg } = gvsColor(cell.gvs)
                return (
                  <div
                    key={h}
                    onClick={() => onCellClick && onCellClick(cell)}
                    onMouseEnter={() => setHovered(cell)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      height: 38, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: bg, color: fg, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                      cursor: 'pointer', transition: 'transform 0.15s, opacity 0.15s',
                      opacity: hovered && hovered !== cell ? 0.7 : 1,
                      transform: hovered === cell ? 'scale(1.07)' : 'scale(1)',
                    }}
                  >
                    {cell.gvs}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          <span>Low</span>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'linear-gradient(to right, #EF9F27, #1D9E75, #085041)' }} />
          <span>High</span>
        </div>
      </div>
    </div>
  )
}
