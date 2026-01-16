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
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <link href="https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.css" rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/icons/icon-192.png" />
            </head>
            <body className="h-full antialiased">
                <div className="relative m-auto flex min-h-screen max-w-250 flex-col bg-white px-4 sm:px-8">
                    <ToastProvider>
                        <Header />
                        <main className="grow py-4 sm:py-8">{children}</main>
                        <Footer />
                    </ToastProvider>
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
                </div>
            </body>
        </html>
    )
}
