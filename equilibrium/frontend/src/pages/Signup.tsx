import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Infinity, Eye, EyeOff, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const COUNTRIES = ['Pakistan','United Arab Emirates','Saudi Arabia','United Kingdom','United States','Canada','Australia','Other']
const PROVINCES = {
  'United Arab Emirates': ['Dubai','Abu Dhabi','Sharjah','Ajman','Ras Al Khaimah','Fujairah','Umm Al Quwain'],
  default: ['N/A'],
}
const EXPERIENCE = ['Complete Beginner','Less than 1 Year','1–2 Years','3–5 Years','5+ Years','Professional Trader']
const PROFESSIONS = ['Student','Employed (Private)','Employed (Government)','Business Owner','Freelancer','Retired','Other']

export default function Signup() {
  const navigate = useNavigate()
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [step, setStep]               = useState(1) // 1 = account, 2 = personal, 3 = trading

  const [form, setForm] = useState({
    full_name: '', email: '', password: '', confirm_password: '',
    phone: '', country: 'Pakistan', province: '', city: '', cnic: '',
    trading_experience: '', profession: '',
  })

  function set(field: string, value: string) {
    setForm(p => ({ ...p, [field]: value }))
    if (field === 'country') setForm(p => ({ ...p, country: value, province: '' }))
    setError('')
  }

  function getProvinces() {
    return (PROVINCES as Record<string, string[]>)[form.country] || PROVINCES.default
  }

  function validateStep(s: number) {
    if (s === 1) {
      if (!form.full_name.trim()) return 'Full name is required'
      if (!form.email.trim()) return 'Email is required'
      if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email'
      if (form.password.length < 8) return 'Password must be at least 8 characters'
      if (form.password !== form.confirm_password) return 'Passwords do not match'
    }
    if (s === 2) {
      if (!form.phone.trim()) return 'Phone number is required'
      if (!form.country) return 'Country is required'
      if (!form.province) return 'Province / Emirate is required'
      if (!form.city.trim()) return 'City is required'
      if (form.country === 'Pakistan' && form.cnic.trim() && !/^\d{5}-\d{7}-\d$/.test(form.cnic))
        return 'CNIC format: 12345-1234567-1'
    }
    if (s === 3) {
      if (!form.trading_experience) return 'Please select your trading experience'
      if (!form.profession) return 'Please select your profession'
    }
    return ''
  }

  function nextStep() {
    const err = validateStep(step)
    if (err) { setError(err); return }
    setStep(p => p + 1)
  }

  const { signup } = useAuth()

  async function handleSubmit() {
    const err = validateStep(3)
    if (err) { setError(err); return }
    setLoading(true); setError('')
    try {
      await signup({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        country: form.country,
        province: form.province,
        city: form.city,
        cnic: form.cnic,
        trading_experience: form.trading_experience,
        profession: form.profession,
      })
      navigate('/payment')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const steps = ['Account', 'Personal Info', 'Trading Profile']

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 text-white font-medium text-base">
          <Infinity size={22} strokeWidth={1.5}/><span>Nafa</span>
        </Link>
        <p className="text-white/30 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline">Log in</Link>
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-white text-3xl font-medium mb-2">Create your account</h1>
            <p className="text-white/40 text-sm">Join Nafa and start trading professionally</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all
                  ${step === i + 1 ? 'bg-white text-black font-medium' :
                    step > i + 1 ? 'bg-white/10 text-white/70' : 'bg-white/[0.05] text-white/30'}`}>
                  {step > i + 1
                    ? <CheckCircle size={12} className="text-emerald-400"/>
                    : <span className="w-4 text-center">{i + 1}</span>}
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`w-6 h-px ${step > i + 1 ? 'bg-white/30' : 'bg-white/10'}`}/>}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8">

            {/* STEP 1 — Account */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Account Details</p>
                <InputField label="Full Name" placeholder="Muhammad Ali" value={form.full_name} onChange={v => set('full_name', v)}/>
                <InputField label="Email Address" type="email" placeholder="ali@example.com" value={form.email} onChange={v => set('email', v)}/>
                <div className="relative">
                  <InputField label="Password" type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={v => set('password', v)}/>
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    className="absolute right-3 top-[34px] text-white/30 hover:text-white/60 transition-colors">
                    {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                <div className="relative">
                  <InputField label="Confirm Password" type={showConfirm ? 'text' : 'password'} placeholder="Repeat password" value={form.confirm_password} onChange={v => set('confirm_password', v)}/>
                  <button type="button" onClick={() => setShowConfirm(p => !p)}
                    className="absolute right-3 top-[34px] text-white/30 hover:text-white/60 transition-colors">
                    {showConfirm ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Personal Info */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Personal Information</p>
                <InputField label="Phone Number" placeholder="+92 300 1234567" value={form.phone} onChange={v => set('phone', v)}/>
                <SelectField label="Country" value={form.country} options={COUNTRIES} onChange={v => set('country', v)}/>
                <SelectField label="Province / State / Emirate" value={form.province} options={getProvinces()} onChange={v => set('province', v)} placeholder="Select province"/>
                <InputField label="City" placeholder="Lahore" value={form.city} onChange={v => set('city', v)}/>
                <div>
                  <InputField label="CNIC (optional — Pakistan only)" placeholder="12345-1234567-1" value={form.cnic} onChange={v => set('cnic', v)}/>
                  <p className="text-white/25 text-xs mt-1 ml-1">Format: 12345-1234567-1</p>
                </div>
              </div>
            )}

            {/* STEP 3 — Trading Profile */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Trading Profile</p>
                <SelectField label="Trading Experience" value={form.trading_experience} options={EXPERIENCE} onChange={v => set('trading_experience', v)} placeholder="Select experience level"/>
                <SelectField label="Profession" value={form.profession} options={PROFESSIONS} onChange={v => set('profession', v)} placeholder="Select profession"/>

                <div className="mt-2 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-white/50 text-xs leading-relaxed">
                    By creating an account you agree to Nafa's Terms of Service and Privacy Policy. Your data is stored securely and never shared with third parties.
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-400 shrink-0"/>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button type="button" onClick={() => setStep(p => p - 1)}
                  className="flex-1 border border-white/10 text-white/60 text-sm font-medium py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
                  Continue <ChevronRight size={15}/>
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Creating account...' : 'Create Account'}
                  {!loading && <ChevronRight size={15}/>}
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-white/25 text-xs mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-white/50 hover:text-white transition-colors">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function InputField({ label, type = 'text', placeholder, value, onChange }: {
  label: string; type?: string; placeholder?: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-white/50 text-xs mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"/>
    </div>
  )
}

function SelectField({ label, value, options, onChange, placeholder }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-white/50 text-xs mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors cursor-pointer appearance-none"
        style={{ color: value ? 'white' : 'rgba(255,255,255,0.2)' }}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(o => <option key={o} value={o} style={{ background: '#111', color: 'white' }}>{o}</option>)}
      </select>
    </div>
  )
}
