import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ComplyVault Studio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <div className="min-h-screen">{children}</div>
}
