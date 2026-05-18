'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function LoginFormClient() {
  const router = useRouter()
  const { login, isLoading, isAuthenticated, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    const normalizedEmail = email.trim()
    await login(normalizedEmail, password)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'nexus-login-credentials',
        JSON.stringify({ email: normalizedEmail, password })
      )
    }
    router.push('/')
  }

  return (
    <div className="rounded-3xl border border-[#c9d2e5] bg-white p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6a7cae]">Welcome back</p>
        {user?.email ? <span className="text-xs text-[#6a7cae]">Last used: {user.email}</span> : null}
      </div>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <label className="text-sm font-semibold text-[#23468e]">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c8fbe]" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@company.com"
            className="h-12 w-full rounded-xl border border-[#b8c7e3] bg-[#fbfdff] pl-11 pr-4 text-sm text-[#10286e] outline-none transition focus:border-[#2f63d9]"
          />
        </div>

        <label className="text-sm font-semibold text-[#23468e]">Password</label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c8fbe]" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="h-12 w-full rounded-xl border border-[#b8c7e3] bg-[#fbfdff] pl-11 pr-4 text-sm text-[#10286e] outline-none transition focus:border-[#2f63d9]"
          />
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1f4da8] px-6 text-sm font-semibold text-white transition hover:bg-[#2f63d9] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#5a6d9f]">
        <Link href="/forgot-password" className="hover:text-[#1f4da8] hover:underline">Forgot password?</Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#1f4da8] hover:underline">
          Create account <ShieldCheck className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
