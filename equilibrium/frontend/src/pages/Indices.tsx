import { BarChart2 } from 'lucide-react'
import MarketPage from '../components/MarketPage'
export default function Indices() {
  return <MarketPage
    title="Indices Trading"
    subtitle="Markets / Indices"
    description="Trade the world's top stock indices — S&P 500, NASDAQ, FTSE, DAX and more. Gain broad market exposure with lower single-stock risk."
    color="from-purple-900/40 to-transparent"
    icon={<BarChart2 size={18} strokeWidth={1.5} className="text-white/70" />}
    stats={[
      { label: 'Top Indices', value: '15+' },
      { label: 'Avg Daily Move', value: '0.8%' },
      { label: 'Instruments', value: 'CFDs/ETFs' },
      { label: 'Nafa Members', value: '900+' },
    ]}
    features={[
      'Understanding index composition and what moves them',
      'S&P 500, NASDAQ, Dow Jones, FTSE 100 and DAX strategies',
      'Correlation between indices and global economic events',
      'Gap trading, opening range breakouts and trend following',
      'Using index futures vs ETFs vs CFDs',
      'Macro trading around earnings seasons and Fed decisions',
    ]}
  />
}
