import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Infinity, Menu, X, TrendingUp, Bitcoin, BarChart2,
  Wheat, Globe, BookOpen, Activity, Bot, Users, PhoneCall,
  ChevronDown, ChevronRight, Star,
} from 'lucide-react'

import { AuthProvider } from './context/AuthContext'
import Signup        from './pages/Signup'
import Login         from './pages/Login'
import Dashboard     from './pages/Dashboard'
import Forex         from './pages/Forex'
import Crypto        from './pages/Crypto'
import Indices       from './pages/Indices'
import Commodities   from './pages/Commodities'
import PSX           from './pages/PSX'
import WorldMarkets  from './pages/WorldMarkets'
import MasterClass   from './pages/MasterClass'
import Indicators    from './pages/Indicators'
import EABots        from './pages/EABots'
import Community     from './pages/Community'
import Consulting    from './pages/Consulting'
import Payment       from './pages/Payment'

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4'

const navCategories = [
  { label: 'Home', path: '/', dropdown: false },
  {
    label: 'Markets', dropdown: true,
    items: [
      { label: 'Forex',         path: '/markets/forex',       icon: TrendingUp },
      { label: 'Crypto',        path: '/markets/crypto',      icon: Bitcoin    },
      { label: 'Indices',       path: '/markets/indices',     icon: BarChart2  },
      { label: 'Commodities',   path: '/markets/commodities', icon: Wheat      },
      { label: 'PSX',           path: '/markets/psx',         icon: Globe      },
      { label: 'World Markets', path: '/markets/world',       icon: Globe      },
    ],
  },
  {
    label: 'Products', dropdown: true,
    items: [
      { label: 'Master Class', path: '/products/masterclass', icon: BookOpen },
      { label: 'Indicators',   path: '/products/indicators',  icon: Activity  },
      { label: 'EA Bots',      path: '/products/eabots',      icon: Bot       },
    ],
  },
  {
    label: 'Community', dropdown: true,
    items: [
      { label: 'Private Community',   path: '/community',  icon: Users     },
      { label: 'Consulting Sessions', path: '/consulting', icon: PhoneCall },
    ],
  },
]

const features = [
  {
    category: 'EDUCATION', badge: 'Most Popular',
    title: 'Master Class Trading Course',
    description: 'A complete A–Z trading program designed for beginners to advanced traders. Learn price action, risk management, psychology and live trade walkthroughs.',
    items: ['Beginner to Advanced', 'Price Action', 'Risk Management', 'Live Walkthroughs'],
    icons: [BookOpen, BookOpen, BookOpen, BookOpen],
    paths: ['/products/masterclass','/products/masterclass','/products/masterclass','/products/masterclass'],
    cta: 'View Curriculum', ctaPath: '/products/masterclass',
    accent: 'from-violet-500/20 to-purple-500/10',
  },
  {
    category: 'TOOLS', badge: 'Exclusive',
    title: 'Custom Indicators & EA Bots',
    description: 'Proprietary indicators that eliminate noise and pinpoint high-probability entries. Fully automated EA bots with verified backtest results.',
    items: ['Signal Indicators', 'Trend Filters', 'Automated EA Bots', 'Backtest Reports'],
    icons: [Activity, Activity, Bot, Bot],
    paths: ['/products/indicators','/products/indicators','/products/eabots','/products/eabots'],
    cta: 'See the Tools', ctaPath: '/products/indicators',
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    category: 'COMMUNITY & CONSULTING', badge: 'Members Only',
    title: 'Private Community + 1-on-1 Consulting',
    description: 'Join a private members-only group with daily trade ideas, live sessions and peer support. Book personal consulting sessions for direct mentorship.',
    items: ['Private Telegram/Discord', 'Daily Trade Ideas', '1-on-1 Sessions', 'Portfolio Review'],
    icons: [Users, Users, PhoneCall, PhoneCall],
    paths: ['/community','/community','/consulting','/consulting'],
    cta: 'Join Now', ctaPath: '/community',
    accent: 'from-amber-500/20 to-orange-500/10',
  },
]

