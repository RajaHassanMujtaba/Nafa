import { Bitcoin } from 'lucide-react'
import MarketPage from '../components/MarketPage'
export default function Crypto() {
  return <MarketPage
    title="Crypto Trading"
    subtitle="Markets / Crypto"
    description="Trade Bitcoin, Ethereum and top altcoins using proven strategies. Learn to navigate volatility, spot breakouts and manage risk in the crypto market."
    color="from-orange-900/40 to-transparent"
    icon={<Bitcoin size={18} strokeWidth={1.5} className="text-white/70" />}
    stats={[
      { label: 'Market Cap', value: '$2.5T' },
      { label: 'Trading Hours', value: '24/7' },
      { label: 'Top Coins', value: '50+' },
      { label: 'Nafa Members', value: '1,800+' },
    ]}
    features={[
      'Bitcoin and Ethereum fundamentals and market cycles',
      'Altcoin research — how to find high-potential coins',
      'On-chain analysis and crypto-specific indicators',
      'DeFi, spot trading vs futures and leverage explained',
      'Managing extreme volatility and avoiding liquidation',
      'Bull and bear market strategies for consistent profit',
    ]}
  />
}
