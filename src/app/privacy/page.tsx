import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: '1. Information we collect',
    body: 'We may collect account details you submit (such as name and email), communication preferences, content you publish through the platform, and technical usage data needed to run, secure, and improve the service.',
  },
  {
    title: '2. How information is used',
    body: 'Your data is used to provide account access, publish and distribute content, personalize relevant experiences, monitor platform reliability, and communicate important product or policy updates.',
  },
  {
    title: '3. Cookies and local storage',
    body: 'We use browser storage and cookies for authentication state, saved preferences, and smoother navigation. You can clear local storage from your browser settings, though some features may be limited afterward.',
  },
  {
    title: '4. Sharing and disclosure',
    body: 'We do not sell personal data. Information may be shared with trusted service providers that help operate the platform, and when required by law, regulatory process, or to protect users and system integrity.',
  },
  {
    title: '5. Data retention',
    body: 'Data is retained only as long as needed for account functionality, legal obligations, dispute resolution, and abuse prevention. Retention periods may vary based on content type and applicable law.',
  },
  {
    title: '6. Your rights and choices',
    body: 'You may request access, correction, export, or deletion of your personal information, subject to applicable legal and operational constraints. Marketing communications can be managed via your preferences.',
  },
  {
    title: '7. Security practices',
    body: 'We apply reasonable technical and organizational safeguards to protect data against unauthorized access, alteration, and misuse. No internet system can be guaranteed 100% secure.',
  },
  {
    title: '8. Policy updates',
    body: 'This policy may be updated as the platform evolves. Material changes will be reflected on this page with an updated effective date.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and protects your information across newsroom, account, and publishing workflows.`}
      actions={<Link href="/contact">Contact us</Link>}
    >
      <div className="space-y-6">
        <section className="rounded-3xl border border-[#c9d2e5] bg-white p-6 shadow-[0_8px_25px_rgba(16,40,110,0.07)] sm:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b7dab]">Effective date · May 2026</p>
          <p className="mt-5 text-base leading-relaxed text-[#3d4f7c]">
            This Privacy Policy explains how we handle information when you use our website and services. By using the platform, you acknowledge the practices described below.
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
