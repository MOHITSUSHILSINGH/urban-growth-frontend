import React, { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { fetchKPIs, fetchHeatmap, fetchZones, fetchSignals, fetchIngestion, fetchYieldGap, fetchCorrelation } from '../services/api'
import KPICards from '../components/KPICards'
import Heatmap from '../components/Heatmap'
import TopZones from '../components/TopZones'
import SignalFeed from '../components/SignalFeed'
import PricingChart from '../components/PricingChart'
import YieldGapChart from '../components/YieldGapChart'
import IngestionPanel from '../components/IngestionPanel'
import CorrelationMatrix from '../components/CorrelationMatrix'
import ZoneModal from '../components/ZoneModal'

const wrap = { maxWidth: 1400, margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: 20 }

export default function Dashboard() {
  const kpis = useApi(fetchKPIs)
  const heatmap = useApi(fetchHeatmap)
  const zones = useApi(fetchZones)
  const signals = useApi(fetchSignals)
  const ingestion = useApi(fetchIngestion)
  const yieldGap = useApi(fetchYieldGap)
  const correlation = useApi(fetchCorrelation)

  const [selectedZone, setSelectedZone] = useState(null)
  const [signalFilter, setSignalFilter] = useState('All')

  return (
    <div style={wrap}>
      <KPICards data={kpis.data} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Heatmap data={heatmap.data} onCellClick={cell => {
            const match = zones.data?.find(z => z.name.startsWith(cell.zone.split('–')[0]))
            if (match) setSelectedZone(match)
          }} />
          <PricingChart />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TopZones zones={zones.data} onSelect={setSelectedZone} selectedId={selectedZone?.id} />
          <SignalFeed signals={signals.data} filter={signalFilter} onFilterChange={setSignalFilter} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <YieldGapChart data={yieldGap.data} />
        <CorrelationMatrix data={correlation.data} />
        <IngestionPanel data={ingestion.data} onRefresh={ingestion.refetch} />
      </div>

      {selectedZone && <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />}
    </div>
  )
}
