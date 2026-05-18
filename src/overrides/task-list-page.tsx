import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArchiveSearchForm } from '@/components/shared/archive-search-form'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full post for the complete update.'
  return value.length > 220 ? value.slice(0, 217).trimEnd() + '...' : value
}

const ghost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-[#1f4da8] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1f4da8] transition-colors hover:bg-[#1f4da8] hover:text-white'

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getPostImage = (post: any) => {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => isValidImageUrl(item?.url))?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const contentImages = Array.isArray(content.images) ? content.images : []
  const image = contentImages.find((item) => isValidImageUrl(item as string))
  const logo = isValidImageUrl(content.logo as string) ? (content.logo as string) : ''
  return mediaUrl || image || logo || ''
}

export async function TaskListPageOverride({ category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 24, { fresh: true })
  const allCategories = CATEGORY_OPTIONS.map((item) => item.slug)
  const selectedCategory = category ? normalizeCategory(category) : 'all'
  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          return raw ? normalizeCategory(raw) === selectedCategory : false
        })
  const recent = filteredPosts.slice(0, 5)
  const postsWithImages = filteredPosts.filter((post) => Boolean(getPostImage(post)))
  const postsWithoutImages = filteredPosts.filter((post) => !getPostImage(post))

  return (
    <div className="min-h-screen bg-[#e9edf2] text-[#10286e]">
      <NavbarShell />
      <header className="border-b border-[#c8d3e6] bg-[linear-gradient(180deg,#f6f9ff_0%,#e9edf2_100%)] px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6477a8]">Archive</p>
        <span className="mt-2 block h-2 w-32 bg-[#f5c425]" />
        <h1 className="mt-4 max-w-3xl text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">All articles &amp; updates</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#3d4f7c]">Browse every published dispatch in chronological order. Select a headline to read the full piece.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/updates"
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${selectedCategory === 'all' ? 'bg-[#1f4da8] text-white' : 'border border-[#b9c7e3] bg-white text-[#1f4da8]'}`}
          >
            All
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/updates?category=${cat}`}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${selectedCategory === cat ? 'bg-[#1f4da8] text-white' : 'border border-[#b9c7e3] bg-white text-[#1f4da8]'}`}
            >
              {cat.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:px-14 lg:py-16">
        <div className="space-y-12">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6a7cae]">Featured Posts</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {postsWithImages.map((post) => {
                const image = getPostImage(post)
                return (
                  <article key={post.id} className="overflow-hidden rounded-3xl border border-[#c9d2e5] bg-white shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
                    <div className="relative h-48 w-full bg-[#eef3ff]">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6778a8]">{String((post.content as { category?: string })?.category || 'Update')}</p>
                      <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-[#10286e]">{post.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-[#3d4f7c]">{excerpt(post.summary)}</p>
                      <div className="mt-6">
                        <Link href={`/updates/${post.slug}`} className={ghost}>
                          Continue reading
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6a7cae]">More Posts</h2>
            <div className="mt-5 space-y-8">
              {postsWithoutImages.map((post) => (
                <article key={post.id} className="rounded-3xl border border-[#c9d2e5] bg-white p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6778a8]">{String((post.content as { category?: string })?.category || 'Update')}</p>
                  <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#10286e] sm:text-3xl">{post.title}</h3>
                  <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#6a7cae]">
                    <span>by {post.authorName || 'Editorial Desk'}</span>
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-[#3d4f7c]">{excerpt(post.summary)}</p>
                  <div className="mt-7">
                    <Link href={`/updates/${post.slug}`} className={ghost}>
                      Continue reading
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-8">
          <div className="rounded-3xl border border-[#c9d2e5] bg-white p-6 shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6a7cae]">Search</p>
            <ArchiveSearchForm />
          </div>
          <div className="rounded-3xl border border-[#c9d2e5] bg-white p-6 shadow-[0_8px_25px_rgba(16,40,110,0.07)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6a7cae]">Latest</p>
            <div className="mt-5 space-y-4">
              {recent.map((post) => (
                <Link key={post.id} href={`/updates/${post.slug}`} className="block border-b border-[#d6deec] pb-4 text-sm font-medium leading-snug text-[#23468e] last:border-0 last:pb-0 hover:text-[#1f4da8]">
                  {post.title}
                </Link>
              ))}
              {!recent.length ? <p className="text-sm text-[#6a7cae]">No posts found in this category.</p> : null}
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
