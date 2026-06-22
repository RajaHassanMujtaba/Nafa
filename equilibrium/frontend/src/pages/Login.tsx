import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Infinity, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleLogin() {
    if (!email || !password) { setError('Please enter email and password'); return }
    setLoading(true); setError('')

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col">
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2 text-white font-medium text-base">
          <Infinity size={22} strokeWidth={1.5}/><span>Nafa</span>
        </Link>
        <p className="text-white/30 text-sm">
          New to Nafa?{' '}
          <Link to="/signup" className="text-white hover:underline">Create account</Link>
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-white text-3xl font-medium mb-2">Welcome back</h1>
            <p className="text-white/40 text-sm">Log in to your Nafa account</p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
            <div>
              <label className="block text-white/50 text-xs mb-1.5">Email Address</label>
              <input type="email" placeholder="ali@example.com" value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"/>
            </div>

            <div className="relative">
              <label className="block text-white/50 text-xs mb-1.5">Password</label>
              <input type={showPass ? 'text' : 'password'} placeholder="Your password" value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors pr-10"/>
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-[34px] text-white/30 hover:text-white/60 transition-colors">
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-400 shrink-0"/>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button type="button" onClick={handleLogin} disabled={loading}
              className="w-full bg-white text-black text-sm font-medium py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2">
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <p className="text-center text-white/25 text-xs">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white/50 hover:text-white transition-colors">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
