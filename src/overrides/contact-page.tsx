import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Editorial desk"
      description="For corrections, announcement requests, syndication, or publishing enquiries, use the channels below. Contributors may also reply through their author account."
      actions={
        <>
          <Link href="/updates">Archive</Link>
          <Link href="/">Home</Link>
        </>
      }
    >
    

      <div className="mt-12 max-w-2xl border-t border-black/10 pt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b6560]">Response time</p>
        <p className="mt-3 text-sm leading-relaxed text-[#4a4540]">
          We aim to acknowledge editorial mail within two business days. Urgent corrections are prioritized same-day when flagged in
          the subject line.
        </p>
      </div>
    </PageShell>
  )
}
