import { TrendingUp } from 'lucide-react'
import MarketPage from '../components/MarketPage'
export default function Forex() {
  return <MarketPage
    title="Forex Trading"
    subtitle="Markets / Forex"
    description="The world's largest financial market with $7.5 trillion traded daily. Learn how to trade major, minor and exotic currency pairs with precision."
    color="from-blue-900/40 to-transparent"
    icon={<TrendingUp size={18} strokeWidth={1.5} className="text-white/70" />}
    stats={[
      { label: 'Daily Volume', value: '$7.5T' },
      { label: 'Trading Hours', value: '24/5' },
      { label: 'Currency Pairs', value: '100+' },
      { label: 'Nafa Members', value: '2,400+' },
    ]}
    features={[
      'Understanding major pairs: EUR/USD, GBP/USD, USD/JPY and more',
      'Reading forex charts, candlesticks and price action',
      'Fundamental analysis — news, interest rates, economic data',
      'Session timing: London, New York, Asian overlaps',
      'Setting stop-loss, take-profit and risk-reward ratios',
      'Scalping, day trading and swing trading strategies',
    ]}
  />
}
