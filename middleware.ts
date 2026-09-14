import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_HOSTS = ['complyvault.co', 'www.complyvault.co', 'app.complyvault.co']

// Routes that should NEVER be redirected (API, auth, checkout, etc.)
const EXCLUDED_PATHS = [
    '/api',
    '/auth',
    '/app',
    '/checkout',
    '/webhook',
    '/admin',
    '/studio',
    '/_next',
    '/favicon.ico',
]

// Marketing pages that can be redirected
const MARKETING_PAGES = [
    '/',
    '/pricing',
    '/ria-compliance-software',
    '/fca-compliance-software',
    '/about',
    '/contact',
    '/features',
    '/sample-audit-pack',
    '/privacy',
    '/terms',
]

function getCountryFromHeaders(request: NextRequest): 'GB' | null {
    const country = request.headers.get('x-vercel-ip-country') ||
                    request.headers.get('cf-ipcountry') ||
                    request.headers.get('x-country-code') ||
                    request.headers.get('cloudfront-viewer-country') ||
                    null
    
    // Log country detection for debugging
    console.log('[Middleware] Country detection:', {
        'x-vercel-ip-country': request.headers.get('x-vercel-ip-country'),
        'cf-ipcountry': request.headers.get('cf-ipcountry'),
        'x-country-code': request.headers.get('x-country-code'),
        'cloudfront-viewer-country': request.headers.get('cloudfront-viewer-country'),
        detected: country,
        isUK: country === 'GB'
    })
    
    return country === 'GB' ? 'GB' : null
}

function shouldRedirectToUK(pathname: string, country: 'GB' | null, marketOverride: string | null): boolean {
    // Don't redirect if already on UK path
    if (pathname.startsWith('/uk/')) return false
    
    // Don't redirect excluded paths
    if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) return false
    
    // Don't redirect if explicitly set to US
    if (marketOverride === 'us') return false
    
    // Only redirect marketing pages
    if (!MARKETING_PAGES.includes(pathname)) return false
    
    // Redirect if UK detected or explicitly set to UK
    return country === 'GB' || marketOverride === 'uk'
}

function getUKPath(pathname: string): string {
    if (pathname === '/') return '/uk'
    return `/uk${pathname}`
}

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl

    // www → non-www redirect is handled by Vercel Domains (Settings → Domains → set complyvault.co as primary).
    // Do NOT add redirects here or in vercel.json — Vercel already redirects www→non-www when non-www is primary.
    // Adding our own caused ERR_TOO_MANY_REDIRECTS when Vercel had www as primary.
    
    // 1) Block WP admin paths
    if (
        pathname === '/wp-admin' ||
        pathname.startsWith('/wp-admin/') ||
        pathname === '/wp-login.php' ||
        pathname === '/wp-login'
    ) {
        const res = new NextResponse('Not Found', { status: 404 })
        res.headers.set('x-mw-ran', '1')
        return res
    }

    // 2) Handle market override via query param (?market=uk or ?market=us)
    const marketParam = searchParams.get('market')
    
    if (marketParam === 'uk' || marketParam === 'us') {
        const url = request.nextUrl.clone()
        const response = NextResponse.next()
        
        // Set cookie for override
        response.cookies.set('cv_market', marketParam, {
            maxAge: 90 * 24 * 60 * 60, // 90 days
            path: '/',
            sameSite: 'lax',
        })
        
        // Handle redirects based on market param
        if (marketParam === 'uk') {
            // Redirect to UK path if not already there
            if (!pathname.startsWith('/uk/') && MARKETING_PAGES.includes(pathname)) {
                url.pathname = getUKPath(pathname)
                url.searchParams.delete('market')
                return NextResponse.redirect(url)
            }
        } else if (marketParam === 'us') {
            // Redirect to US path if on UK path
            if (pathname.startsWith('/uk/')) {
                url.pathname = pathname.replace('/uk', '') || '/'
                url.searchParams.delete('market')
                return NextResponse.redirect(url)
            }
        }
        
        // Remove market param from URL if no redirect needed
        if (url.searchParams.has('market')) {
            url.searchParams.delete('market')
            return NextResponse.redirect(url)
        }
        
        return response
    }
    
    // 3) Check for existing market cookie
    const marketCookie = request.cookies.get('cv_market')?.value || null
    
    // 4) Geo-based redirect logic (only for marketing pages)
    if (request.method === 'GET' && !pathname.startsWith('/uk/')) {
        const country = getCountryFromHeaders(request)
        
        console.log('[Middleware] Routing decision:', {
            pathname,
            country,
            marketCookie,
            shouldRedirect: shouldRedirectToUK(pathname, country, marketCookie)
        })
        
        if (shouldRedirectToUK(pathname, country, marketCookie)) {
            const ukPath = getUKPath(pathname)
            const url = request.nextUrl.clone()
            url.pathname = ukPath
            console.log('[Middleware] Redirecting UK user:', { from: pathname, to: ukPath })
            return NextResponse.redirect(url)
        }
    }

    // 5) Open-redirect param hygiene (GET only)
    if (request.method === 'GET') {
        const suspiciousParams = ['redirect', 'next', 'return', 'returnTo', 'redirect_uri']

        for (const param of suspiciousParams) {
            const value = searchParams.get(param)
            if (!value) continue

            if (value.startsWith('/') && !value.startsWith('//')) continue

            try {
                const redirectUrl = new URL(value, request.url)
                const hostname = redirectUrl.hostname.toLowerCase()

                if (!ALLOWED_HOSTS.includes(hostname)) {
                    const res = NextResponse.json({ error: 'Invalid redirect parameter' }, { status: 400 })
                    res.headers.set('x-mw-ran', '1')
                    return res
                }
            } catch {
                const res = NextResponse.json({ error: 'Invalid redirect parameter' }, { status: 400 })
                res.headers.set('x-mw-ran', '1')
                return res
            }
        }
    }

    // ✅ Always stamp header on normal pass-through
    const res = NextResponse.next()
    res.headers.set('x-mw-ran', '1')
    return res
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
}
