import { Globe } from 'lucide-react'
import MarketPage from '../components/MarketPage'
export default function PSX() {
  return <MarketPage
    title="PSX — Pakistan Stock Exchange"
    subtitle="Markets / PSX"
    description="Trade the KSE-100 and top Pakistani equities. Get local market expertise, sector analysis and proven strategies tailored to Pakistan's stock market."
    color="from-green-900/40 to-transparent"
    icon={<Globe size={18} strokeWidth={1.5} className="text-white/70" />}
    stats={[
      { label: 'Listed Companies', value: '500+' },
      { label: 'Market Cap', value: '$25B+' },
      { label: 'Trading Hours', value: '9:30–3:30' },
      { label: 'Nafa Members', value: '3,000+' },
    ]}
    features={[
      'KSE-100 index structure, top sectors and blue-chip stocks',
      'Fundamental analysis of Pakistani companies — P/E, EPS, dividends',
      'Technical setups and chart patterns specific to PSX',
      'Sector rotation — cement, banking, energy, textile and pharma',
      'IPO analysis and right share strategies',
      'Budget, SBP decisions and their impact on the market',
    ]}
  />
}
