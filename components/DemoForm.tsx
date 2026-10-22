'use client'

import { useState, useCallback } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { ArrowRight, CheckCircle2, Loader2, Calendar, Users, Mail, Building2, User, ShieldCheck } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  firmSize: string
  message: string
}

const firmSizes = [
  { value: '', label: 'Select firm size' },
  { value: '1-5', label: '1-5 advisors' },
  { value: '6-15', label: '6-15 advisors' },
  { value: '16-50', label: '16-50 advisors' },
  { value: '50+', label: '50+ advisors' },
]

// Cloudflare Turnstile Site Key
// TODO: Replace with your production site key from https://dash.cloudflare.com/turnstile
// Using test key for development - always passes: 1x00000000000000000000AA
// For production, create a site at Cloudflare Turnstile dashboard
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

export function DemoForm({ description = 'See how ComplyVault can transform your compliance workflow' }: { description?: string }) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    firmSize: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  // Handle captcha success
  const onCaptchaSuccess = useCallback((token: string) => {
    setCaptchaToken(token)
    setError('')
  }, [])

  // Handle captcha error
  const onCaptchaError = useCallback(() => {
    setError('Captcha verification failed. Please try again.')
    setCaptchaToken(null)
  }, [])

  // Handle captcha expiry
  const onCaptchaExpiry = useCallback(() => {
    setCaptchaToken(null)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Basic validation
    if (!formData.firstName || !formData.email || !formData.company || !formData.firmSize) {
      setError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    // Captcha validation
    if (!captchaToken) {
      setError('Please complete the captcha verification')
      setIsSubmitting(false)
      return
    }

    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xnjjoely', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          firmSize: formData.firmSize,
          message: formData.message,
          _subject: `Demo Request from ${formData.firstName} at ${formData.company}`,
          'cf-turnstile-response': captchaToken,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <div className="w-16 h-16 bg-vault-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
        <p className="text-white/80 mb-6">
          We've received your demo request. Our team will reach out within 24 hours to schedule a personalized walkthrough.
        </p>
        <div className="flex items-center justify-center gap-2 text-vault-coral-300 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Expect to hear from us soon</span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Book a Demo</h3>
        <p className="text-white/70">{description}</p>
      </div>

      <div className="space-y-5">
        {/* Name Row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-2">
              First Name <span className="text-vault-coral-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-vault-green-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white/90 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-vault-green-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
            Work Email <span className="text-vault-coral-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@yourfirm.com"
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-vault-green-400 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-2">
            Firm Name <span className="text-vault-coral-400">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Wealth Advisors"
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-vault-green-400 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Firm Size */}
        <div>
          <label htmlFor="firmSize" className="block text-sm font-medium text-white/90 mb-2">
            Firm Size <span className="text-vault-coral-400">*</span>
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <select
              id="firmSize"
              name="firmSize"
              value={formData.firmSize}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-vault-green-400 focus:border-transparent transition-all appearance-none cursor-pointer"
              required
            >
              {firmSizes.map(size => (
                <option key={size.value} value={size.value} className="bg-vault-green-900 text-white">
                  {size.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
            Anything specific you'd like to see? <span className="text-white/50">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your compliance challenges..."
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-vault-green-400 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Cloudflare Turnstile Captcha */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Verification <span className="text-vault-coral-400">*</span>
          </label>
          <div className="flex flex-col items-center gap-3">
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={onCaptchaSuccess}
              onError={onCaptchaError}
              onExpire={onCaptchaExpiry}
              options={{
                theme: 'dark',
                size: 'normal',
              }}
            />
            {captchaToken && (
              <div className="flex items-center gap-2 text-vault-green-400 text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !captchaToken}
          className="w-full flex items-center justify-center gap-2 bg-white text-vault-green-700 font-semibold px-8 py-4 rounded-xl hover:bg-vault-green-50 transition-colors shadow-xl hover:shadow-2xl text-lg group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Book My Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-white/50 text-xs text-center">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="underline hover:text-white/70">Privacy Policy</a>
          . We'll never share your information.
        </p>
      </div>
    </form>
  )
}
