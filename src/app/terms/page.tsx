import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: '1. Acceptance of terms',
    body: 'By accessing or using this platform, you agree to these Terms of Service and applicable laws. If you do not agree, please discontinue use of the website and services.',
  },
  {
    title: '2. Account responsibilities',
    body: 'You are responsible for maintaining the confidentiality of your account credentials and all activity under your account. Notify us promptly of any unauthorized access or security concerns.',
  },
  {
    title: '3. Content standards',
    body: 'You agree not to publish unlawful, deceptive, infringing, malicious, or abusive content. We may review, reject, or remove submissions that violate policies or compromise platform trust.',
  },
  {
    title: '4. Intellectual property',
    body: 'Unless otherwise stated, platform materials and editorial systems are owned by the publisher or licensors. You retain rights to your submissions while granting required publication and distribution permissions.',
  },
  {
    title: '5. Platform availability',
    body: 'We strive for reliable service but do not guarantee uninterrupted operation. Maintenance, updates, or external outages may impact availability from time to time.',
  },
  {
    title: '6. Prohibited conduct',
    body: 'You may not attempt unauthorized access, reverse engineering, automated scraping beyond permitted scope, spam campaigns, malware distribution, or misuse of publication workflows.',
  },
  {
    title: '7. Limitation of liability',
    body: 'To the maximum extent permitted by law, the platform is provided on an “as is” basis. We are not liable for indirect, incidental, or consequential losses arising from service use.',
  },
  {
    title: '8. Changes to terms',
    body: 'We may revise these terms periodically. Continued use after updates constitutes acceptance of revised terms. The effective date will be updated on this page.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`Rules and responsibilities for using ${SITE_CONFIG.name}, including account access, publishing standards, and service usage.`}
      actions={<Link href="/privacy">Privacy Policy</Link>}
    >
      <div className="space-y-6">
        <section className="rounded-3xl border border-[#c9d2e5] bg-white p-6 shadow-[0_8px_25px_rgba(16,40,110,0.07)] sm:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b7dab]">Effective date · May 2026</p>
          <p className="mt-5 text-base leading-relaxed text-[#3d4f7c]">
            These Terms govern your use of our platform, including browsing, account creation, content submission, and communication services.
          </p>
        </section>

        <section className="rounded-3xl border border-[#c9d2e5] bg-white p-6 shadow-[0_8px_25px_rgba(16,40,110,0.07)] sm:p-10">
          <div className="space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="border-b border-[#d6deec] pb-8 last:border-0 last:pb-0">
                <h2 className="text-lg font-semibold text-[#10286e]">{section.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-[#3d4f7c]">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
