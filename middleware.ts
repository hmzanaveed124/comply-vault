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

    // US RIA positioning is the default. UK pages are available through explicit selection.
    const marketParam = searchParams.get('market')
    const marketCookie = request.cookies.get('cv_market')?.value
    const explicitMarket = marketParam === 'uk' || marketParam === 'us' ? marketParam : null
    const market = explicitMarket ?? marketCookie
    const isUKPath = pathname === '/uk' || pathname.startsWith('/uk/')
    // Only route to UK pages that actually exist; never create /uk/about, /uk/features, etc.
    const ukRoutes: Record<string, string> = {
        '/': '/uk',
        '/pricing': '/uk/pricing',
        '/ria-compliance-software': '/uk/fca-compliance-software',
        '/fca-compliance-software': '/uk/fca-compliance-software',
    }
    if (request.method === 'GET' && !EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
        const url = request.nextUrl.clone()
        if (market === 'uk' && !isUKPath && ukRoutes[pathname]) url.pathname = ukRoutes[pathname]
        if (explicitMarket === 'us' && isUKPath) {
            url.pathname = pathname === '/uk' ? '/' : pathname === '/uk/fca-compliance-software' ? '/ria-compliance-software' : pathname.slice(3)
        }
        if (explicitMarket) url.searchParams.delete('market')
        if (url.toString() !== request.nextUrl.toString()) {
            const response = NextResponse.redirect(url)
            if (explicitMarket) response.cookies.set('cv_market', explicitMarket, { maxAge: 90 * 24 * 60 * 60, path: '/', sameSite: 'lax' })
            response.headers.set('x-mw-ran', '1')
            return response
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
    if (explicitMarket) res.cookies.set('cv_market', explicitMarket, { maxAge: 90 * 24 * 60 * 60, path: '/', sameSite: 'lax' })
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
