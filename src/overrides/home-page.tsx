import Link from 'next/link'
import { ArrowRight, MoveUpRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { normalizeCategory } from '@/lib/categories'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const fmtDate = (value?: string | null) => {
  const d = value ? new Date(value) : new Date()
  return d.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })
}

function excerpt(text?: string | null, max = 145) {
  const value = (text || '').trim()
  if (!value) return 'Read the full release for details and distribution notes.'
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}...` : value
}

function postImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const image = images.find((item) => typeof item === 'string' && item)
  return mediaUrl || image || ''
}

function hasPostImage(post: any) {
  return Boolean(postImage(post))
}

const CONTACT_SECTION_IMAGE =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80'

const services = [
  {
    title: 'Insights and Analytics',
    description: 'Track pick-up, reach, and sentiment with practical performance views across key outlets.',
    href: '/contact',
  },
  {
    title: 'Optimized Press Reach',
    description: 'Improve visibility with editorial-ready formatting and a stronger publication pathway.',
    href: '/register',
  },
  {
    title: 'Press Release Distribution',
    description: 'Distribute announcements to journalists, business desks, and verified media contacts.',
    href: '/updates',
  },
  {
    title: 'Investor Relations',
    description: 'Support investor-focused communication with consistency, speed, and compliance awareness.',
    href: '/contact',
  },
]

const clientNames = ['WNS', 'PHILIPS', 'MOTOROLA', 'HITACHI', 'EXICOM', 'OGILVY']

const testimonials = [
  {
    quote: 'Business Elitepressa is highly credible and consistent. Their media distribution support adds authenticity to our communications.',
    author: 'Arneeta Vasudeva',
    role: 'VP, Ogilvy',
  },
  {
    quote: 'Working with the team has been smooth and professional. They are responsive, dependable, and delivery-focused.',
    author: 'Animesh Rola',
    role: 'Senior Marketing Manager, SHRM India',
  },
]

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 18, { fresh: true, allowMockFallback: false })

  const heroPost = posts[0]
  const newsLead = posts[1] || posts[0]
  const featureLeft = posts[2] || posts[0]
  const featureRight = posts[3] || posts[1] || posts[0]
  const topCards = posts.slice(4, 8)
  const categories = Array.from(
    new Set(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          return raw ? normalizeCategory(raw) : ''
        })
        .filter(Boolean)
    )
  ).slice(0, 5)

  return (
    <div className="min-h-screen bg-[#e9edf2] text-[#0f1f63]">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#2a3f9a_0%,#1b2a77_45%,#16215e_100%)] text-white">
          <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(circle_at_15%_30%,#ffffff33_0,transparent_35%),radial-gradient(circle_at_80%_65%,#ffffff22_0,transparent_45%)]" />
          <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 lg:px-14 lg:pt-24">
            <div className="mx-auto max-w-5xl text-center">
              <span className="mx-auto block h-2 w-36 rounded-full bg-[#f5c425]" />
              <h1 className="mt-8 text-balance text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[5rem]">
                Your Trusted Source for Business News
              </h1>
              <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-[#d8e1ff] sm:text-xl">
                {SITE_CONFIG.name} helps teams publish announcements with clarity and confidence through trusted media distribution channels.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/register" className="group inline-flex items-center gap-3 rounded-full bg-[#2f63d9] px-7 py-3 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#3b6fe5]">
                  Submit a press release
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5c425] text-[#0f1f63]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href="/about" className="group inline-flex items-center gap-3 rounded-full border border-[#d8e1ff] bg-white px-7 py-3 text-lg font-semibold text-[#1f4da8] transition hover:-translate-y-0.5 hover:bg-[#f4f7ff]">
                  Learn more
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5c425] text-[#0f1f63]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <span className="block h-2 w-40 bg-[#f5c425]" />
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#10286e]">News Releases</h2>
            </div>
            <Link href="/updates" className="group inline-flex items-center gap-3 rounded-full border border-[#163084] px-6 py-3 text-2xl font-semibold text-[#2056b1] transition hover:bg-white">
              <span className="text-lg">See all news</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5c425] text-[#0f1f63]"><ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
          {newsLead ? (
            <Link href={`/updates/${newsLead.slug}`} className="mt-6 block rounded-3xl bg-white p-8 shadow-[0_10px_40px_rgba(15,31,99,0.08)] transition hover:-translate-y-1">
              <h3 className="text-3xl font-bold leading-tight text-[#10286e]">{newsLead.title}</h3>
            </Link>
          ) : null}
        </section>

        <section className="bg-[#dfe4eb] py-16">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <span className="block h-2 w-40 bg-[#f5c425]" />
            <h2 className="mt-4 text-5xl font-bold tracking-tight text-[#10286e]">Featured News</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
              {featureLeft ? (
                <Link href={`/updates/${featureLeft.slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-[0_10px_35px_rgba(16,40,110,0.08)] transition hover:-translate-y-1">
                  {hasPostImage(featureLeft) ? (
                    <div className="relative h-[340px] sm:h-[420px]">
                      <ContentImage src={postImage(featureLeft)} alt={featureLeft.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold leading-tight text-[#10286e]">{featureLeft.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#49567f]">{excerpt(featureLeft.summary, 180)}</p>
                  </div>
                </Link>
              ) : null}
              
            </div>
          </div>
        </section>

        <section className="bg-[#243d8f] py-16 text-white">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="block h-2 w-32 bg-[#f5c425]" />
                <h2 className="mt-4 text-5xl font-bold tracking-tight">Our Services</h2>
                <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#d7e0ff]">
                  We empower brands to craft high-impact releases that inform, influence, and engage. If you have news to share, we help it reach the right desks.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {services.map((service) => (
                  <Link key={service.title} href={service.href} className="group rounded-3xl bg-[#f3f5fb] p-7 text-[#10286e] transition hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(6,18,58,0.28)]">
                    <h3 className="text-3xl font-bold leading-tight">{service.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-[#44527a]">{service.description}</p>
                    <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f5c425] text-[#0f1f63] transition group-hover:translate-x-1">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14">
          <span className="block h-2 w-44 bg-[#f5c425]" />
          <h2 className="mt-4 text-5xl font-bold tracking-tight text-[#10286e]">Our Key Clients</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {clientNames.map((name) => (
              <div key={name} className="rounded-2xl bg-white px-4 py-8 text-center text-3xl font-black tracking-wide text-[#10286e] shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
                {name}
              </div>
            ))}
          </div>
        </section>

      

        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14">
          <span className="block h-2 w-52 bg-[#f5c425]" />
          <h2 className="mt-4 text-5xl font-bold tracking-tight text-[#10286e]">Let&apos;s Get Your Story Heard</h2>
          <p className="mt-5 max-w-4xl text-xl leading-relaxed text-[#2f3f70]">
            Want tomorrow&apos;s media coverage? Register with us to distribute your press release across top-tier agencies and publications.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_10px_35px_rgba(16,40,110,0.08)]">
              <div className="relative h-[520px]">
                <ContentImage src={CONTACT_SECTION_IMAGE} alt="Editorial support" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(16,40,110,0.08)] sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input disabled className="h-14 rounded-2xl border border-[#b9c7e3] bg-[#f5f8ff] px-5 text-lg text-[#10286e] opacity-80" placeholder="Name *" />
                <input disabled className="h-14 rounded-2xl border border-[#b9c7e3] bg-[#f5f8ff] px-5 text-lg text-[#10286e] opacity-80" placeholder="Contact *" />
              </div>
              <input disabled className="h-14 w-full rounded-2xl border border-[#b9c7e3] bg-[#f5f8ff] px-5 text-lg text-[#10286e] opacity-80" placeholder="Email *" />
              <div className="grid gap-4 sm:grid-cols-2">
                <input disabled className="h-14 rounded-2xl border border-[#b9c7e3] bg-[#f5f8ff] px-5 text-lg text-[#10286e] opacity-80" placeholder="Company *" />
                <input disabled className="h-14 rounded-2xl border border-[#b9c7e3] bg-[#f5f8ff] px-5 text-lg text-[#10286e] opacity-80" placeholder="Region" />
              </div>
              <textarea disabled className="min-h-[180px] w-full rounded-2xl border border-[#b9c7e3] bg-[#f5f8ff] px-5 py-4 text-lg text-[#10286e] opacity-80" placeholder="Message *" />
              <div className="pt-2">
                <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full border border-[#1f4da8] px-7 py-3 text-2xl font-semibold text-[#1f4da8] transition hover:bg-[#f4f7ff]">
                  <span className="text-lg">Get in touch</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5c425] text-[#0f1f63] transition group-hover:translate-x-1">
                    <MoveUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {categories.length ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link key={cat} href={`/updates?category=${cat}`} className="rounded-full border border-[#b9c7e3] bg-white px-4 py-2 text-sm font-medium text-[#2f3f70] transition hover:bg-[#f5f8ff]">
                  {cat.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  )
}
