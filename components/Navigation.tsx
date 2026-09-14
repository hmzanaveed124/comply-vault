'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { DemoModal } from './DemoModal'

export function Navigation(): React.ReactElement {
  const pathname = usePathname()
  const isUK = pathname?.startsWith('/uk') ?? false
  const isHomepage = pathname === '/' || pathname === '/uk'
  
  // For anchor links, if not on homepage, link to homepage with anchor
  const getAnchorLink = (anchor: string): string => {
    if (isHomepage) return anchor
    if (isUK) return '/uk' + anchor
    return '/' + anchor
  }
  
  const navLinks = [
    { label: 'Solutions', href: isUK ? '/uk/fca-compliance-software' : '/ria-compliance-software' },
    { label: 'Features', href: '/features' },
    { label: 'Blog', href: '/blog' },
    { label: 'How It Works', href: getAnchorLink('#how-it-works') },
    { label: 'Security', href: getAnchorLink('#security') },
    { label: 'Pricing', href: isUK ? '/uk/pricing' : '/pricing' },
  ]
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use dark logo only when mounted and theme is dark
  const logoSrc = mounted && resolvedTheme === 'dark' ? '/logo-white.svg' : '/logo.svg'

  const openDemoModal = () => {
    setIsDemoModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-foreground/5 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={isUK ? "/uk" : "/"} className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative">
                <Image
                  src={logoSrc}
                  alt="Comply Vault Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold font-display text-foreground">
                Comply<span className="text-vault-green-500 dark:text-vault-green-400">Vault</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isHashLink = link.href.includes('#')
                const Component = isHashLink ? 'a' : Link

                const isActive =
                  !isHashLink &&
                  (pathname === link.href ||
                    (link.href === '/blog' && Boolean(pathname?.startsWith('/blog'))))

                return (
                  <Component
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'font-medium transition-colors relative group',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Component>
                )
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={openDemoModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-[0.98] px-5 py-2.5"
              >
                Book a Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              'md:hidden overflow-hidden transition-all duration-300',
              isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
            )}
          >
            <div className="bg-card rounded-2xl shadow-xl shadow-foreground/5 p-4 space-y-4 border border-border">
              {navLinks.map((link) => {
                const isHashLink = link.href.includes('#')
                const Component = isHashLink ? 'a' : Link

                return (
                  <Component
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-muted-foreground hover:text-primary font-medium transition-colors"
                  >
                    {link.label}
                  </Component>
                )
              })}
              <hr className="border-border" />
              <button
                onClick={openDemoModal}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-[0.98] px-6 py-3"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </>
  )
}
