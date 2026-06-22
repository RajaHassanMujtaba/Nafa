import { useState } from 'react'
import { PhoneCall, Clock, CheckCircle, Calendar, ChevronRight } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const plans = [
  {
    name: 'Discovery Call',
    price: 'Free',
    duration: '30 min',
    desc: 'A free intro call to understand your goals, current level and how Nafa can help you.',
    features: ['Goal setting', 'Trading assessment', 'Roadmap advice', 'No commitment'],
    highlight: false,
  },
  {
    name: 'Strategy Session',
    price: 'PKR 5,000',
    duration: '60 min',
    desc: 'Deep-dive into your trading plan, review your charts and get personalised strategy feedback.',
    features: ['Chart review', 'Strategy refinement', 'Risk management audit', 'Recording provided', 'Follow-up notes'],
    highlight: true,
  },
  {
    name: 'Monthly Mentorship',
    price: 'PKR 15,000',
    duration: '4 sessions / month',
    desc: 'Ongoing 1-on-1 mentorship with weekly sessions, trade reviews and direct access via WhatsApp.',
    features: ['4 x 60-min sessions', 'Trade journal reviews', 'WhatsApp access', 'Custom indicator setup', 'EA bot configuration', 'Priority community access'],
    highlight: false,
  },
]

export default function Consulting() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <PageLayout>
      <div className="relative px-6 sm:px-12 lg:px-20 py-20 border-b border-white/[0.06] bg-gradient-to-br from-rose-900/40 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <PhoneCall size={18} strokeWidth={1.5} className="text-white/70"/>
          </div>
          <span className="text-white/40 text-xs tracking-widest uppercase">Community / Consulting</span>
        </div>
        <h1 className="text-white text-4xl sm:text-5xl font-medium leading-tight tracking-tight mb-4">
          1-on-1 Consulting<br />Sessions
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-xl mb-8">
          Work directly with Nafa's professional traders. Get personalised feedback on your strategy, charts, risk management and mindset to accelerate your trading growth.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-white/50">
          <span className="flex items-center gap-1.5"><Clock size={14}/> Flexible scheduling</span>
          <span className="flex items-center gap-1.5"><Calendar size={14}/> Book online instantly</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={14}/> 100% personalised</span>
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 py-16">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-8">Choose Your Plan</p>
        <div className="grid sm:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={`relative flex flex-col rounded-2xl p-6 border cursor-pointer transition-all
                ${selected === plan.name
                  ? 'border-white/40 bg-white/[0.07]'
                  : plan.highlight
                    ? 'border-white/20 bg-white/[0.05]'
                    : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05]'
                }`}>
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="mb-4">
                <p className="text-white font-medium mb-1">{plan.name}</p>
                <p className="text-white/40 text-xs mb-3">{plan.duration}</p>
                <p className="text-white text-2xl font-medium mb-3">{plan.price}</p>
                <p className="text-white/40 text-xs leading-relaxed">{plan.desc}</p>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-emerald-400 shrink-0"/>
                    <span className="text-white/60 text-xs">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="mt-8 rounded-2xl border border-white/20 bg-white/[0.04] px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-medium mb-1">You selected: {selected}</p>
              <p className="text-white/40 text-sm">Click below to book your session. We'll confirm within 24 hours.</p>
            </div>
            <button type="button"
              className="flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer shrink-0">
              Book {selected} <ChevronRight size={15}/>
            </button>
          </div>
        )}
      </div>

      <div className="px-6 sm:px-12 lg:px-20 pb-20">
        <p className="text-white/30 text-xs tracking-widest uppercase mb-6">How It Works</p>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Choose a plan', desc: 'Select the session type that fits your needs and budget.' },
            { step: '02', title: 'Book your slot', desc: 'Pick a date and time that works for you from available slots.' },
            { step: '03', title: 'Prepare your charts', desc: 'Share your trading journal and charts before the session.' },
            { step: '04', title: 'Grow your edge', desc: 'Get actionable feedback and implement improvements immediately.' },
          ].map((item) => (
            <div key={item.step} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <p className="text-white/20 text-2xl font-medium mb-3">{item.step}</p>
              <p className="text-white text-sm font-medium mb-1">{item.title}</p>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
