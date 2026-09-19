'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Mail, MapPin, Linkedin } from 'lucide-react'

// X (formerly Twitter) icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
  const pathname = usePathname()
  const isUK = pathname?.startsWith('/uk') ?? false
  
  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: isUK ? '/uk/pricing' : '/pricing' },
        { label: 'Security', href: isUK ? '/uk#security' : '/#security' },
        { label: 'How It Works', href: isUK ? '/uk#how-it-works' : '/#how-it-works' },
      ],
    },
    solutions: {
      title: 'Solutions',
      links: [
        { label: isUK ? 'FCA Compliance Software' : 'RIA Compliance Software', href: isUK ? '/uk/fca-compliance-software' : '/ria-compliance-software' },
        { label: 'Sample Audit Pack', href: '/sample-audit-pack' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'Free RIA Stack Assessment', href: '/tools/ria-compliance-stack-assessment' },
        { label: 'Compliance Capacity Calculator', href: '/tools/compliance-capacity-calculator' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQ', href: isUK ? '/uk#faq' : '/#faq' },
        { label: 'Book a Demo', href: isUK ? '/uk#cta' : '/#cta' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Security', href: isUK ? '/uk#security' : '/#security' },
      ],
    },
  }
  
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Footer is always on dark background, so always use white logo
  const logoSrc = '/logo-white.svg'

  return (
    <footer className="bg-gray-900 dark:bg-[hsl(160_55%_3%)] text-gray-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-10 pb-14 border-b border-gray-800 dark:border-white/10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <a href={isUK ? "/uk" : "/"} className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 relative">
                <Image
                  src={logoSrc}
                  alt="Comply Vault Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold font-display text-white">
                Comply<span className="text-vault-green-400">Vault</span>
              </span>
            </a>
            <p className="text-gray-500 dark:text-gray-400 mb-7 max-w-xs leading-relaxed">
              Find what needs attention. Prove how it was handled. ComplyVault gives RIA compliance teams a source-linked supervisory layer across their existing systems.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 text-sm">
              <a href="mailto:contact@complyvault.co" className="flex items-center gap-3 hover:text-vault-green-400 transition-colors">
                <Mail className="w-4 h-4" />
                contact@complyvault.co
              </a>
              <a href="/" className="flex items-center gap-3 hover:text-vault-green-400 transition-colors">
                <MapPin className="w-4 h-4" />
                complyvault.co
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-5">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-vault-green-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} COMPLY VAULT LTD. Company No. 16889706. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/complyvault"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-gray-800 dark:bg-white/5 rounded-lg flex items-center justify-center hover:bg-vault-green-500 transition-colors border border-transparent hover:border-vault-green-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/complyvaultco"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-gray-800 dark:bg-white/5 rounded-lg flex items-center justify-center hover:bg-vault-green-500 transition-colors border border-transparent hover:border-vault-green-400"
              aria-label="X"
            >
              <XIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-4 text-sm">
            <span className="px-4 py-1.5 bg-gray-800 dark:bg-white/5 rounded-full text-gray-400 border border-gray-700 dark:border-white/10">
              Encrypted & Secure
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
