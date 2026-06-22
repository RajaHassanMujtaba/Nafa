import { useNavigate } from 'react-router-dom'
import { Activity, ChevronRight, Zap, Eye, Filter, Target } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const indicators = [
  { name: 'Nafa Trend Master',    type: 'Trend',    desc: 'Identifies trend direction with dynamic color-coded signals. Works on all timeframes.',        compatible: 'MT4, MT5, TradingView' },
  { name: 'Nafa Signal Pro',      type: 'Signal',   desc: 'Pinpoints high-probability entry and exit zones using smart price action logic.',              compatible: 'MT4, MT5' },
  { name: 'Nafa Volume Lens',     type: 'Volume',   desc: 'Spots institutional buying and selling through advanced volume profiling.',                    compatible: 'MT5, TradingView' },
  { name: 'Nafa SR Zones',        type: 'Levels',   desc: 'Auto-draws key support and resistance zones with historical confluence scoring.',              compatible: 'MT4, MT5, TradingView' },
  { name: 'Nafa Momentum Filter', type: 'Filter',   desc: 'Filters low-quality setups and only flags trades that meet strict momentum criteria.',         compatible: 'MT4, MT5' },
  { name: 'Nafa Dashboard',       type: 'Scanner',  desc: 'Multi-pair, multi-timeframe scanner showing live signals across all your watched instruments.', compatible: 'MT4, MT5' },
]

export default function Indicators() {
  const navigate = useNavigate()
  return (
    <PageLayout>
      <div className="relative px-6 sm:px-12 lg:px-20 py-20 border-b border-white/[0.06] bg-gradient-to-br from-emerald-900/40 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Activity size={18} strokeWidth={1.5} className="text-white/70"/>
          </div>
          <span className="text-white/40 text-xs tracking-widest uppercase">Products / Indicators</span>
        </div>
        <h1 className="text-white text-4xl sm:text-5xl font-medium leading-tight tracking-tight mb-4">Custom Indicators</h1>
        <p className="text-white/50 text-base leading-relaxed max-w-xl mb-8">
          Proprietary indicators built by professional traders. Cut through noise, spot high-probability setups and trade with confidence on MT4, MT5 and TradingView.
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/payment')}
            className="flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
            Get Indicators <ChevronRight size={15}/>
          </button>
          <button type="button" onClick={() => navigate('/products/masterclass')}
            className="liquid-glass text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
            View Course Bundle
          </button>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/[0.06]">
        {[
          { icon: <Zap size={16}/>, label: 'Plug & Play', desc: 'Installs in minutes' },
          { icon: <Eye size={16}/>, label: 'Visual Signals', desc: 'Clear buy/sell arrows' },
          { icon: <Filter size={16}/>, label: 'Built-in Filters', desc: 'No false signals' },
          { icon: <Target size={16}/>, label: 'All Markets', desc: 'Forex, Crypto, PSX' },
        ].map((item) => (
          <div key={item.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-4 flex flex-col gap-2">
            <div className="text-white/50">{item.icon}</div>
            <p className="text-white text-sm font-medium">{item.label}</p>
            <p className="text-white/40 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="px-6 sm:px-12 lg:px-20 py-16">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-8">Indicator Library</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicators.map((ind) => (
            <div key={ind.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm font-medium">{ind.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">{ind.type}</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-3">{ind.desc}</p>
              <p className="text-white/25 text-[11px]">{ind.compatible}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 pb-20">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-medium mb-1">Get the full indicator pack</h3>
            <p className="text-white/40 text-sm">All 6 indicators included free with the Master Class bundle.</p>
          </div>
          <button type="button" onClick={() => navigate('/payment')}
            className="bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer shrink-0">
            Get Access
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
