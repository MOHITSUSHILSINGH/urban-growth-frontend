import React from 'react'
import { useApi } from '../hooks/useApi'
import { fetchMarketOverview, fetchCorrelation, fetchYieldGap } from '../services/api'
import PricingChart from '../components/PricingChart'
import YieldGapChart from '../components/YieldGapChart'
import CorrelationMatrix from '../components/CorrelationMatrix'

const wrap = { maxWidth: 1400, margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: 20 }
const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

export default function AnalyticsPage() {
  const overview = useApi(fetchMarketOverview)
  const correlation = useApi(fetchCorrelation)
  const yieldGap = useApi(fetchYieldGap)

  return (
    <div style={wrap}>
      {/* Market overview */}
      {overview.data && (
        <div style={panel}>
          <div style={panelHead}><span style={panelTitle}>Market overview</span></div>
          <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { l: 'Zones tracked', v: overview.data.total_zones_tracked },
              { l: 'Cities covered', v: overview.data.cities_covered.length },
              { l: 'Avg appreciation YoY', v: `${overview.data.avg_appreciation_yoy}%` },
              { l: 'Top city', v: overview.data.top_performing_city },
              { l: 'Undervalued opportunities', v: overview.data.undervalued_opportunity_count },
              { l: 'Model accuracy (12M)', v: overview.data.model_accuracy.split(' ')[0] },
            ].map(s => (
              <div key={s.l} style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 6 }}>{s.l}</div>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '0 1rem 1rem', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            Cities: {overview.data.cities_covered.join(' · ')}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <PricingChart />
        <YieldGapChart data={yieldGap.data} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <CorrelationMatrix data={correlation.data} />
        <div style={panel}>
          <div style={panelHead}><span style={panelTitle}>GVS algorithm weights</span></div>
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Municipal Declarations', weight: 35, color: 'var(--teal)' },
              { label: 'Listing Density Trend', weight: 20, color: 'var(--blue)' },
              { label: 'Pricing Velocity', weight: 20, color: 'var(--amber)' },
              { label: 'Rental Absorption', weight: 15, color: 'var(--purple)' },
              { label: 'Zoning Policy Signals', weight: 10, color: 'var(--coral)' },
            ].map(w => (
              <div key={w.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
                  <span>{w.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: w.color, fontWeight: 500 }}>{w.weight}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${w.weight * 2.2}%`, background: w.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: '0.75rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
              GVS = Σ(weight_i × normalized_score_i) × 100<br />
              <span style={{ color: 'var(--text-tertiary)' }}>Horizon decay: score × 0.92^n per 12M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
