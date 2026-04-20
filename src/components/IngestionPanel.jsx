import React from 'react'
import { RefreshCw } from 'lucide-react'
import { triggerRefresh } from '../services/api'

const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

export default function IngestionPanel({ data, onRefresh }) {
  const [refreshing, setRefreshing] = React.useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    try { await triggerRefresh(); onRefresh && onRefresh() } catch {}
    setTimeout(() => setRefreshing(false), 2000)
  }

  if (!data) return null

  return (
    <div style={panel}>
      <div style={panelHead}>
        <span style={panelTitle}>Data source ingestion</span>
        <button onClick={handleRefresh} style={{ background: 'transparent', border: '0.5px solid var(--border)', borderRadius: 6, padding: '4px 10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer', transition: 'all 0.15s' }}>
          <RefreshCw size={11} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      <div style={{ padding: '0.75rem 1rem' }}>
        {data.map((d, i) => (
          <div key={i} style={{ marginBottom: i < data.length - 1 ? 14 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{d.source}</span>
              <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {d.records.toLocaleString()} rec · {d.freshness}
              </span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${d.health_pct}%`, background: d.color, borderRadius: 2, transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: d.color }}>{d.health_pct}%</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
