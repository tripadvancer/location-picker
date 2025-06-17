import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

import { Footer } from '@/components/ui/footer'
import { Header } from '@/components/ui/header'

import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Location Picker - Search, Convert, and Share Locations',
    description:
        'Search locations by coordinates or address. Convert between DD and DMS. Share via Google Maps, Waze, Apple or Yandex. Easy, accurate, and free.',
    keywords:
        'coordinate converter, address finder, DD to DMS, latitude longitude, share location, Google Maps, Waze, Apple Maps, Yandex Maps, geolocation tool',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="bg-[#e8f4ff]">
            <head>
                <link href="https://unpkg.com/maplibre-gl@5.6.0/dist/maplibre-gl.css" rel="stylesheet" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} m-auto flex min-h-screen max-w-[1000px] flex-col px-4 antialiased sm:px-8`}
            >
                <Header />
                <div className="grow py-8">{children}</div>
                <Footer />
            </body>
        </html>
    )
}
