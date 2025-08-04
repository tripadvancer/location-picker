import classNames from 'classnames'
import type { Viewport } from 'next'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'

import { Footer } from '@/components/features/layout/footer/footer'
import { Header } from '@/components/features/layout/header/header'
import { ToastProvider } from '@/utils/providers/toast-provider'

import './globals.css'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={classNames('bg-[#e8f4ff]', roboto.className)}>
            <head>
                <link href="https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.css" rel="stylesheet" />
            </head>
            <body className="relative m-auto flex min-h-screen max-w-[1000px] flex-col px-4 antialiased sm:px-8">
                <ToastProvider>
                    <Header />
                    <div className="grow py-4 sm:py-8">{children}</div>
                    <Footer />
                </ToastProvider>
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
            </body>
        </html>
    )
}
