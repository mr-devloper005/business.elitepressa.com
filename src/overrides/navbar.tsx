'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

export const NAVBAR_OVERRIDE_ENABLED = true

const navItems = [
  { label: 'Newsroom', href: '/updates' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  const onHome = pathname === '/'
  const shellClass = onHome
    ? 'border-b border-white/10 bg-[#10286e]/90 text-white backdrop-blur-md'
    : 'border-b border-[#cad4ea] bg-[#f6f8fc]/95 text-[#10286e] backdrop-blur-md'
  const muted = onHome ? 'text-[#dbe3ff] hover:text-white' : 'text-[#4b5f98] hover:text-[#10286e]'

  return (
    <header className={cn('sticky top-0 z-50', shellClass)}>
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-14">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          <span className={cn('flex h-11 w-11 items-center justify-center rounded-full p-1 shadow-sm', onHome ? 'bg-white/95' : 'bg-white border border-[#cad4ea]')}>
            <img src="/favicon.png?v=20260423" alt="" width="36" height="36" className="h-8 w-8 object-contain" />
          </span>
          <div className="hidden sm:block">
            <p className={cn('text-xl font-semibold leading-none tracking-tight', onHome ? 'text-white' : 'text-[#10286e]')}>{SITE_CONFIG.name}</p>
            <p className={cn('mt-1 text-[10px] font-semibold uppercase tracking-[0.24em]', onHome ? 'text-[#dbe3ff]' : 'text-[#7083b2]')}>{SITE_CONFIG.tagline}</p>
          </div>
        </Link>

        <div className="hidden items-center justify-center gap-8 md:flex lg:gap-10">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn('text-sm font-semibold transition-colors', active ? (onHome ? 'text-white' : 'text-[#10286e]') : muted)}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/account" className={cn('hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold md:inline-flex', onHome ? 'bg-[#2f63d9] text-white hover:bg-[#3b6fe5]' : 'bg-[#1f4da8] text-white hover:bg-[#2a5bc0]')}>
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
              <button
                type="button"
                onClick={logout}
                className={cn('hidden px-3 py-2 text-sm font-semibold md:inline-flex', onHome ? 'text-white/95 hover:text-white' : 'text-[#1f4da8] hover:text-[#10286e]')}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={cn('hidden px-3 py-2 text-sm font-semibold md:inline-flex', onHome ? 'text-white/95 hover:text-white' : 'text-[#1f4da8] hover:text-[#10286e]')}>
                Sign In
              </Link>
              <Link
                href="/register"
                className={cn('hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold md:inline-flex', onHome ? 'bg-[#2f63d9] text-white hover:bg-[#3b6fe5]' : 'bg-[#1f4da8] text-white hover:bg-[#2a5bc0]')}
              >
                <UserRound className="h-4 w-4" />
                Sign Up
              </Link>
            </>
          )}
          <Link
            href="/search"
            className={cn('flex h-10 w-10 items-center justify-center rounded-full transition-colors', onHome ? 'text-white hover:bg-white/10' : 'text-[#1f4da8] hover:bg-[#dde6fb]')}
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px] stroke-[1.8]" />
          </Link>
          <button
            type="button"
            className={cn('flex h-10 w-10 items-center justify-center rounded-full md:hidden', onHome ? 'text-white hover:bg-white/10' : 'text-[#1f4da8] hover:bg-[#dde6fb]')}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className={cn('border-t px-5 py-4 md:hidden', onHome ? 'border-white/10 bg-[#10286e]' : 'border-[#cad4ea] bg-[#f6f8fc]')}>
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn('py-3 text-sm font-semibold', onHome ? 'text-white' : 'text-[#10286e]')}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link href="/account" className={cn('py-3 text-sm font-semibold', onHome ? 'text-white' : 'text-[#10286e]')} onClick={() => setOpen(false)}>
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className={cn('py-3 text-left text-sm font-semibold', onHome ? 'text-[#dbe3ff]' : 'text-[#1f4da8]')}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={cn('py-3 text-sm font-semibold', onHome ? 'text-white' : 'text-[#10286e]')} onClick={() => setOpen(false)}>
                  Sign In
                </Link>
                <Link href="/register" className={cn('py-3 text-sm font-semibold', onHome ? 'text-[#dbe3ff]' : 'text-[#1f4da8]')} onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

