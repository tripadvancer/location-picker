import { ReactNode } from 'react'

import classNames from 'classnames'
import type { Viewport } from 'next'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'

import { Footer } from '@/components/features/layout/footer/footer'
import { Header } from '@/components/features/layout/header/header'
import { MobileBottomNav } from '@/components/features/layout/mobile-bottom-nav/mobile-bottom-nav'
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
    viewportFit: 'cover',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={classNames('h-full bg-white md:bg-[#e8f4ff]', roboto.className)}>
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <link href="https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.css" rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/icons/icon-192.png" />
            </head>
            <body className="h-full antialiased">
                <div className="relative m-auto flex min-h-full max-w-250 flex-col bg-white px-4 md:px-8">
                    <ToastProvider>
                        <Header />

                        <main className="flex w-full grow py-4 pb-22 md:block md:py-8 md:pb-0">{children}</main>

                        <div className="hidden md:block">
                            <Footer />
                        </div>

                        <div className="block md:hidden">
                            <MobileBottomNav />
                        </div>
                    </ToastProvider>
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} />
                </div>
            </body>
        </html>
    )
}
