import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation, Footer } from '@/components';
import { Button } from '@/components/Button';
import {
  ArrowRight,
  CheckCircle2,
  FileStack,
  Link2,
  Settings2,
  SlidersHorizontal,
  UserRoundCheck,
} from 'lucide-react';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title:
    'Configurable Compliance Framework for RIA Meeting Documentation | ComplyVault',
  description:
    'ComplyVault helps compliance teams define what should be captured from adviser-client meetings, including recommendations, disclosures, risks, conflicts, decisions and follow-ups, with evidence links and human review.',
  keywords: [
    'RIA compliance framework',
    'meeting documentation',
    'compliance review workflow',
    'audit pack configuration',
    'evidence-linked compliance notes',
  ],
  authors: [{ name: 'Comply Vault' }],
  alternates: {
    canonical: `${SITE_URL}/features/configurable-compliance-framework`,
    languages: {
      'en-US': `${SITE_URL}/features/configurable-compliance-framework`,
      'x-default': `${SITE_URL}/features/configurable-compliance-framework`,
    },
  },
  openGraph: {
    title:
      'Configurable Compliance Framework for RIA Meeting Documentation | ComplyVault',
    description:
      'ComplyVault helps compliance teams define what should be captured from adviser-client meetings, with evidence links and human review.',
    url: `${SITE_URL}/features/configurable-compliance-framework`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Comply Vault',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Configurable Compliance Framework for RIA Meeting Documentation | ComplyVault',
    description:
      'Define what meetings should capture. AI drafts structured output with transcript evidence for human review.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const configurationRows = [
  {
    item: 'Meeting types',
    example:
      'Annual review, onboarding, portfolio review, rollover discussion, retirement planning',
  },
  {
    item: 'Disclosure categories',
    example:
      'Fees, conflicts, risks, limitations, product-specific disclosures',
  },
  {
    item: 'Firm-specific rules',
    example:
      'If a rollover is discussed, flag rationale, alternatives considered and fee comparison',
  },
  {
    item: 'Output templates',
    example: 'Internal CCO review pack, client-ready PDF, STP-style audit pack',
  },
  {
    item: 'Review workflow',
    example: 'Adviser draft, compliance review, CCO final sign-off',
  },
  {
    item: 'Risk thresholds',
    example: 'Flag only high-confidence gaps, or flag more broadly for review',
  },
  {
    item: 'Jurisdiction',
    example: 'SEC/state RIA workflow first; confirm any secondary-market scope',
  },
  {
    item: 'Retention and export format',
    example: 'PDF, CSV, TXT, ZIP and internal evidence log',
  },
] as const;

const rolloverChecklist = [
  'Client objective',
  'Alternatives considered',
  'Fee or cost discussion',
  'Risk discussion',
  'Recommendation rationale',
  'Agreed follow-ups',
  'Evidence of client understanding',
] as const;

