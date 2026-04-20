import axios from 'axios'


const api = axios.create({
  baseURL: 'https://urban-growth-backend-3.onrender.com/api'
})

export const fetchKPIs = () => api.get('/analytics/kpis').then(r => r.data)
export const fetchHeatmap = () => api.get('/heatmap').then(r => r.data)
export const fetchZones = (params = {}) => api.get('/zones', { params }).then(r => r.data)
export const fetchZoneAnalysis = (id) => api.get(`/zones/${id}/analysis`).then(r => r.data)
export const fetchSignals = (params = {}) => api.get('/signals', { params }).then(r => r.data)
export const fetchIngestion = () => api.get('/ingestion/status').then(r => r.data)
export const fetchPricing = (horizon = '12M') => api.get('/analytics/pricing-velocity', { params: { horizon } }).then(r => r.data)
export const fetchYieldGap = () => api.get('/analytics/yield-gap').then(r => r.data)
export const fetchMarketOverview = () => api.get('/analytics/market-overview').then(r => r.data)
export const fetchCorrelation = () => api.get('/analytics/correlation-matrix').then(r => r.data)
export const triggerRefresh = () => api.post('/ingestion/trigger-refresh').then(r => r.data)
