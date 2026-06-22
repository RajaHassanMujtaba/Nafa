import { useNavigate } from 'react-router-dom'
import { Users, MessageCircle, Video, Bell, ChevronRight, Star } from 'lucide-react'
import PageLayout from '../components/PageLayout'

export default function Community() {
  const navigate = useNavigate()
  return (
    <PageLayout>
      <div className="relative px-6 sm:px-12 lg:px-20 py-20 border-b border-white/[0.06] bg-gradient-to-br from-amber-900/40 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Users size={18} strokeWidth={1.5} className="text-white/70"/>
          </div>
          <span className="text-white/40 text-xs tracking-widest uppercase">Community / Members Only</span>
        </div>
        <h1 className="text-white text-4xl sm:text-5xl font-medium leading-tight tracking-tight mb-4">
          Private Trading<br />Community
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-xl mb-8">
          Join thousands of serious traders in Nafa's private community. Daily trade ideas, live analysis sessions, peer accountability and direct access to our professional trading team.
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/payment')}
            className="flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
            Join Now <ChevronRight size={15}/>
          </button>
          <button type="button" onClick={() => navigate('/products/masterclass')}
            className="liquid-glass text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
            View Master Class
          </button>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 py-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-white/[0.06]">
        {[
          { label: 'Active Members', value: '4,500+' },
          { label: 'Daily Signals', value: '5–10' },
          { label: 'Live Sessions / wk', value: '3' },
          { label: 'Avg Member Rating', value: '4.9 ★' },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-white text-2xl font-medium mb-1">{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-6 sm:px-12 lg:px-20 py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-white/30 text-xs tracking-widest uppercase mb-6">What You Get</p>
          {[
            { icon: <Bell size={16}/>,          title: 'Daily Trade Alerts',       desc: 'Morning and evening signals with entry, SL and TP for Forex, Crypto and PSX.' },
            { icon: <Video size={16}/>,          title: 'Live Analysis Sessions',   desc: '3 live Zoom sessions per week — market overview, setups and Q&A.' },
            { icon: <MessageCircle size={16}/>,  title: 'Private Chat Group',       desc: 'Members-only Telegram/WhatsApp group with real-time updates and discussion.' },
            { icon: <Users size={16}/>,          title: 'Peer Accountability',      desc: 'Partner with other traders, share journals and grow together.' },
            { icon: <Star size={16}/>,           title: 'Exclusive Content',        desc: 'Members-only webinars, trade recaps, strategy breakdowns every week.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 mb-3">
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

        <div>
          <p className="text-white/30 text-xs tracking-widest uppercase mb-6">Member Reviews</p>
          {[
            { name: 'Ahmed K.',   loc: 'Karachi',   text: 'The daily signals alone paid for my membership in the first week. Incredible community.' },
            { name: 'Sara M.',    loc: 'Lahore',    text: 'Live sessions are incredibly detailed. I went from losing trader to consistently profitable in 3 months.' },
            { name: 'Bilal R.',   loc: 'Islamabad', text: 'Best trading community in Pakistan. The team is responsive and the content is world-class.' },
            { name: 'Fatima N.',  loc: 'Dubai',     text: 'The PSX signals and analysis are unmatched. My portfolio is up 40% since joining Nafa.' },
          ].map((r) => (
            <div key={r.name} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 mb-3">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} className="text-amber-400 fill-amber-400"/>)}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">"{r.text}"</p>
              <p className="text-white/30 text-xs">{r.name} · {r.loc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 pb-20">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-medium mb-1">Join 4,500+ traders in the Nafa community</h3>
            <p className="text-white/40 text-sm">Limited spots available each month. Apply now to secure your place.</p>
          </div>
          <button type="button" onClick={() => navigate('/payment')}
            className="bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer shrink-0">
            Join the Community
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
