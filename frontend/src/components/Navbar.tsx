import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ChevronDown, Infinity, Menu, X,
  TrendingUp, Bitcoin, BarChart2, Wheat, Globe,
  BookOpen, Activity, Bot, Users, PhoneCall,
} from 'lucide-react'

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

interface NavbarProps { transparent?: boolean }

export default function Navbar({ transparent = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => { setMenuOpen(false); setActiveDropdown(null) }, [location.pathname])

  function go(path: string) { navigate(path); setActiveDropdown(null) }

  const base = transparent
    ? 'absolute top-0 left-0 right-0 z-20'
    : 'sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/[0.06]'

  return (
    <nav ref={navRef} className={`${base} flex items-center justify-between px-5 sm:px-8 py-5`}>
      <button type="button" onClick={() => go('/')}
        className="flex items-center gap-2 text-white font-medium text-base shrink-0 cursor-pointer">
        <Infinity size={22} strokeWidth={1.5} />
        <span>Nafa</span>
      </button>

      <div className="liquid-glass hidden md:flex items-center gap-1 rounded-xl px-2 py-2">
        {navCategories.map((cat) => (
          <div key={cat.label} className="relative">
            <button type="button"
              onClick={() => cat.dropdown ? setActiveDropdown(p => p === cat.label ? null : cat.label) : go(cat.path!)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer
                ${location.pathname === (cat.path ?? '') ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'}`}>
              {cat.label}
              {cat.dropdown && (
                <ChevronDown size={13} className={`mt-px transition-transform duration-200 ${activeDropdown === cat.label ? 'rotate-180' : ''}`} />
              )}
            </button>
            {cat.dropdown && activeDropdown === cat.label && cat.items && (
              <div className="absolute top-full left-0 mt-2 w-52 liquid-glass rounded-xl p-1.5 z-50 shadow-xl">
                {cat.items.map((item) => (
                  <button key={item.label} type="button" onClick={() => go(item.path)}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer
                      ${location.pathname === item.path ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                    <item.icon size={15} strokeWidth={1.5} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button type="button" onClick={() => go('/login')}
          className="liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
          Log in
        </button>
        <button type="button" onClick={() => go('/products/masterclass')}
          className="bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
          Begin Now
        </button>
      </div>

      <button type="button" className="liquid-glass md:hidden text-white p-2 rounded-lg cursor-pointer"
        onClick={() => setMenuOpen(p => !p)}>
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {menuOpen && (
        <div className="absolute top-[72px] left-4 right-4 md:hidden liquid-glass rounded-2xl p-4 flex flex-col gap-1 max-h-[75vh] overflow-y-auto">
          {navCategories.map((cat) => (
            <div key={cat.label}>
              <button type="button"
                onClick={() => cat.dropdown ? setActiveDropdown(p => p === cat.label ? null : cat.label) : go(cat.path!)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer
                  ${location.pathname === (cat.path ?? '') ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'}`}>
                <span>{cat.label}</span>
                {cat.dropdown && <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === cat.label ? 'rotate-180' : ''}`} />}
              </button>
              {cat.dropdown && activeDropdown === cat.label && cat.items && (
                <div className="pl-4 flex flex-col gap-0.5 mb-1">
                  {cat.items.map((item) => (
                    <button key={item.label} type="button" onClick={() => go(item.path)}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                      <item.icon size={13} strokeWidth={1.5} />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-2 pt-3 border-t border-white/10">
            <button type="button" onClick={() => go('/login')}
              className="flex-1 liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full cursor-pointer">Log in</button>
            <button type="button" onClick={() => go('/products/masterclass')}
              className="flex-1 bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full cursor-pointer">Begin Now</button>
          </div>
        </div>
      )}
    </nav>
  )
}
