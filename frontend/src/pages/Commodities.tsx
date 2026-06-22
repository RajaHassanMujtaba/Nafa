import { Wheat } from 'lucide-react'
import MarketPage from '../components/MarketPage'
export default function Commodities() {
  return <MarketPage
    title="Commodities Trading"
    subtitle="Markets / Commodities"
    description="Trade Gold, Silver, Oil, Natural Gas and Agricultural commodities. Hedge against inflation and profit from global supply and demand shifts."
    color="from-yellow-900/40 to-transparent"
    icon={<Wheat size={18} strokeWidth={1.5} className="text-white/70" />}
    stats={[
      { label: 'Top Commodities', value: '20+' },
      { label: 'Gold Daily Vol.', value: '$150B' },
      { label: 'Asset Classes', value: 'Metals, Energy, Agri' },
      { label: 'Nafa Members', value: '700+' },
    ]}
    features={[
      'Gold and Silver — safe haven trading and technical setups',
      'Crude Oil (WTI & Brent) — OPEC, supply shocks and seasonality',
      'Natural Gas trading around weather and storage data',
      'Agricultural commodities — wheat, corn, soybeans',
      'Using commodity correlations with currencies (AUD, CAD)',
      'Futures contracts, rollover dates and cost of carry',
    ]}
  />
}
