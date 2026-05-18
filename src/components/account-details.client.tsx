'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export function AccountDetailsClient() {
  const { user, isAuthenticated, logout } = useAuth()

  const savedCredentials =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('nexus-login-credentials')
      : null
  const parsedCredentials = savedCredentials ? JSON.parse(savedCredentials) : null

  if (!isAuthenticated || !user) {
    return (
      <div className="rounded-3xl border border-[#c9d2e5] bg-white p-8 text-[#10286e] shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
        <p className="text-lg font-semibold">You are not logged in.</p>
        <Link href="/login" className="mt-4 inline-flex rounded-full bg-[#1f4da8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2f63d9]">
          Go to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-[#c9d2e5] bg-white p-8 text-[#10286e] shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6a7cae]">Account profile</p>
      <span className="mt-3 block h-2 w-28 bg-[#f5c425]" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#d3dced] bg-[#f8fbff] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a7cae]">Name</p>
          <p className="mt-2 text-lg font-semibold text-[#10286e]">{user.name}</p>
        </div>
        <div className="rounded-2xl border border-[#d3dced] bg-[#f8fbff] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a7cae]">Email</p>
          <p className="mt-2 text-lg font-semibold text-[#10286e]">{user.email}</p>
        </div>
        <div className="rounded-2xl border border-[#d3dced] bg-[#f8fbff] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a7cae]">User ID</p>
          <p className="mt-2 text-sm font-medium text-[#23468e]">{user.id}</p>
        </div>
        <div className="rounded-2xl border border-[#d3dced] bg-[#f8fbff] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a7cae]">Joined</p>
          <p className="mt-2 text-sm font-medium text-[#23468e]">{user.joinedDate}</p>
        </div>
      </div>

      {parsedCredentials?.email ? (
        <div className="mt-5 rounded-2xl border border-[#d3dced] bg-[#f8fbff] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a7cae]">Saved local credentials</p>
          <p className="mt-2 text-sm text-[#23468e]"><span className="font-semibold">Email:</span> {parsedCredentials.email}</p>
          <p className="mt-1 text-sm text-[#23468e]"><span className="font-semibold">Password:</span> {parsedCredentials.password}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={logout}
          className="inline-flex rounded-full border border-[#1f4da8] px-5 py-2.5 text-sm font-semibold text-[#1f4da8] hover:bg-[#edf3ff]"
        >
          Sign out
        </button>
        <Link href="/" className="inline-flex rounded-full bg-[#1f4da8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2f63d9]">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
