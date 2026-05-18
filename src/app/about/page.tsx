import Link from 'next/link'
import { Building2, Globe2, ShieldCheck, TrendingUp } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Releases distributed', value: '12K+' },
  { label: 'Media touchpoints', value: '1.8K+' },
  { label: 'Avg. editorial SLA', value: '24h' },
  { label: 'Client satisfaction', value: '98%' },
]

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Credibility by default',
    description:
      'Every submission passes through quality checks for clarity, compliance, and publication readiness before distribution.',
  },
  {
    icon: TrendingUp,
    title: 'Outcome-focused distribution',
    description:
      'Our workflows are built to maximize visibility, improve pickup potential, and keep your announcements business-relevant.',
  },
  {
    icon: Globe2,
    title: 'Built for modern communication teams',
    description:
      'From startups to enterprise teams, we provide a reliable release channel that works across sectors and regions.',
  },
  {
    icon: Building2,
    title: 'Platform + editorial mindset',
    description:
      'You get both: structured distribution infrastructure and a content-first perspective that helps stories land better.',
  },
]

const timeline = [
  {
    year: '2019',
    title: 'Foundation and first network build',
    description: 'We launched our first release workflows and established regional media relationships.',
  },
  {
    year: '2021',
    title: 'Expanded client operations',
    description: 'Introduced multi-category distribution and faster editorial turnarounds for launch-heavy teams.',
  },
  {
    year: '2024',
    title: 'Performance-led newsroom model',
    description: 'Rolled out richer tracking and insights to connect distribution quality with communication outcomes.',
  },
  {
    year: 'Today',
    title: 'Trusted growth partner',
    description: 'Helping organizations publish with confidence, consistency, and measurable impact.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="A trusted media distribution partner for modern brands"
      description={`${SITE_CONFIG.name} helps organizations publish announcements that are clear, credible, and built for real media visibility.`}
      actions={<Link href="/contact">Talk to our team</Link>}
    >
      <div className="space-y-10">
        <section className="rounded-3xl border border-[#c9d2e5] bg-[linear-gradient(180deg,#f6f9ff_0%,#e9edf2_100%)] p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)] sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#10286e] sm:text-4xl">Who we are</h2>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#3d4f7c]">
            {SITE_CONFIG.name} was built to solve a common communication gap: many announcements are important, but few are distributed with the structure and consistency needed to earn meaningful media attention. We combine platform discipline with editorial thinking so every release is easier to publish, easier to trust, and easier to act on.
          </p>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#3d4f7c]">
            Our team supports brands, agencies, and communication leaders with dependable release workflows that prioritize clarity, quality, and speed without sacrificing credibility.
          </p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <article key={item.label} className="rounded-3xl border border-[#c9d2e5] bg-white p-6 shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
              <p className="text-4xl font-bold tracking-tight text-[#10286e]">{item.value}</p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-[#6a7cae]">{item.label}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-[#c9d2e5] bg-white p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)] sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#10286e] sm:text-4xl">What makes us different</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <article key={pillar.title} className="rounded-2xl border border-[#d6deec] bg-[#f8fbff] p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e8efff] text-[#1f4da8]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-[#10286e]">{pillar.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-[#4b5f95]">{pillar.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-[#c9d2e5] bg-white p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)] sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#10286e] sm:text-4xl">Our growth story</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {timeline.map((item) => (
              <article key={item.year + item.title} className="rounded-2xl border border-[#d6deec] bg-[#f8fbff] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f4da8]">{item.year}</p>
                <h3 className="mt-2 text-xl font-semibold text-[#10286e]">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-[#4b5f95]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#c9d2e5] bg-[#243d8f] p-8 text-white shadow-[0_8px_25px_rgba(16,40,110,0.16)] sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s build your next release strategy</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#dbe3ff]">
            Whether you&apos;re preparing a product launch, investor update, or strategic announcement, our team can help you distribute with confidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#2f63d9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3b6fe5]">
              Contact editorial
            </Link>
            <Link href="/register" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#10286e]">
              Create account
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
