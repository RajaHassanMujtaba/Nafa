import { useNavigate } from 'react-router-dom'
import { ChevronRight, TrendingUp, BarChart2, Clock, Shield } from 'lucide-react'
import PageLayout from '../components/PageLayout'

interface MarketPageProps {
  title: string
  subtitle: string
  description: string
  color: string
  stats: { label: string; value: string }[]
  features: string[]
  icon: React.ReactNode
}

export default function MarketPage({ title, subtitle, description, color, stats, features, icon }: MarketPageProps) {
  const navigate = useNavigate()

  return (
    <PageLayout>
      {/* Hero banner */}
      <div className={`relative px-6 sm:px-12 lg:px-20 py-20 border-b border-white/[0.06] bg-gradient-to-br ${color}`}>
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              {icon}
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">{subtitle}</span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl font-medium leading-tight tracking-tight mb-5">{title}</h1>
          <p className="text-white/50 text-base leading-relaxed max-w-xl mb-8">{description}</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate('/products/masterclass')}
              className="flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
              Start Learning <ChevronRight size={15} />
            </button>
            <button type="button" onClick={() => navigate('/community')}
              className="liquid-glass text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
              Join Community
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-6 sm:px-12 lg:px-20 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/[0.06]">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-white text-2xl font-medium mb-1">{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* What you learn */}
      <div className="px-6 sm:px-12 lg:px-20 py-16 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-white/30 text-xs tracking-widest uppercase mb-4">What You'll Learn</p>
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white/60 text-[10px]">{i + 1}</span>
                </div>
                <span className="text-white/70 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Why Trade With Nafa</p>
          {[
            { icon: <TrendingUp size={16} strokeWidth={1.5} />, title: 'Live Trade Signals', desc: 'Real-time alerts directly to your phone or email.' },
            { icon: <BarChart2 size={16} strokeWidth={1.5} />, title: 'Technical Analysis', desc: 'Deep chart analysis and pattern recognition guides.' },
            { icon: <Clock size={16} strokeWidth={1.5} />, title: 'Daily Market Updates', desc: 'Morning briefings and end-of-day summaries.' },
            { icon: <Shield size={16} strokeWidth={1.5} />, title: 'Risk Management', desc: 'Learn how to protect capital and grow consistently.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
              <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center shrink-0 text-white/60">
                {item.icon}
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-0.5">{item.title}</p>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA footer */}
      <div className="px-6 sm:px-12 lg:px-20 pb-20">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-medium mb-1">Ready to master {title}?</h3>
            <p className="text-white/40 text-sm">Join the Nafa community and start trading smarter today.</p>
          </div>
          <button type="button" onClick={() => navigate('/products/masterclass')}
            className="bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer shrink-0">
            Get Started
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
