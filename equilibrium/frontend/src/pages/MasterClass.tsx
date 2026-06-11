import { useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle, Clock, Users, Star, ChevronRight } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const modules = [
  { num: '01', title: 'Trading Foundations',       lessons: 8,  desc: 'Markets, brokers, order types, terminology' },
  { num: '02', title: 'Technical Analysis',         lessons: 12, desc: 'Charts, candlesticks, support & resistance' },
  { num: '03', title: 'Price Action Mastery',       lessons: 10, desc: 'Pin bars, engulfing, inside bars, patterns' },
  { num: '04', title: 'Risk Management',            lessons: 6,  desc: 'Position sizing, stop-loss, drawdown control' },
  { num: '05', title: 'Trading Psychology',         lessons: 7,  desc: 'Discipline, patience, handling losses' },
  { num: '06', title: 'Strategy Building',          lessons: 9,  desc: 'Build, backtest and forward-test your system' },
  { num: '07', title: 'Live Trade Walkthroughs',    lessons: 15, desc: 'Real trades across Forex, Crypto, PSX' },
  { num: '08', title: 'Advanced Setups',            lessons: 8,  desc: 'Smart money, order flow, ICT concepts' },
]

export default function MasterClass() {
  const navigate = useNavigate()
  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative px-6 sm:px-12 lg:px-20 py-20 border-b border-white/[0.06] bg-gradient-to-br from-violet-900/40 to-transparent">
        <div className="flex items-center gap-2 mb-4">
          <Star size={13} className="text-amber-400 fill-amber-400" />
          <span className="text-white/40 text-xs tracking-widest uppercase">Most Popular</span>
        </div>
        <h1 className="text-white text-4xl sm:text-5xl font-medium leading-tight tracking-tight mb-4">
          Master Class<br />Trading Course
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-xl mb-8">
          A complete A–Z professional trading program. From total beginner to confident trader — covering every market, strategy and mindset skill you need.
        </p>
        <div className="flex flex-wrap gap-4 mb-8 text-sm text-white/50">
          <span className="flex items-center gap-1.5"><Clock size={14}/> 75+ lessons</span>
          <span className="flex items-center gap-1.5"><BookOpen size={14}/> 8 modules</span>
          <span className="flex items-center gap-1.5"><Users size={14}/> 4,000+ students</span>
          <span className="flex items-center gap-1.5"><Star size={14}/> 4.9 / 5 rating</span>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/payment')}
            className="flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
            Enroll Now <ChevronRight size={15}/>
          </button>
          <button type="button" onClick={() => navigate('/community')}
            className="liquid-glass text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
            Join Community
          </button>
        </div>
      </div>

      {/* Modules */}
      <div className="px-6 sm:px-12 lg:px-20 py-16">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-8">Course Modules</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {modules.map((m) => (
            <div key={m.num} className="flex gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-5 hover:bg-white/[0.05] transition-colors">
              <span className="text-white/20 text-2xl font-medium shrink-0">{m.num}</span>
              <div>
                <p className="text-white text-sm font-medium mb-1">{m.title}</p>
                <p className="text-white/40 text-xs mb-2">{m.desc}</p>
                <span className="text-white/30 text-[11px]">{m.lessons} lessons</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="px-6 sm:px-12 lg:px-20 pb-16">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-6">What's Included</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'Lifetime course access','Live Q&A sessions','Private community access',
            'Custom indicator pack','EA bot starter kit','Certificate of completion',
            'Weekly market analysis','Trade journal templates','1-month free consulting',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
              <CheckCircle size={15} strokeWidth={1.5} className="text-emerald-400 shrink-0"/>
              <span className="text-white/70 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 sm:px-12 lg:px-20 pb-20">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-medium mb-1">Ready to become a professional trader?</h3>
            <p className="text-white/40 text-sm">Limited seats available. Enroll today and start your journey.</p>
          </div>
          <button type="button" onClick={() => navigate('/payment')}
            className="bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer shrink-0">
            Enroll in Master Class
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
