import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ComplyVault | Supervisory Evidence Layer for RIAs',
  description: 'ComplyVault sits above your existing archive to route supervisory attention and preserve source-linked decisions. AI assists; humans remain accountable.',
  keywords: ['RIA compliance', 'investment advisor', 'compliance management', 'SEC compliance', 'regulatory compliance', 'compliance software'],
  authors: [{ name: 'Comply Vault' }],
  openGraph: {
    title: 'ComplyVault | Supervisory Evidence Layer for RIAs',
    description: 'Find what needs attention. Prove how it was handled. Supervisory evidence above your existing archive.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Comply Vault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ComplyVault | Supervisory Evidence Layer for RIAs',
    description: 'Supervisory evidence above your existing archive. AI assists; humans remain accountable.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2NDFEE4GSW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2NDFEE4GSW');
          `}
        </Script>
        {/* Apollo.io Website Visitor Tracking */}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=true,o.defer=true,
            o.onload=function(){window.trackingFunctions.onLoad({appId:"6993aae50f8f7f00155d468e"})},
            document.head.appendChild(o)}initApollo();
          `}
        </Script>
      </head>
      <body className={`${outfit.variable} ${plusJakartaSans.variable} ${spaceMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
