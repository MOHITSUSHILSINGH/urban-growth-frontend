import React from 'react'

const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

function corrColor(v) {
  if (v >= 0.8) return { bg: 'rgba(29,158,117,0.7)', color: '#fff' }
  if (v >= 0.6) return { bg: 'rgba(29,158,117,0.35)', color: '#5DCAA5' }
  if (v >= 0.4) return { bg: 'rgba(239,159,39,0.25)', color: '#EF9F27' }
  return { bg: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)' }
}

const SHORT = ['Muni.', 'Listing', 'Price', 'Rental', 'Zoning']

export default function CorrelationMatrix({ data }) {
  if (!data) return null
  return (
    <div style={panel}>
      <div style={panelHead}><span style={panelTitle}>Indicator correlation matrix</span></div>
      <div style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 3, tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: 60 }} />
              {SHORT.map(h => <th key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-tertiary)', fontWeight: 400, textAlign: 'center', padding: '2px 0' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.matrix.map((row, ri) => (
              <tr key={ri}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-tertiary)', paddingRight: 6, textAlign: 'right' }}>{SHORT[ri]}</td>
                {row.map((v, ci) => {
                  const { bg, color } = corrColor(v)
                  return (
                    <td key={ci} style={{ textAlign: 'center', padding: 0 }}>
                      <div style={{ height: 32, borderRadius: 4, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color, fontWeight: ri === ci ? 600 : 400 }}>
                        {v.toFixed(2)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 8, fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          Pearson r — 47 micro-markets · 2022–2026
        </div>
      </div>
    </div>
  )
}
