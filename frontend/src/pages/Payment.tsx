import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Infinity, CheckCircle, ChevronRight, Star, Shield,
  BookOpen, Users, Bot, Activity, Zap, ArrowLeft, Copy, Check
} from 'lucide-react'

const plans = [
  {
    id: 'masterclass',
    name: 'Master Class',
    tagline: 'Complete Trading Course',
    price: 'Rs. 15,000',
    priceNum: 15000,
    badge: 'Most Popular',
    badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    accent: 'border-violet-500/40 bg-gradient-to-br from-violet-900/30 to-transparent',
    icon: <BookOpen size={22} strokeWidth={1.5} className="text-violet-400" />,
    features: [
      '8 modules — 75+ video lessons',
      'Price Action & Technical Analysis',
      'Risk Management & Psychology',
      'Live Trade Walkthroughs',
      'Custom Indicator Pack (6 indicators)',
      'EA Bot Starter Kit',
      'Trade Journal Templates',
      'Certificate of Completion',
      'Lifetime Access',
    ],
  },
  {
    id: 'community',
    name: 'Community',
    tagline: 'Private Members Community',
    price: 'Rs. 5,000 / mo',
    priceNum: 5000,
    badge: 'Monthly',
    badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    accent: 'border-emerald-500/40 bg-gradient-to-br from-emerald-900/30 to-transparent',
    icon: <Users size={22} strokeWidth={1.5} className="text-emerald-400" />,
    features: [
      '5–10 daily trade signals',
      '3 live Zoom sessions per week',
      'Private Telegram/WhatsApp group',
      'Morning & evening market briefings',
      'Weekly strategy breakdowns',
      'Peer accountability partners',
      'Members-only webinars',
      'Direct access to trading team',
    ],
  },
  {
    id: 'bundle',
    name: 'Full Bundle',
    tagline: 'Course + Community + Tools',
    price: 'Rs. 18,000',
    priceNum: 18000,
    badge: 'Best Value',
    badgeColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    accent: 'border-blue-500/40 bg-gradient-to-br from-blue-900/30 to-transparent',
    icon: <Zap size={22} strokeWidth={1.5} className="text-blue-400" />,
    features: [
      'Everything in Master Class',
      'Everything in Community (3 months)',
      'All 4 EA Bots included',
      'Full Indicator Library (6 indicators)',
      '1-on-1 Onboarding Session',
      '1 month free consulting',
      'Priority support',
      'Lifetime Course Access',
      'Early access to new content',
    ],
  },
]

const bankDetails = {
  bankName: 'Meezan Bank',
  accountTitle: 'Nafa Trading Pvt Ltd',
  accountNumber: '0123456789012345',
  iban: 'PK00MEZN0001010123456789',
}

