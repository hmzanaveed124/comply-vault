import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from '../middleware'

const sharedPages = [
  '/about',
  '/ria-compliance-software',
  '/sample-audit-pack',
  '/contact',
  '/privacy',
  '/terms',
  '/features',
]

describe('shared marketing routes', () => {
  it.each(sharedPages)('repairs old UK links to %s without a redirect loop', (path) => {
    const headers = { 'x-vercel-ip-country': 'GB', cookie: 'cv_market=uk' }
    const response = middleware(new NextRequest(`https://complyvault.co/uk${path}?source=footer`, { headers }))
    expect(response.status).toBe(308)
    expect(response.headers.get('location')).toBe(`https://complyvault.co${path}?source=footer`)

    const destination = middleware(new NextRequest(response.headers.get('location')!, { headers }))
    expect(destination.headers.get('location')).toBeNull()
    expect(destination.status).toBe(200)
  })

  it.each(sharedPages)('keeps explicit UK market requests on the shared %s page', (path) => {
    const response = middleware(new NextRequest(`https://complyvault.co${path}?market=uk`))
    expect(response.headers.get('location')).toBe(`https://complyvault.co${path}`)
  })

  it.each(['/pricing', '/fca-compliance-software'])('preserves regional routing for %s', (path) => {
    const response = middleware(new NextRequest(`https://complyvault.co${path}`, {
      headers: { 'x-vercel-ip-country': 'GB' },
    }))
    expect(response.headers.get('location')).toBe(`https://complyvault.co/uk${path}`)
    expect(middleware(new NextRequest(response.headers.get('location')!)).status).toBe(200)
  })

  it('leaves unknown UK routes alone', () => {
    expect(middleware(new NextRequest('https://complyvault.co/uk/missing')).headers.get('location')).toBeNull()
  })
})
