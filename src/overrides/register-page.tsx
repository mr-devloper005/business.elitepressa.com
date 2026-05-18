import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { RegisterFormClient } from '@/overrides/register-form.client'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  return (
    <div className="min-h-screen bg-[#e9edf2] text-[#10286e]">
      <NavbarShell />
      <main className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-14 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-[#c9d2e5] bg-[linear-gradient(180deg,#f6f9ff_0%,#e9edf2_100%)] p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6a7cae]">Get started</p>
            <span className="mt-3 block h-2 w-28 bg-[#f5c425]" />
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#10286e] sm:text-5xl">Create your account in minutes</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3d4f7c]">
              Publish releases, manage listings, and collaborate with your team through a clean, high-trust interface designed for modern media distribution.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                ['Fast onboarding', 'Instant account setup with locally persisted session.'],
                ['Unified dashboard', 'Articles, updates, and communication in one place.'],
                ['Ready for teams', 'Built for communication leads, founders, and agencies.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-[#c9d2e5] bg-white p-4">
                  <p className="text-sm font-semibold text-[#10286e]">{title}</p>
                  <p className="mt-1 text-sm text-[#5a6d9f]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <RegisterFormClient />
        </section>
      </main>
      <Footer />
    </div>
  )
}