export default function Payment() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [step, setStep] = useState<'select' | 'payment'>('select')
  const [copied, setCopied] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ transactionId: '', screenshotNote: '' })

  const chosen = plans.find(p => p.id === selectedPlan)

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  function handleProceed() {
    if (!selectedPlan) return
    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSubmit() {
    if (!form.transactionId.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-white text-2xl font-medium mb-3">Payment Submitted!</h1>
          <p className="text-white/50 text-sm leading-relaxed mb-2">
            Aapka payment proof receive ho gaya. Hum 24 ghante mein aapka account activate kar denge.
          </p>
          <p className="text-white/30 text-xs mb-8">
            Koi sawaal ho to WhatsApp karein: <span className="text-white/50">+92 300 0000000</span>
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer"
            >
              Go to Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="liquid-glass text-white text-sm font-medium px-6 py-3 rounded-full cursor-pointer"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 text-white font-medium text-base">
          <Infinity size={22} strokeWidth={1.5} /><span>Nafa</span>
        </Link>
        {step === 'payment' && (
          <button
            type="button"
            onClick={() => setStep('select')}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} /> Back to Plans
          </button>
        )}
      </div>

      <div className="px-4 sm:px-8 py-12 max-w-5xl mx-auto">

        {/* ── STEP 1: Plan Selection ── */}
        {step === 'select' && (
          <>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span className="text-white/40 text-xs tracking-widest uppercase">Choose Your Plan</span>
              </div>
              <h1 className="text-white text-3xl sm:text-4xl font-medium mb-3">
                Start Your Trading Journey
              </h1>
              <p className="text-white/40 text-sm max-w-md mx-auto">
                Ek plan choose karein aur apni trading professionally shuru karein.
              </p>
            </div>

            {/* Plans grid */}
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`text-left rounded-2xl border p-6 transition-all cursor-pointer relative ${
                    selectedPlan === plan.id
                      ? `${plan.accent} ring-2 ring-white/20`
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Selected tick */}
                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle size={18} className="text-white/80" />
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      {plan.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{plan.name}</p>
                      <p className="text-white/40 text-xs">{plan.tagline}</p>
                    </div>
                  </div>

                  <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border font-medium mb-4 ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>

                  <p className="text-white text-2xl font-medium mb-5">{plan.price}</p>

                  <div className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <CheckCircle size={13} strokeWidth={2} className="text-white/50 shrink-0 mt-0.5" />
                        <span className="text-white/60 text-xs leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Proceed button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleProceed}
                disabled={!selectedPlan}
                className="flex items-center gap-2 bg-white text-black text-sm font-medium px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to Payment <ChevronRight size={15} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/[0.06]">
              {[
                { icon: <Shield size={14} />, text: 'Secure Payment' },
                { icon: <CheckCircle size={14} />, text: 'Verified Platform' },
                { icon: <Star size={14} />, text: '4.9/5 Rating' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-2 text-white/30 text-xs">
                  {b.icon}{b.text}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── STEP 2: Payment Details ── */}
        {step === 'payment' && chosen && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-white text-2xl sm:text-3xl font-medium mb-2">Complete Your Payment</h1>
              <p className="text-white/40 text-sm">Bank transfer karein aur transaction ID share karein</p>
            </div>

            {/* Selected plan summary */}
            <div className={`rounded-2xl border ${chosen.accent} p-5 mb-6 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  {chosen.icon}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{chosen.name}</p>
                  <p className="text-white/40 text-xs">{chosen.tagline}</p>
                </div>
              </div>
              <p className="text-white text-xl font-medium">{chosen.price}</p>
            </div>

            {/* Bank Details Card */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-6">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-5">Bank Transfer Details</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Bank Name', value: bankDetails.bankName, key: 'bank' },
                  { label: 'Account Title', value: bankDetails.accountTitle, key: 'title' },
                  { label: 'Account Number', value: bankDetails.accountNumber, key: 'account' },
                  { label: 'IBAN', value: bankDetails.iban, key: 'iban' },
                ].map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-white/40 text-xs mb-0.5">{row.label}</p>
                      <p className="text-white text-sm font-medium truncate">{row.value}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(row.value, row.key)}
                      className="shrink-0 text-white/30 hover:text-white transition-colors cursor-pointer"
                    >
                      {copied === row.key ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-5 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                <p className="text-amber-300/80 text-xs leading-relaxed">
                  ⚠️ Transfer amount exactly <strong className="text-amber-300">{chosen.price}</strong> and mention your registered email in the payment remarks.
                </p>
              </div>
            </div>

            {/* JazzCash / EasyPaisa Option */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-6">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Mobile Wallets (JazzCash / EasyPaisa)</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: 'JazzCash', number: '0300-0000000', color: 'text-red-400' },
                  { name: 'EasyPaisa', number: '0333-0000000', color: 'text-green-400' },
                ].map((w) => (
                  <div key={w.name} className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                    <div>
                      <p className={`text-sm font-medium ${w.color}`}>{w.name}</p>
                      <p className="text-white/50 text-xs">{w.number}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(w.number, w.name)}
                      className="text-white/30 hover:text-white transition-colors cursor-pointer"
                    >
                      {copied === w.name ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction ID form */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-6">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-5">Confirm Your Payment</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Transaction ID / Reference Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. TXN1234567890"
                    value={form.transactionId}
                    onChange={e => setForm(p => ({ ...p, transactionId: e.target.value }))}
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Additional Notes (optional)</label>
                  <textarea
                    placeholder="Koi aur information share karna ho tu yahan likhein..."
                    value={form.screenshotNote}
                    onChange={e => setForm(p => ({ ...p, screenshotNote: e.target.value }))}
                    rows={3}
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!form.transactionId.trim()}
              className="w-full flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Payment Confirmation <ChevronRight size={15} />
            </button>

            <p className="text-center text-white/25 text-xs mt-4">
              Payment confirm hone mein 24 ghante lag sakte hain. WhatsApp: +92 300 0000000
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
