import { useNavigate } from 'react-router-dom'
import { Bot, ChevronRight, BarChart2, Shield, Zap, RefreshCw } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const bots = [
  { name: 'Nafa Trend Bot',     market: 'Forex',      winRate: '68%', drawdown: '8%',  desc: 'Follows high-timeframe trends with smart pullback entries and automated trailing stop.' },
  { name: 'Nafa Scalper Pro',   market: 'Forex',      winRate: '72%', drawdown: '6%',  desc: 'High-frequency London/NY session scalper. Targets 5–15 pip moves with tight risk control.' },
  { name: 'Nafa Crypto Bot',    market: 'Crypto',     winRate: '64%', drawdown: '12%', desc: 'Trades BTC/ETH breakouts using volume confirmation and momentum filters.' },
  { name: 'Nafa Grid Master',   market: 'Forex/Gold', winRate: '78%', drawdown: '15%', desc: 'Grid strategy for ranging markets. Profits from sideways price action with controlled exposure.' },
]

export default function EABots() {
  const navigate = useNavigate()
  return (
    <PageLayout>
      <div className="relative px-6 sm:px-12 lg:px-20 py-20 border-b border-white/[0.06] bg-gradient-to-br from-blue-900/40 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Bot size={18} strokeWidth={1.5} className="text-white/70"/>
          </div>
          <span className="text-white/40 text-xs tracking-widest uppercase">Products / EA Bots</span>
        </div>
        <h1 className="text-white text-4xl sm:text-5xl font-medium leading-tight tracking-tight mb-4">
          Automated EA Bots
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-xl mb-8">
          Let your trading run on autopilot. Professionally coded Expert Advisors with verified backtest results, live performance tracking and plug-and-play MT4/MT5 setup.
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/payment')}
            className="flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
            Get EA Bots <ChevronRight size={15}/>
          </button>
          <button type="button" onClick={() => navigate('/products/masterclass')}
            className="liquid-glass text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
            View Course Bundle
          </button>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/[0.06]">
        {[
          { icon: <Zap size={16}/>,       label: '24/7 Trading',    desc: 'Never miss a setup' },
          { icon: <Shield size={16}/>,     label: 'Risk Controls',   desc: 'Built-in drawdown limits' },
          { icon: <BarChart2 size={16}/>,  label: 'Backtested',      desc: '5+ years of data' },
          { icon: <RefreshCw size={16}/>,  label: 'Auto Updates',    desc: 'Regular optimisation' },
        ].map((item) => (
          <div key={item.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-4 flex flex-col gap-2">
            <div className="text-white/50">{item.icon}</div>
            <p className="text-white text-sm font-medium">{item.label}</p>
            <p className="text-white/40 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="px-6 sm:px-12 lg:px-20 py-16">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-8">Available EA Bots</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {bots.map((bot) => (
            <div key={bot.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">{bot.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">{bot.market}</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{bot.desc}</p>
              <div className="flex gap-4">
                <div>
                  <p className="text-emerald-400 text-lg font-medium">{bot.winRate}</p>
                  <p className="text-white/30 text-[11px]">Win Rate</p>
                </div>
                <div>
                  <p className="text-amber-400 text-lg font-medium">{bot.drawdown}</p>
                  <p className="text-white/30 text-[11px]">Max Drawdown</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 pb-20">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-medium mb-1">Start automated trading today</h3>
            <p className="text-white/40 text-sm">All EA bots included in the Master Class bundle. Full setup support included.</p>
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
