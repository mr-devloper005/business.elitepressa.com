import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LoginFormClient } from '@/overrides/login-form.client'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  return (
    <div className="min-h-screen bg-[#e9edf2] text-[#10286e]">
      <NavbarShell />
      <main className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-14 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[#c9d2e5] bg-[linear-gradient(180deg,#f6f9ff_0%,#e9edf2_100%)] p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6a7cae]">Member access</p>
            <span className="mt-3 block h-2 w-28 bg-[#f5c425]" />
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#10286e] sm:text-5xl">Sign in to your newsroom workspace</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3d4f7c]">
              Access your dashboard, manage releases, and track distribution performance from a single premium workspace.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                ['Secure workspace access', 'Your session is saved locally for quick re-entry.'],
                ['Live publishing controls', 'Open drafts, submissions, and updates instantly.'],
                ['Team-ready flow', 'Built for editors, communications teams, and partners.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[#c9d2e5] bg-white p-4">
                  <p className="text-sm font-semibold text-[#10286e]">{title}</p>
                  <p className="mt-1 text-sm text-[#5a6d9f]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <LoginFormClient />
        </section>
      </main>
      <Footer />
    </div>
  )
}
