import { PageShell } from '@/components/shared/page-shell'
import { AccountDetailsClient } from '@/components/account-details.client'

export default function AccountPage() {
  return (
    <PageShell
      eyebrow="Profile"
      title="Your account"
      description="View your logged-in details saved in local session and manage quick account actions."
    >
      <AccountDetailsClient />
    </PageShell>
  )
}
