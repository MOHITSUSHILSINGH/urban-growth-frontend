import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const panel = { background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }
const panelHead = { padding: '0.75rem 1rem', borderBottom: '0.5px solid var(--border)' }
const panelTitle = { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }

export default function YieldGapChart({ data }) {
  if (!data) return null

  const chartData = {
    labels: data.map(d => d.zone),
    datasets: [
      {
        label: 'Rental yield %', data: data.map(d => d.rental_yield),
        backgroundColor: 'rgba(55,138,221,0.72)', borderRadius: 3, borderSkipped: false,
      },
      {
        label: 'Appreciation % YoY', data: data.map(d => d.appreciation),
        backgroundColor: 'rgba(29,158,117,0.72)', borderRadius: 3, borderSkipped: false,
      },
    ]
  }

  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#13161b', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, titleColor: '#f0f2f5', bodyColor: '#8892a4', callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%` } } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 9, family: 'JetBrains Mono' }, color: '#4d5666' } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { font: { size: 9, family: 'JetBrains Mono' }, color: '#4d5666', callback: v => v + '%' } }
    }
  }

  return (
    <div style={panel}>
      <div style={panelHead}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={panelTitle}>Rental yield vs appreciation gap</span>
          <div style={{ display: 'flex', gap: 12 }}>
            {[['#378ADD', 'Rental yield'], ['#1D9E75', 'Appreciation']].map(([c, l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ position: 'relative', height: 170 }}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