export default function ConfigurableComplianceFrameworkPage(): JSX.Element {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Configurable Compliance Framework',
            description: metadata.description,
            url: `${SITE_URL}/features/configurable-compliance-framework`,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Comply Vault',
              url: SITE_URL,
            },
          }),
        }}
      />

      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] pt-28 pb-16 lg:pb-24 overflow-hidden noise-texture">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-vault-green-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Configurable Compliance Framework</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-8 text-foreground">
              Built around your compliance framework,{' '}
              <span className="text-gradient">with source-linked supervisory evidence</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              ComplyVault helps compliance teams define what should be captured
              from adviser-client meetings. The AI prepares a structured first
              draft, links key items back to transcript evidence and timestamps,
              and flags possible gaps for human review.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                href="/sample-audit-pack"
                size="lg"
                className="group"
                eventName="sample_audit_pack_click"
                eventParams={{ location: 'configurable_framework_hero' }}
              >
                View Sample Audit Pack
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                eventName="book_demo_click"
                eventParams={{
                  location: 'configurable_framework_hero_walkthrough',
                }}
              >
                Book a 15-Minute Walkthrough
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 space-y-20 lg:space-y-28">
        {/* Section 1 */}
        <section className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-6">
              The review workflow is structured. The compliance framework is
              configurable.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              ComplyVault follows a consistent workflow: transcript in,
              structured audit pack out. What changes from firm to firm is the
              review framework: what should be flagged, how evidence should be
              categorised, what counts as a possible gap, and how the final
              audit pack should be structured.
            </p>
          </div>
          <aside
            className="rounded-2xl border border-vault-green-500/25 bg-vault-green-500/5 dark:bg-vault-green-500/10 p-8 text-left shadow-sm"
            aria-label="Key point about configuration"
          >
            <div className="flex gap-4">
              <Settings2 className="w-8 h-8 text-vault-green-500 flex-shrink-0 mt-1" />
              <p className="text-foreground leading-relaxed">
                The configurable part is not the AI making up rules. It is the
                compliance framework the AI works against.
              </p>
            </div>
          </aside>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-center text-foreground mb-12">
            What can be configured?
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card dark:bg-[hsl(160_35%_10%)] shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 dark:bg-white/5">
                  <th
                    scope="col"
                    className="py-4 pl-6 pr-4 font-semibold text-foreground"
                  >
                    Area
                  </th>
                  <th
                    scope="col"
                    className="py-4 pl-4 pr-6 font-semibold text-foreground"
                  >
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody>
                {configurationRows.map((row) => (
                  <tr
                    key={row.item}
                    className="border-b border-border last:border-0 hover:bg-muted/30 dark:hover:bg-white/[0.03] transition-colors"
                  >
                    <th
                      scope="row"
                      className="py-5 pl-6 pr-4 align-top font-medium text-foreground w-[220px]"
                    >
                      {row.item}
                    </th>
                    <td className="py-5 pl-4 pr-6 align-top text-muted-foreground">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-6">
            Example: Rollover discussion
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            If a meeting includes a rollover discussion, ComplyVault can be
            configured to look for the evidence points your compliance team
            expects to see.
          </p>

          <ul className="space-y-4 mb-10">
            {rolloverChecklist.map((label) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded-xl border border-border bg-card dark:bg-[hsl(160_35%_10%)] px-5 py-4"
              >
                <CheckCircle2 className="w-6 h-6 text-vault-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-medium">{label}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-border bg-muted/30 dark:bg-white/5 px-8 py-6 text-muted-foreground leading-relaxed">
            If the transcript contains supporting evidence, ComplyVault links it
            to the relevant section with timestamps. If something appears weak
            or missing, it is flagged for human review.
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
              ComplyVault flags evidence. It does not certify compliance.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ComplyVault does not decide whether a disclosure was legally
              sufficient. It identifies candidate disclosures, possible gaps and
              supporting transcript evidence. The CCO or compliance reviewer
              remains responsible for review, judgement and final sign-off.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Evidence-linked',
                description:
                  'Every important item is linked back to transcript snippets and timestamps.',
                Icon: Link2,
              },
              {
                title: 'Human-reviewed',
                description:
                  'AI output remains draft-only until reviewed, edited and finalised by an authorised reviewer.',
                Icon: UserRoundCheck,
              },
              {
                title: 'Audit-ready',
                description:
                  'Finalised packs preserve the review trail, evidence links and documentation history.',
                Icon: FileStack,
              },
            ].map(({ title, description, Icon }) => (
              <div
                key={title}
                className="bg-card dark:bg-[hsl(160_35%_10%)] rounded-2xl p-8 border border-border dark:border-white/10 flex flex-col"
              >
                <div className="w-12 h-12 bg-vault-green-500/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-vault-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-6">
            Why configurability matters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Different firms have different policies, products, client types and
            review expectations. A generic meeting summary is not enough for
            compliance documentation. ComplyVault helps firms apply a repeatable
            documentation standard across meetings, advisers and client files,
            while still allowing the compliance team to define what matters.
          </p>
        </section>

        {/* Final CTA */}
        <section
          id="cta"
          className="scroll-mt-28 max-w-4xl mx-auto text-center rounded-3xl border border-vault-green-500/25 bg-gradient-to-br from-vault-green-500/10 to-vault-coral-500/10 dark:from-vault-green-500/20 dark:to-vault-coral-500/20 p-10 sm:p-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-6">
            See how your review framework could become an audit pack
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Review a sample output and see how disclosures, risks,
            recommendations and follow-ups are linked back to transcript
            evidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/sample-audit-pack"
              size="lg"
              className="group"
              eventName="sample_audit_pack_click"
              eventParams={{ location: 'configurable_framework_footer' }}
            >
              View Sample Audit Pack
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              eventName="book_demo_click"
              eventParams={{
                location: 'configurable_framework_footer_walkthrough',
              }}
            >
              Book a 15-Minute Walkthrough
            </Button>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Explore other capabilities on the{' '}
            <Link
              href="/features"
              className="text-vault-green-600 dark:text-vault-green-400 underline-offset-4 hover:underline font-medium"
            >
              features overview
            </Link>{' '}
            or the{' '}
            <Link
              href="/ria-compliance-software"
              className="text-vault-green-600 dark:text-vault-green-400 underline-offset-4 hover:underline font-medium"
            >
              RIA compliance software
            </Link>{' '}
            page.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
