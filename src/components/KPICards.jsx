import React from 'react'

const style = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 },
  card: {
    background: 'var(--bg-card)', border: '0.5px solid var(--border)',
    borderRadius: 'var(--radius-md)', padding: '1rem 1.2rem',
  },
  label: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 },
  val: { fontSize: 28, fontWeight: 600, lineHeight: 1 },
  delta: { fontFamily: 'var(--font-mono)', fontSize: 11, marginTop: 6 },
}

export default function KPICards({ data }) {
  if (!data) return null
  const cards = [
    { label: 'Active Hot Zones', value: data.active_hot_zones, delta: `↑ ${data.hot_zones_delta} from last month`, color: 'var(--teal)', up: true },
    { label: 'Avg GVS Score', value: data.avg_gvs.toFixed(1), delta: `↑ ${data.gvs_delta} pts`, color: 'var(--text-primary)', up: true },
    { label: 'Municipal Signals', value: data.municipal_signals, delta: 'New tenders this week', color: 'var(--amber)', up: null },
    { label: 'Undervalued Zones', value: data.undervalued_zones, delta: '↑ rental yield gap > 2.4%', color: 'var(--purple)', up: true },
  ]
  return (
    <div style={style.grid}>
      {cards.map((c, i) => (
        <div key={i} style={style.card}>
          <div style={style.label}>{c.label}</div>
          <div style={{ ...style.val, color: c.color }}>{c.value}</div>
          <div style={{ ...style.delta, color: c.up === true ? 'var(--teal)' : c.up === false ? 'var(--coral)' : 'var(--text-secondary)' }}>{c.delta}</div>
        </div>
      ))}
    </div>
  )
}