function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function go(path: string) { navigate(path); setActiveDropdown(null); setMenuOpen(false) }

  return (
    <nav ref={navRef} className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5">
      <button type="button" onClick={() => go('/')} className="flex items-center gap-2 text-white font-medium text-base shrink-0 cursor-pointer">
        <Infinity size={22} strokeWidth={1.5}/><span>Nafa</span>
      </button>

      <div className="liquid-glass hidden md:flex items-center gap-1 rounded-xl px-2 py-2">
        {navCategories.map((cat) => (
          <div key={cat.label} className="relative">
            <button type="button"
              onClick={() => cat.dropdown ? setActiveDropdown(p => p === cat.label ? null : cat.label) : go(cat.path!)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer text-white/70 hover:text-white first:bg-white/15 first:text-white">
              {cat.label}
              {cat.dropdown && <ChevronDown size={13} className={`mt-px transition-transform duration-200 ${activeDropdown === cat.label ? 'rotate-180' : ''}`}/>}
            </button>
            {cat.dropdown && activeDropdown === cat.label && cat.items && (
              <div className="absolute top-full left-0 mt-2 w-52 liquid-glass rounded-xl p-1.5 z-50 shadow-xl">
                {cat.items.map((item) => (
                  <button key={item.label} type="button" onClick={() => go(item.path)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                    <item.icon size={15} strokeWidth={1.5}/>{item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button type="button" onClick={() => go('/login')} className="liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer">Log in</button>
        <button type="button" onClick={() => go('/payment')} className="bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer">Begin Now</button>
      </div>

      <button type="button" className="liquid-glass md:hidden text-white p-2 rounded-lg cursor-pointer" onClick={() => setMenuOpen(p => !p)}>
        {menuOpen ? <X size={18}/> : <Menu size={18}/>}
      </button>

      {menuOpen && (
        <div className="absolute top-[72px] left-4 right-4 md:hidden liquid-glass rounded-2xl p-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
          {navCategories.map((cat) => (
            <div key={cat.label}>
              <button type="button"
                onClick={() => cat.dropdown ? setActiveDropdown(p => p === cat.label ? null : cat.label) : go(cat.path!)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                <span>{cat.label}</span>
                {cat.dropdown && <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === cat.label ? 'rotate-180' : ''}`}/>}
              </button>
              {cat.dropdown && activeDropdown === cat.label && cat.items && (
                <div className="pl-4 flex flex-col gap-0.5 mb-1">
                  {cat.items.map((item) => (
                    <button key={item.label} type="button" onClick={() => go(item.path)}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                      <item.icon size={13} strokeWidth={1.5}/>{item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-2 pt-3 border-t border-white/10">
            <button type="button" onClick={() => go('/login')} className="flex-1 liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full cursor-pointer">Log in</button>
            <button type="button" onClick={() => go('/payment')} className="flex-1 bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full cursor-pointer">Begin Now</button>
          </div>
        </div>
      )}
    </nav>
  )
}

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
      <div className="relative w-full h-screen overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src={BG_VIDEO}/>
        <div className="absolute inset-0 bg-black/30"/>
        <HomeNavbar/>
        <div className="absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-10 sm:pb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Star size={13} className="text-amber-400 fill-amber-400"/>
            <span className="text-white/60 text-xs tracking-widest uppercase">Professional Trading Education</span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-4">
            Trade Smarter,<br/>Profit Consistently
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-7 max-w-md">
            Master Forex, Crypto, Indices, Commodities and more with professional-grade courses, exclusive indicators, automated EA bots and a thriving private community.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => navigate('/products/masterclass')}
              className="bg-white text-black text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
              Start Today
            </button>
            <button type="button" onClick={() => navigate('/markets/forex')}
              className="liquid-glass text-white text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
              Explore Markets
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#080808] px-5 sm:px-10 lg:px-20 py-24 flex flex-col gap-0">
        <div className="mb-16 max-w-xl">
          <p className="text-white/30 text-xs tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="text-white text-3xl sm:text-4xl font-medium leading-tight tracking-tight">
            Everything you need to trade professionally
          </h2>
        </div>

        {features.map((f, i) => (
          <div key={f.category}
            className={`flex flex-col lg:flex-row items-start gap-10 lg:gap-20 py-14 border-t border-white/[0.06] ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] tracking-widest text-white/30 uppercase">{f.category}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">{f.badge}</span>
              </div>
              <h3 className="text-white text-2xl sm:text-3xl font-medium leading-snug tracking-tight mb-4">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-lg">{f.description}</p>
              <button type="button" onClick={() => navigate(f.ctaPath)}
                className="group flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
                {f.cta}<ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform"/>
              </button>
            </div>

            <div className="flex-1 w-full">
              <div className={`rounded-2xl bg-gradient-to-br ${f.accent} border border-white/[0.06] p-6 grid grid-cols-2 gap-3`}>
                {f.items.map((item, idx) => {
                  const Icon = f.icons[idx]
                  return (
                    <button key={item} type="button" onClick={() => navigate(f.paths[idx])}
                      className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/[0.06] rounded-xl px-4 py-3.5 cursor-pointer w-full text-left">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center shrink-0">
                        <Icon size={15} strokeWidth={1.5} className="text-white/70"/>
                      </div>
                      <span className="text-white/70 text-sm font-medium">{item}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-medium mb-1">Ready to start trading professionally?</h3>
            <p className="text-white/40 text-sm">Join thousands of traders already using Nafa.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button type="button" onClick={() => navigate('/consulting')}
              className="liquid-glass text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
              Book a Consultation
            </button>
            <button type="button" onClick={() => navigate('/products/masterclass')}
              className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/"                        element={<HomePage/>}/>
          <Route path="/signup"                  element={<Signup/>}/>
          <Route path="/login"                   element={<Login/>}/>
          <Route path="/dashboard"               element={<Dashboard/>}/>
          <Route path="/markets/forex"           element={<Forex/>}/>
          <Route path="/markets/crypto"          element={<Crypto/>}/>
          <Route path="/markets/indices"         element={<Indices/>}/>
          <Route path="/markets/commodities"     element={<Commodities/>}/>
          <Route path="/markets/psx"             element={<PSX/>}/>
          <Route path="/markets/world"           element={<WorldMarkets/>}/>
          <Route path="/products/masterclass"    element={<MasterClass/>}/>
          <Route path="/products/indicators"     element={<Indicators/>}/>
          <Route path="/products/eabots"         element={<EABots/>}/>
          <Route path="/community"               element={<Community/>}/>
          <Route path="/consulting"              element={<Consulting/>}/>
          <Route path="/payment"                 element={<Payment/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
