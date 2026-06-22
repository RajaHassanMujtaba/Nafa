import { Globe } from 'lucide-react'
import MarketPage from '../components/MarketPage'
export default function WorldMarkets() {
  return <MarketPage
    title="World Markets"
    subtitle="Markets / Global"
    description="Expand your edge across US, European, Asian and Emerging markets. Understand global macro forces and trade opportunities around the world."
    color="from-teal-900/40 to-transparent"
    icon={<Globe size={18} strokeWidth={1.5} className="text-white/70" />}
    stats={[
      { label: 'Exchanges Covered', value: '30+' },
      { label: 'Countries', value: '20+' },
      { label: 'Asset Classes', value: 'Stocks, ETFs, FX' },
      { label: 'Nafa Members', value: '1,200+' },
    ]}
    features={[
      'US markets — NYSE, NASDAQ, S&P 500 sector deep-dives',
      'European markets — LSE, Frankfurt, Paris and Euro macro',
      'Asian markets — Nikkei, Hang Seng, Shanghai and BSE India',
      'Emerging markets — opportunities and risk management',
      'Global macro trading — interest rates, inflation, USD cycles',
      'Cross-market correlations and intermarket analysis',
    ]}
  />
}
