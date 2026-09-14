import { Button } from '@/components/Button'

type BlogCtaProps = {
  variant?: 'sidebar' | 'slab'
}

export function BlogCta({ variant = 'slab' }: BlogCtaProps): JSX.Element {
  if (variant === 'sidebar') {
    return (
      <aside className="rounded-2xl border border-vault-green-500/20 bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 p-6 lg:p-8 text-white lg:sticky lg:top-24">
        <p className="text-sm font-medium text-vault-green-300 mb-2">ComplyVault</p>
        <h2 className="text-xl font-bold font-display mb-3">
          Build compliance evidence before the examiner asks for it.
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-6">
          Seal meeting and email evidence into audit packs your CCO can defend.
        </p>
        <div className="flex flex-col gap-3">
          <Button href="/#cta" variant="primary" size="sm" className="!bg-white !text-vault-green-700 hover:!bg-vault-green-50 !shadow-none">
            Book a Demo
          </Button>
          <Button href="/sample-audit-pack" variant="outline" size="sm" className="!border-white/40 !text-white hover:!bg-white/10">
            See Sample Audit Pack
          </Button>
        </div>
      </aside>
    )
  }

  return (
    <section className="rounded-2xl bg-vault-dark px-6 py-10 sm:px-10 sm:py-12 text-white">
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">
          Build compliance evidence before the examiner asks for it.
        </h2>
        <p className="text-white/80 leading-relaxed mb-8 max-w-2xl">
          ComplyVault helps RIA and compliance teams reconstruct what happened, with sealed,
          examiner-ready audit packs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/#cta" variant="primary" size="md" className="!bg-white !text-vault-green-800 hover:!bg-vault-green-50 !shadow-none">
            Book a Demo
          </Button>
          <Button href="/sample-audit-pack" variant="outline" size="md" className="!border-white/40 !text-white hover:!bg-white/10">
            See Sample Audit Pack
          </Button>
        </div>
      </div>
    </section>
  )
}
