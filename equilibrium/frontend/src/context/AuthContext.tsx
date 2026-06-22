import { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest, getAuthToken, setAuthToken } from '../lib/api'

export type UserProfile = {
  id: string
  full_name: string
  email: string
  phone: string
  country: string
  province: string
  city: string
  cnic: string
  trading_experience: string
  profession: string
  created_at: string
  is_paid: boolean
}

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: Record<string, string>) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  async function refreshProfile() {
    const token = getAuthToken()
    if (!token) return

    try {
      const result = await apiRequest('/profile')
      setUser(result.data)
    } catch {
      setAuthToken(null)
      setUser(null)
    }
  }

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      setLoading(false)
      return
    }

    apiRequest('/profile')
      .then((result) => setUser(result.data))
      .catch(() => {
        setAuthToken(null)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const result = await apiRequest('/login', {
      method: 'POST',
      body: { email, password },
    })
    setAuthToken(result.data.token)
    setUser(result.data.user)
  }

  async function signup(data: Record<string, string>) {
    const result = await apiRequest('/signup', {
      method: 'POST',
      body: data,
    })
    setAuthToken(result.data.token)
    setUser(result.data.user)
  }

  function logout() {
    setAuthToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
