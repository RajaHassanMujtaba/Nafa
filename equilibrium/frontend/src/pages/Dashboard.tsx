import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Infinity, LogOut, BookOpen, Activity, Bot, Users,
  PhoneCall, User, TrendingUp, Clock, Award, Bell,
  ChevronRight, Lock, Star, Zap
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const courses = [
  { title: 'Master Class — Module 1', subtitle: 'Trading Foundations', progress: 100, lessons: 8,  status: 'completed' },
  { title: 'Master Class — Module 2', subtitle: 'Technical Analysis',  progress: 60,  lessons: 12, status: 'in-progress' },
  { title: 'Master Class — Module 3', subtitle: 'Price Action',        progress: 0,   lessons: 10, status: 'locked' },
  { title: 'Master Class — Module 4', subtitle: 'Risk Management',     progress: 0,   lessons: 6,  status: 'locked' },
]

const tools = [
  { name: 'Nafa Trend Master',  type: 'Indicator', icon: Activity, available: true },
  { name: 'Nafa Signal Pro',    type: 'Indicator', icon: Activity, available: true },
  { name: 'Nafa Trend Bot',     type: 'EA Bot',    icon: Bot,      available: true },
  { name: 'Nafa Scalper Pro',   type: 'EA Bot',    icon: Bot,      available: false },
]

