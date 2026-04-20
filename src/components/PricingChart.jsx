import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { fetchPricing } from '../services/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

export default function PricingChart() {
  const [horizon, setHorizon] = useState('12M')
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    fetchPricing(horizon).then(res => setChartData(res.data)).catch(() => {})
  }, [horizon])

  const horizons = ['12M', '24M', '60M']

  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false, backgroundColor: '#13161b', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, titleColor: '#f0f2f5', bodyColor: '#8892a4' } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { font: { size: 10, family: 'JetBrains Mono' }, color: '#4d5666' } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { font: { size: 10, family: 'JetBrains Mono' }, color: '#4d5666' } },
    }
  }

  const data = chartData ? {
    labels: chartData.map(d => d.label),
    datasets: [
      {
        label: 'Ready-to-move', data: chartData.map(d => d.rtm),
        borderColor: '#1D9E75', backgroundColor: 'rgba(29,158,117,0.08)',
        pointRadius: 2, pointHoverRadius: 5, tension: 0.4, fill: true, borderWidth: 2,
      },
      {
        label: 'Under construction', data: chartData.map(d => d.uc),
        borderColor: '#378ADD', backgroundColor: 'rgba(55,138,221,0.06)',
        pointRadius: 2, pointHoverRadius: 5, tension: 0.4, fill: true, borderWidth: 2, borderDash: [5, 3],
      },
    ]
  } : null

  return (
    <div style={panel}>
      <div style={panelHead}>
        <span style={panelTitle}>Pricing velocity — RTM vs under construction</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {horizons.map(h => (
            <button key={h} onClick={() => setHorizon(h)} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 10px',
              borderRadius: 6, border: '0.5px solid', cursor: 'pointer', transition: 'all 0.15s',
              borderColor: horizon === h ? 'var(--teal)' : 'var(--border)',
              background: horizon === h ? 'var(--teal-dim)' : 'transparent',
              color: horizon === h ? 'var(--teal)' : 'var(--text-tertiary)',
            }}>{h}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
          {[['#1D9E75', 'Ready-to-move'], ['#378ADD', 'Under construction']].map(([c, l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: 'inline-block' }} />{l}
            </span>
          ))}
        </div>
        <div style={{ position: 'relative', height: 180 }}>
          {data ? <Line data={data} options={options} /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-tertiary)', fontSize: 13 }}>Loading…</div>}
        </div>
      </div>
    </div>
  )
}
