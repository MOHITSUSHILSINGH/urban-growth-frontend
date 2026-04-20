# Urban Growth Engine — Frontend

React + Vite frontend for the Predictive Urban Growth Analytics Dashboard.

## Setup

```bash
npm install
npm run dev
```

App runs at: http://localhost:3000  
Backend must be running at: http://localhost:8000

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | / (default) | Full analytics overview — heatmap, KPIs, charts, signals |
| Zones | Zones tab | Searchable/filterable zone explorer with detail modals |
| Analytics | Analytics tab | Deep-dive: pricing velocity, yield gap, correlation matrix, GVS weights |
| Signals | Signals tab | Live signal feed with type breakdown and source catalog |

## Components

```
src/
├── App.jsx                   # Root + routing
├── index.css                 # Global dark theme vars
├── main.jsx                  # React entry point
├── components/
│   ├── Navbar.jsx            # Top navigation
│   ├── KPICards.jsx          # 4-stat summary row
│   ├── Heatmap.jsx           # 6×6 GVS heatmap with hover
│   ├── TopZones.jsx          # Ranked zone sidebar
│   ├── SignalFeed.jsx        # Filterable signal list
│   ├── PricingChart.jsx      # RTM vs UC line chart (Chart.js)
│   ├── YieldGapChart.jsx     # Yield vs appreciation bar chart
│   ├── CorrelationMatrix.jsx # Indicator correlation table
│   ├── IngestionPanel.jsx    # Data source health bars
│   └── ZoneModal.jsx         # Zone detail overlay
├── hooks/
│   └── useApi.js             # Generic fetch hook
├── pages/
│   ├── Dashboard.jsx         # Main dashboard layout
│   ├── ZonesPage.jsx         # Zone explorer
│   ├── AnalyticsPage.jsx     # Analytics deep-dive
│   └── SignalsPage.jsx       # Signal explorer
└── services/
    └── api.js                # Axios API calls
```

## Tech Stack

- React 18 + Vite
- Chart.js + react-chartjs-2
- Axios for API calls
- Lucide React icons
- No CSS framework — pure CSS variables
