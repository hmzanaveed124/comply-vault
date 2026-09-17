export const usPricingContent = {
  hero: {
    title: 'Less review work. One clear firm price.',
    description: 'Review what needs attention, record your decisions, and assemble source-linked evidence. Start with one firm and prove the value on your own records.',
  },
  features: [
    'Priority inbox for communications requiring review',
    'Findings linked to available source records',
    'Candidate Packs for exam-request preparation',
    'Missing-evidence flags and grounded answers',
    'CCO sign-off and recorded review decisions',
    'Evidence exports and audit trail',
  ],
  plans: [
    {
      name: 'Firm', price: '$199', unit: '/ firm / month',
      description: 'For an owner-CCO or a small compliance team reviewing one RIA.',
      note: 'One firm. Monthly billing. No annual commitment.',
      features: ['Up to 3 connected mailboxes', '5,000 new email messages per month', '10 hours of meeting processing per month', 'Up to 5 users, including your external consultant', 'Standard onboarding and email support'],
      cta: 'Discuss my firm', href: '/#cta',
    },
    {
      name: 'Partner', price: '$149', unit: '/ firm / month',
      description: 'For outsourced CCOs and compliance partners supporting multiple RIAs.',
      note: '3-firm minimum · $447/month total. Monthly billing.',
      features: ['Same review and evidence workflow for each firm', 'Same usage allowance for each firm', 'Separate firm workspaces', 'Standard onboarding for each firm', 'Start the pilot with just one firm'],
      cta: 'Discuss a partner pilot', href: '/#cta',
    },
  ],
  faqs: [
    { question: 'How does the paid pilot work?', answer: 'The pilot is $199 for 30 days and covers one firm with the Firm plan allowances. We agree the supported data sources and a review task before starting, help you connect or upload records, and measure review and evidence-assembly time against your baseline. There is no automatic conversion. Continue only when you agree to an ongoing plan. Existing agreed pilot terms are honoured.' },
    { question: 'What is included in standard onboarding?', answer: 'A guided setup session, connection of supported mailboxes, help with an initial record upload, and agreement on your first review workflow. Standard onboarding has no setup fee. Custom connectors, archive migrations, and large historical backfills are scoped and quoted separately before work starts.' },
    { question: 'What counts toward the usage allowance?', answer: 'Each firm includes up to 3 connected mailboxes, 5,000 newly processed email messages and 10 hours of meeting audio or video each month. Historical email imports count toward the message allowance unless separately scoped. Document uploads and archive imports are scoped before onboarding. Evidence exports and reviewer activity do not consume the email or meeting allowance. Unused monthly allowances do not roll over.' },
    { question: 'What if my firm needs more capacity?', answer: 'We agree additional capacity and pricing with you before processing beyond your allowance. There are no automatic overage charges. Larger mailbox counts, historical imports, and custom integrations require a separate quote.' },
    { question: 'Do SEC- and state-registered firms pay different prices?', answer: 'No. The same Firm price applies to both. Pricing depends on the scope and volume of records processed, rather than registration status or assets under management.' },
    { question: 'How does partner pricing work?', answer: 'Partner pricing is $149 per firm per month for a minimum of 3 firms, or $447 per month in total. Each firm receives its own allowance and workspace; allowances are not pooled. You can evaluate one firm through the $199 pilot before committing to three. Portfolio dashboards and custom archive connections are discussed separately and are not promised as part of the standard plan.' },
    { question: 'Do I need to replace my archive or notetaker?', answer: 'No. Start with supported connected mailboxes and uploaded records. We confirm compatibility with your existing systems before the pilot. ComplyVault supports review and evidence preparation; this subscription does not include a communications archive or replace your record-retention arrangements.' },
    { question: 'Can I cancel, and are taxes included?', answer: 'Ongoing plans are billed monthly in USD. You can cancel before the next renewal; access continues through the paid period. Export your evidence before access ends. Applicable taxes are additional. Pilot and subscription scope are confirmed in writing before payment.' },
  ],
}