const signals = [
  { pair: 'EUR/USD', type: 'BUY',  entry: '1.0842', sl: '1.0810', tp: '1.0900', time: '2h ago',  status: 'active' },
  { pair: 'BTC/USD', type: 'SELL', entry: '67,200', sl: '68,500', tp: '64,000', time: '5h ago',  status: 'active' },
  { pair: 'OGDC',    type: 'BUY',  entry: '185.00', sl: '180.00', tp: '195.00', time: '1d ago',  status: 'closed' },
  { pair: 'XAU/USD', type: 'BUY',  entry: '2,318',  sl: '2,290',  tp: '2,380',  time: '2d ago',  status: 'closed' },
]

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading your dashboard...</div>
      </div>
    )
  }

  const firstName = user?.full_name?.split(' ')[0] || 'Trader'
  const initials  = user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'NA'
  const isPaid    = user?.is_paid === true

  async function handleSignOut() { await logout(); navigate('/') }

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Top navbar */}
      <nav className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between px-5 sm:px-8 py-4">
        <Link to="/" className="flex items-center gap-2 text-white font-medium text-base">
          <Infinity size={22} strokeWidth={1.5}/><span>Nafa</span>
        </Link>
        <div className="flex items-center gap-3">
          <button type="button" className="relative text-white/50 hover:text-white transition-colors cursor-pointer">
            <Bell size={18}/>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full"/>
          </button>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-medium text-white">
            {initials}
          </div>
          <button type="button" onClick={handleSignOut}
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors cursor-pointer">
            <LogOut size={15}/><span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </nav>

      <div className="px-5 sm:px-8 lg:px-12 py-8 max-w-6xl mx-auto">

        {/* Welcome banner */}
        <div className="bg-gradient-to-br from-violet-900/40 to-transparent border border-white/[0.06] rounded-2xl px-6 sm:px-8 py-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Members Dashboard</p>
            <h1 className="text-white text-2xl sm:text-3xl font-medium">Welcome back, {firstName} 👋</h1>
            <p className="text-white/40 text-sm mt-1">
              {user?.trading_experience || 'Trader'} · {user?.city || ''}{user?.city && user?.country ? ', ' : ''}{user?.country || ''}
            </p>
          </div>
          <div className="flex gap-3">
            {isPaid ? (
              <button type="button" onClick={() => navigate('/consulting')}
                className="flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
                Book Session <ChevronRight size={14}/>
              </button>
            ) : (
              <button type="button" onClick={() => navigate('/payment')}
                className="flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
                <Zap size={14}/> Upgrade Now
              </button>
            )}
          </div>
        </div>

        {/* UNPAID USER BANNER */}
        {!isPaid && (
          <div className="mb-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-900/30 to-orange-900/20 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Lock size={18} className="text-amber-400"/>
              </div>
              <div>
                <p className="text-amber-300 font-medium text-sm mb-1">Content Locked — Subscribe to Access</p>
                <p className="text-white/40 text-xs leading-relaxed max-w-lg">
                  Aapka account abhi active nahi hai. Courses, videos, signals aur tools access karne ke liye koi bhi plan subscribe karein.
                </p>
              </div>
            </div>
            <button type="button" onClick={() => navigate('/payment')}
              className="shrink-0 flex items-center gap-2 bg-amber-400 text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-amber-300 transition-colors cursor-pointer">
              <Star size={14}/> Subscribe Now
            </button>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <BookOpen size={16}/>,   label: 'Modules Completed', value: isPaid ? '1 / 8' : '—' },
            { icon: <TrendingUp size={16}/>, label: 'Active Signals',    value: isPaid ? '2'     : '—' },
            { icon: <Clock size={16}/>,      label: 'Hours Learned',     value: isPaid ? '12h'   : '—' },
            { icon: <Award size={16}/>,      label: 'Member Since',      value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'New' },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-4">
              <div className="text-white/40 mb-2">{s.icon}</div>
              <p className="text-white text-xl font-medium mb-0.5">{s.value}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left col — courses + tools */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Courses */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white/30 text-xs tracking-widest uppercase">Your Courses</p>
                <button type="button" onClick={() => navigate('/products/masterclass')}
                  className="text-white/40 hover:text-white text-xs transition-colors cursor-pointer">View all</button>
              </div>

              {/* Lock overlay for unpaid users */}
              {!isPaid && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Lock size={20} className="text-white/60"/>
                  </div>
                  <p className="text-white/70 text-sm font-medium">Subscribe to unlock courses</p>
                  <button type="button" onClick={() => navigate('/payment')}
                    className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2 rounded-full hover:bg-white/90 cursor-pointer transition-colors">
                    <Zap size={12}/> View Plans
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {courses.map((c) => (
                  <div key={c.title} className={`flex items-center gap-4 rounded-xl px-4 py-3.5 border transition-colors
                    ${c.status === 'locked' ? 'border-white/[0.04] bg-white/[0.02] opacity-50' : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05] cursor-pointer'}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                      ${c.status === 'completed' ? 'bg-emerald-500/20' : c.status === 'in-progress' ? 'bg-violet-500/20' : 'bg-white/[0.05]'}`}>
                      {c.status === 'locked'
                        ? <Lock size={14} className="text-white/30"/>
                        : <BookOpen size={14} strokeWidth={1.5} className={c.status === 'completed' ? 'text-emerald-400' : 'text-violet-400'}/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{c.title}</p>
                      <p className="text-white/40 text-xs">{c.subtitle} · {c.lessons} lessons</p>
                      {c.status !== 'locked' && (
                        <div className="mt-2 h-1 bg-white/[0.07] rounded-full overflow-hidden">
                          <div className="h-full bg-white/40 rounded-full transition-all" style={{ width: `${c.progress}%` }}/>
                        </div>
                      )}
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0
                      ${c.status === 'completed' ? 'border-emerald-500/30 text-emerald-400' :
                        c.status === 'in-progress' ? 'border-violet-500/30 text-violet-400' :
                        'border-white/10 text-white/30'}`}>
                      {c.status === 'completed' ? 'Done' : c.status === 'in-progress' ? 'Continue' : 'Locked'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white/30 text-xs tracking-widest uppercase">Your Tools</p>
                <button type="button" onClick={() => navigate('/products/indicators')}
                  className="text-white/40 hover:text-white text-xs transition-colors cursor-pointer">View all</button>
              </div>

              {/* Lock overlay for unpaid users */}
              {!isPaid && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Lock size={20} className="text-white/60"/>
                  </div>
                  <p className="text-white/70 text-sm font-medium">Subscribe to unlock tools</p>
                  <button type="button" onClick={() => navigate('/payment')}
                    className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2 rounded-full hover:bg-white/90 cursor-pointer transition-colors">
                    <Zap size={12}/> View Plans
                  </button>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                {tools.map((t) => (
                  <div key={t.name} className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors
                    ${t.available ? 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05] cursor-pointer' : 'border-white/[0.04] bg-white/[0.02] opacity-40'}`}>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center shrink-0">
                      <t.icon size={14} strokeWidth={1.5} className="text-white/60"/>
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">{t.name}</p>
                      <p className="text-white/30 text-[11px]">{t.type}</p>
                    </div>
                    {!t.available && <Lock size={12} className="text-white/20 ml-auto"/>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col — signals + profile */}
          <div className="flex flex-col gap-6">

            {/* Live signals */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-5">Trade Signals</p>

              {/* Lock overlay for unpaid users */}
              {!isPaid && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Lock size={20} className="text-white/60"/>
                  </div>
                  <p className="text-white/70 text-sm font-medium">Paid members only</p>
                  <button type="button" onClick={() => navigate('/payment')}
                    className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-5 py-2 rounded-full hover:bg-white/90 cursor-pointer transition-colors">
                    <Zap size={12}/> Subscribe
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {signals.map((s, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/[0.04] pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-sm font-medium">{s.pair}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
                          ${s.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {s.type}
                        </span>
                      </div>
                      <p className="text-white/30 text-[11px]">Entry {s.entry} · TP {s.tp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/30 text-[11px]">{s.time}</p>
                      <span className={`text-[10px] ${s.status === 'active' ? 'text-amber-400' : 'text-white/25'}`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile card */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Your Profile</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm font-medium">
                  {initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{user?.full_name || 'Nafa Member'}</p>
                  <p className="text-white/40 text-xs">{user?.email}</p>
                </div>
              </div>

              {/* Subscription Status */}
              <div className={`flex items-center gap-2 rounded-xl px-3 py-2 mb-4 ${
                isPaid
                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                  : 'bg-amber-500/10 border border-amber-500/20'
              }`}>
                {isPaid ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"/>
                    <span className="text-emerald-400 text-xs font-medium">Active Subscriber</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0"/>
                    <span className="text-amber-400 text-xs font-medium">Not Subscribed</span>
                    <button type="button" onClick={() => navigate('/payment')}
                      className="ml-auto text-amber-400 text-[11px] underline cursor-pointer">Subscribe</button>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { label: 'Phone',      value: user?.phone },
                  { label: 'City',       value: user?.city },
                  { label: 'Country',    value: user?.country },
                  { label: 'Experience', value: user?.trading_experience },
                  { label: 'Profession', value: user?.profession },
                ].filter(r => r.value).map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-white/30">{row.label}</span>
                    <span className="text-white/60">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Quick Links</p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: Users,     label: 'Join Community',   path: '/community' },
                  { icon: PhoneCall, label: 'Book Consulting',   path: '/consulting' },
                  { icon: Bot,       label: 'EA Bots',           path: '/products/eabots' },
                  { icon: User,      label: 'Edit Profile',      path: '/dashboard' },
                ].map((item) => (
                  <button key={item.label} type="button" onClick={() => navigate(item.path)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer text-left">
                    <item.icon size={14} strokeWidth={1.5}/>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
