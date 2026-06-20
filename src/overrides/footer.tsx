import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const ghost =
  'inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#10286e]'

export async function FooterOverride() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#405a9d] bg-[#243d8f] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#dbe3ff]">Don&apos;t miss a dispatch</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#dbe3ff]">
              Headlines and media updates from the newsroom. Subscribe for alerts when new articles publish.
            </p>
            <Link href="/register" className={`${ghost} mt-8`}>
              Subscribe
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#dbe3ff]">Information</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/90">
                <li><Link href="/about" className="transition-colors hover:text-[#f5c425]">About</Link></li>
                <li><Link href="/updates" className="transition-colors hover:text-[#f5c425]">Archive</Link></li>
                <li><Link href="/privacy" className="transition-colors hover:text-[#f5c425]">Privacy</Link></li>
                <li><Link href="/terms" className="transition-colors hover:text-[#f5c425]">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#dbe3ff]">Distribution</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/90">
                <li><Link href="/updates" className="transition-colors hover:text-[#f5c425]">Latest updates</Link></li>
                <li><Link href="/search" className="transition-colors hover:text-[#f5c425]">Search articles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#dbe3ff]">Contact us</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/90">
                <li><Link href="/contact" className="transition-colors hover:text-[#f5c425]">Editorial desk</Link></li>
                <li><Link href="/status" className="transition-colors hover:text-[#f5c425]"></Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden border-t border-[#4b65a9] pt-10 lg:mt-24">
          <p className="whitespace-nowrap text-[clamp(2.5rem,11vw,7.5rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white">
            {SITE_CONFIG.name}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#dbe3ff] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>{SITE_CONFIG.domain}</span>
          <span>Media distribution · {year}</span>
          <span>Editorial quality</span>
        </div>
      </div>
    </footer>
  )
}

