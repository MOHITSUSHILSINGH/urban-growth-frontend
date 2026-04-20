import React, { useEffect, useState } from 'react'
import { X, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { fetchZoneAnalysis } from '../services/api'

function riskColor(level) {
  if (level === 'Low') return 'var(--teal)'
  if (level === 'Medium') return 'var(--amber)'
  return 'var(--coral)'
}

export default function ZoneModal({ zone, onClose }) {
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    if (!zone) return
    fetchZoneAnalysis(zone.id).then(setAnalysis).catch(() => {})
  }, [zone])

  if (!zone) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div
        style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border-strong)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 620, maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{zone.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{zone.city} · {zone.state} · {zone.tags}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}><X size={18} /></button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, borderBottom: '0.5px solid var(--border)' }}>
          {[
            { label: 'GVS Score', val: zone.gvs, color: 'var(--teal)' },
            { label: 'Price / sqft', val: `₹${zone.price_per_sqft.toLocaleString()}`, color: 'var(--text-primary)' },
            { label: 'Rental Yield', val: `${zone.rental_yield}%`, color: 'var(--blue)' },
            { label: 'Apprcn YoY', val: `${zone.appreciation_yoy}%`, color: 'var(--amber)' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '0.9rem 1rem', background: 'var(--bg-card)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 5 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.5rem' }}>
          {analysis ? (
            <>
              {/* Recommendation */}
              <div style={{ background: 'var(--teal-dim)', border: '0.5px solid rgba(29,158,117,0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--teal)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{analysis.investment_recommendation}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 3 }}>Projected ROI: {analysis.target_roi_range}</div>
                </div>
                <TrendingUp size={22} color='var(--teal)' />
              </div>

              {/* Catalysts */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Infrastructure catalysts</div>
                {analysis.infrastructure_catalysts.map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '0.5px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{c.type}</div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: 2 }}>{c.status} · ETA {c.completion}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ height: 4, width: 60, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${c.impact_score}%`, background: 'var(--teal)', borderRadius: 2 }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--teal)', width: 24 }}>{c.impact_score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Risks */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Risk factors</div>
                {analysis.risk_factors.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '0.6rem 0', borderBottom: i < analysis.risk_factors.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                    <AlertTriangle size={14} color={riskColor(r.level)} style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13 }}>{r.factor} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: riskColor(r.level), marginLeft: 6 }}>{r.level}</span></div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{r.mitigation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13, padding: '2rem 0' }}>Loading analysis…</div>
          )}
        </div>
      </div>
    </div>
  )
}
