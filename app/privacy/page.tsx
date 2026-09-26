import { Metadata } from 'next'
import { Shield, Lock, Eye, Server, Clock, Mail } from 'lucide-react'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | Comply Vault',
  description: 'Learn how Comply Vault protects your data and respects your privacy.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
}

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Account Information',
        text: 'When you create an account, we collect your name, email address, company name, and role within your organization.',
      },
      {
        subtitle: 'Meeting Recordings',
        text: 'You may upload meeting recordings for processing. These recordings are used solely to generate compliance documentation and are stored securely.',
      },
      {
        subtitle: 'Usage Data',
        text: 'We collect information about how you use our service, including features accessed, time spent, and actions taken. This helps us improve the product.',
      },
      {
        subtitle: 'Free tools (Stack Assessment)',
        text: 'If you use the RIA Compliance Stack Assessment, we store anonymous assessment answers, progress, results, and first-party attribution (landing path, referrer, and UTM parameters when present) so we can measure completion and improve the tool. Work email, firm name, and role are collected only if you optionally request a detailed evidence review. We do not require an account or phone number to use the assessment. Assessment answers and contact details are not sent to third-party advertising or visitor-identification tools as part of this feature; site-wide analytics tools already present on ComplyVault may still receive aggregate page and event signals (for example, that an assessment was started or completed), without assessment answer content or your email address.',
      },
    ],
  },
  {
    icon: Lock,
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Service Delivery',
        text: 'We use your data to provide, maintain, and improve our compliance documentation services.',
      },
      {
        subtitle: 'Communication',
        text: 'We may send you service-related emails, product updates, and marketing communications (which you can opt out of). If you request a detailed evidence review, we use your work email to discuss the scope and price of that review and may follow up about relevant ComplyVault capabilities. Submitting the request does not authorize access to your records.',
      },
      {
        subtitle: 'Security & Compliance',
        text: 'We use your data to maintain security, detect fraud, and comply with legal obligations.',
      },
    ],
  },
  {
    icon: Server,
    title: 'Data Storage & Security',
    content: [
      {
        subtitle: 'Encryption',
        text: 'All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption.',
      },
      {
        subtitle: 'US-Based Storage',
        text: 'Your data is stored on secure servers located in the United States.',
      },
      {
        subtitle: 'Access Controls',
        text: 'We implement strict role-based access controls. Only authorized personnel can access your data, and all access is logged. Optional assessment lead details are stored separately from anonymous funnel analytics and are not exposed through public APIs.',
      },
    ],
  },
  {
    icon: Clock,
    title: 'Data Retention',
    content: [
      {
        subtitle: 'Retention Period',
        text: 'We retain your data for as long as your account is active or as needed to provide services. Meeting records are retained per your workspace settings (default 6 years for SEC compliance). Anonymous assessment analytics and optional review requests are retained as needed for sales follow-up and product improvement, and can be deleted on request where legally permitted.',
      },
      {
        subtitle: 'Deletion Requests',
        text: 'You can request deletion of your data at any time. We will process deletion requests within 30 days, subject to legal retention requirements.',
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-vault-green-900 via-vault-green-800 to-vault-green-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-vault-green-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80">
            Your privacy matters. Here's how we protect it.
          </p>
          <p className="text-sm text-white/60 mt-4">
            Last updated: January 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <p className="text-muted-foreground text-lg leading-relaxed">
            At COMPLY VAULT LTD (Company No. 16889706), we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our compliance documentation platform. 
            We are committed to protecting the confidentiality of your data, especially given the sensitive 
            nature of financial compliance records.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-vault-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground pt-2">{section.title}</h2>
              </div>
              <div className="space-y-6 pl-16">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="font-semibold text-foreground mb-2">{item.subtitle}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use trusted third-party services to provide our platform:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Transcription:</strong> For converting audio to text</li>
              <li><strong>AI Processing:</strong> For extracting compliance-relevant information</li>
              <li><strong>Cloud Storage:</strong> For secure file storage</li>
              <li><strong>Payment Processing:</strong> For handling subscriptions</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All third-party providers are carefully vetted and bound by data processing agreements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage 
              you to review this Privacy Policy periodically.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-vault-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-vault-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Questions?</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <a 
                  href="mailto:privacy@complyvault.co" 
                  className="text-vault-green-500 hover:text-vault-green-400 font-medium"
                >
                  privacy@complyvault.co
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
