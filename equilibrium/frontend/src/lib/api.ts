/// <reference types="vite/client" />

const API_BASE = String(import.meta.env.VITE_API_URL || '/api')

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token')
}

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('auth_token', token)
  } else {
    localStorage.removeItem('auth_token')
  }
}

type ApiRequestOptions = Omit<RequestInit, 'body'> & { body?: Record<string, any> }

export async function apiRequest(path: string, options: ApiRequestOptions = {}): Promise<any> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const token = getAuthToken()
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  })

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.error || 'Request failed')
  }
  return data
}
