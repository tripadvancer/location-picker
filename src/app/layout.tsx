import classNames from 'classnames'
import type { Metadata, Viewport } from 'next'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'

import { Footer } from '@/components/ui/footer'
import { Header } from '@/components/ui/header'
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

// prettier-ignore
export const metadata: Metadata = {
    metadataBase: new URL('https://location-picker.tripadvancer.com'),
    alternates: {
        canonical: '/',
    },
    title: 'Location Picker - Search, Convert, and Share Locations',
    description: 'Search locations by coordinates or address. Convert between DD and DMS. Share via Google Maps, Waze, Apple or Yandex. Easy, accurate, and free.',
    appleWebApp: {
        title: 'Location Picker',
    },
    openGraph: {
        title: 'Location Picker - Search, Convert, and Share Locations',
        type: 'website',
        locale: 'ru_RU',
        url: '/',
        siteName: 'Location Picker',
    },
    twitter: {
        title: 'Location Picker - Search, Convert, and Share Locations',
        card: 'summary_large_image',
    },
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
            <body className="m-auto flex min-h-screen max-w-[1000px] flex-col px-4 antialiased sm:px-8">
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
