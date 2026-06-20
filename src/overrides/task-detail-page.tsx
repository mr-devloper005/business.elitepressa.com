import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Link2, Mail, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { SITE_CONFIG } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getContent = (post: SitePost) => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as Record<string, unknown>
}

const getImageUrls = (post: SitePost, content: Record<string, unknown>) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => typeof url === 'string' && isValidImageUrl(url))
    : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  if (isValidImageUrl(content.logo as string)) return [content.logo as string]
  return [] as string[]
}

const getCategoryLabel = (post: SitePost, content: Record<string, unknown>) => {
  const raw =
    (typeof content.category === 'string' && content.category.trim()) ||
    (Array.isArray(post.tags) ? post.tags.find((tag) => typeof tag === 'string' && tag !== 'mediaDistribution') : '') ||
    ''
  if (!raw || typeof raw !== 'string') return 'Press releases'
  const normalized = normalizeCategory(raw)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || raw.trim()
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const shortText = (value?: string | null, max = 180) => {
  const text = stripHtml(value)
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}...` : text
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const related = (await fetchTaskPosts('mediaDistribution', 8, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 4)
  const relatedWithImages = related.filter((item) => {
    const itemContent = getContent(item)
    return getImageUrls(item, itemContent).length > 0
  })
  const relatedWithoutImages = related.filter((item) => {
    const itemContent = getContent(item)
    return getImageUrls(item, itemContent).length === 0
  })

  const content = getContent(post)
  const rawBody =
    (typeof content.body === 'string' && content.body.trim()) ||
    (typeof content.description === 'string' && content.description.trim()) ||
    post.summary ||
    ''
  const html = formatRichHtml(rawBody, '')
  const images = getImageUrls(post, content)
  const hero = images[0]
  const archivePath = SITE_CONFIG.taskViews.mediaDistribution || '/updates'
  const categoryLabel = getCategoryLabel(post, content)
  const categorySlug = normalizeCategory(categoryLabel)
  const pageUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${buildPostUrl('mediaDistribution', post.slug)}`
  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(pageUrl)
  const brandName =
    (typeof content.brandName === 'string' && content.brandName) ||
    (typeof content.companyName === 'string' && content.companyName) ||
    post.authorName ||
    post.title
  const summaryText = shortText(post.summary || rawBody, 280) || 'Detailed release summary will appear here once published.'
  const similarNews = related.filter((item) => {
    const itemContent = getContent(item)
    return getCategoryLabel(item, itemContent) === categoryLabel
  })

  return (
    <div className="min-h-screen bg-[#e9edf2] text-[#10286e]">
      <NavbarShell />

      <article className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 lg:px-12 lg:pt-12">
        <nav className="text-xs font-medium text-[#6a7cae]">
          <Link href="/" className="hover:text-[#1f4da8]">Home</Link>
          <span className="mx-2 opacity-40">/</span>
          <Link href={archivePath} className="hover:text-[#1f4da8]">Press releases</Link>
          <span className="mx-2 opacity-40">/</span>
          <Link href={`${archivePath}?category=${categorySlug}`} className="hover:text-[#1f4da8]">{categoryLabel}</Link>
        </nav>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_470px]">
          <div className="min-w-0 rounded-3xl border border-[#c9d2e5] bg-white p-8 shadow-[0_8px_25px_rgba(16,40,110,0.07)] lg:p-10">
            <span className="block h-2 w-28 bg-[#f5c425]" />
            <h1 className="mt-5 text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-[#10286e] sm:text-4xl lg:text-[2.35rem]">{post.title}</h1>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c9d2e5] bg-white text-[#23468e] transition hover:border-[#1f4da8] hover:bg-[#edf3ff]" aria-label="Share on X"><Twitter className="h-4 w-4" /></a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c9d2e5] bg-white text-[#23468e] transition hover:border-[#1f4da8] hover:bg-[#edf3ff]" aria-label="Share on LinkedIn"><Linkedin className="h-4 w-4" /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c9d2e5] bg-white text-[#23468e] transition hover:border-[#1f4da8] hover:bg-[#edf3ff]" aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></a>
              <a href={`mailto:?subject=${shareText}&body=${shareUrl}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c9d2e5] bg-white text-[#23468e] transition hover:border-[#1f4da8] hover:bg-[#edf3ff]" aria-label="Email this release"><Mail className="h-4 w-4" /></a>
              <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#c9d2e5] px-3 py-2 text-xs text-[#6a7cae]"><Link2 className="h-3.5 w-3.5" />{pageUrl.replace(/^https?:\/\//, '')}</span>
            </div>

            {hero ? (
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] border border-[#c9d2e5] bg-[#f1f5ff] shadow-sm">
                <ContentImage src={hero} alt={post.title} fill className="object-cover" priority />
              </div>
            ) : null}

            {summaryText ? (
              <p className="mt-6 text-base leading-relaxed text-[#3d4f7c]">{summaryText}</p>
            ) : null}

            <RichContent html={html} className="article-content mt-8 max-w-none text-[1.05rem] leading-[1.8] text-[#2f4475]" />
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-[1.25rem] border border-[#c9d2e5] bg-white p-6 shadow-sm">
              <div>
                {images[0] ? (
                  <div className="relative h-28 w-44 overflow-hidden rounded-xl border border-[#d6deec] bg-[#f8fbff]">
                    <ContentImage src={images[0]} alt={brandName} fill className="object-contain" />
                  </div>
                ) : null}
                <h3 className="mt-4 text-lg font-semibold text-[#10286e]">News Summary</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d4f7c]">{summaryText}</p>
              </div>
            </div>

            {relatedWithImages.length ? (
              <div className="rounded-[1.25rem] border border-[#c9d2e5] bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold tracking-tight text-[#10286e]">More News</p>
                <div className="mt-4 space-y-4">
                  {relatedWithImages.map((item) => {
                    const itemContent = getContent(item)
                    const itemImages = getImageUrls(item, itemContent)
                    return (
                      <Link key={item.id} href={buildPostUrl('mediaDistribution', item.slug)} className="block overflow-hidden rounded-2xl border border-[#d6deec] bg-[#f8fbff] hover:bg-[#eef4ff]">
                        <div className="relative h-32 w-full">
                          <ContentImage src={itemImages[0]} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold leading-snug text-[#23468e]">{item.title}</p>
                          <p className="mt-2 text-xs leading-relaxed text-[#5f72a4]">{shortText(item.summary || (itemContent.description as string), 120)}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {relatedWithoutImages.length ? (
              <div className="rounded-[1.25rem] border border-[#c9d2e5] bg-white p-6 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6a7cae]">More News</p>
                <ul className="mt-4 space-y-4">
                  {relatedWithoutImages.map((item) => (
                    <li key={item.id}>
                      <Link href={buildPostUrl('mediaDistribution', item.slug)} className="block text-sm font-semibold leading-snug text-[#23468e] hover:text-[#1f4da8]">{item.title}</Link>
                      <p className="mt-1 text-xs leading-relaxed text-[#5f72a4]">{shortText(item.summary, 120)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {similarNews.length ? (
              <div className="rounded-[1.25rem] border border-[#c9d2e5] bg-white p-6 shadow-sm">
                <p className="text-3xl font-semibold tracking-tight text-[#10286e]">Similar News</p>
                <ul className="mt-4 space-y-4">
                  {similarNews.slice(0, 3).map((item) => (
                    <li key={`similar-${item.id}`}>
                      <Link href={buildPostUrl('mediaDistribution', item.slug)} className="block text-base font-semibold leading-snug text-[#23468e] hover:text-[#1f4da8]">
                        {item.title}
                      </Link>
                      <p className="mt-1 text-xs leading-relaxed text-[#5f72a4]">{shortText(item.summary, 130)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  )
}
