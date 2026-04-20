import React, { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { fetchZones } from '../services/api'
import ZoneModal from '../components/ZoneModal'
import { Search, Filter } from 'lucide-react'

function gvsColor(v) {
  if (v >= 85) return '#1D9E75'
  if (v >= 70) return '#5DCAA5'
  if (v >= 55) return '#EF9F27'
  return '#D85A30'
}

const wrap = { maxWidth: 1400, margin: '0 auto', padding: '1.5rem 2rem' }

export default function ZonesPage() {
  const { data: zones, loading } = useApi(fetchZones)
  const [search, setSearch] = useState('')
  const [minGvs, setMinGvs] = useState(0)
  const [undervalued, setUndervalued] = useState(false)
  const [selected, setSelected] = useState(null)

  const filtered = (zones || []).filter(z => {
    if (search && !z.name.toLowerCase().includes(search.toLowerCase()) && !z.city.toLowerCase().includes(search.toLowerCase())) return false
    if (z.gvs < minGvs) return false
    if (undervalued && !z.undervalued) return false
    return true
  })

  return (
    <div style={wrap}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search zones or cities…"
            style={{ width: '100%', padding: '8px 12px 8px 32px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>Min GVS</span>
          <input type="range" min="0" max="90" step="5" value={minGvs} onChange={e => setMinGvs(+e.target.value)} style={{ width: 80 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal)', width: 24 }}>{minGvs}</span>
        </div>
        <button onClick={() => setUndervalued(u => !u)} style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
          border: '0.5px solid', borderColor: undervalued ? 'var(--amber)' : 'var(--border)',
          background: undervalued ? 'var(--amber-dim)' : 'transparent', color: undervalued ? 'var(--amber)' : 'var(--text-secondary)'
        }}>
          <Filter size={11} style={{ marginRight: 5, verticalAlign: 'middle' }} />Undervalued only
        </button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>{filtered.length} zones</span>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '4rem 0' }}>Loading zones…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {filtered.map(z => (
            <div key={z.id} onClick={() => setSelected(z)} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.2rem', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--bg-card-hover)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{z.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{z.city} · {z.state}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: gvsColor(z.gvs), lineHeight: 1 }}>{z.gvs}</div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>GVS</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, borderTop: '0.5px solid var(--border)', paddingTop: 10 }}>
                {[
                  { l: '₹/sqft', v: `₹${z.price_per_sqft.toLocaleString()}` },
                  { l: 'Yield', v: `${z.rental_yield}%` },
                  { l: 'YoY', v: `+${z.appreciation_yoy}%` },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: 2 }}>{s.l}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s.v}</div>
                  </div>
                ))}
              </div>
              {z.undervalued && (
                <div style={{ marginTop: 10, fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', background: 'var(--amber-dim)', color: 'var(--amber)', borderRadius: 10, display: 'inline-block' }}>
                  Undervalued opportunity
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {selected && <ZoneModal zone={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
