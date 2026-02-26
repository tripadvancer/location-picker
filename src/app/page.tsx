import { Metadata } from 'next'

import { LocationPicker } from '@/components/features/location-picker/location-picker'

// prettier-ignore
export const metadata: Metadata = {
    title: 'Location Picker - Store and Share Locations Easily',
    description: 'Location Picker is a free online tool to quickly save, manage, and share locations. Open your saved spots instantly in Google Maps, Waze, Apple Maps, or Yandex.Maps.',
    keywords: [
        'location picker',
        'store locations quickly',
        'share locations',
        'GPS tool',
        'maps integration',
        'Google Maps',
        'Waze',
        'Apple Maps',
        'Yandex.Maps',
        'coordinates manager',
    ],
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
    },
    appleWebApp: {
        title: 'Location Picker',
    },
    openGraph: {
        title: 'Location Picker - Store and Share Locations Easily',
        description: 'Location Picker is a free online tool to quickly save, manage, and share locations. Open your saved spots instantly in Google Maps, Waze, Apple Maps, or Yandex.Maps.',
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Location Picker',
        images: [
            {
                url: '/og-image-home.png',
                width: 1200,
                height: 630,
                alt: 'Location Picker Tool Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Location Picker - Store and Share Locations Easily',
        description: 'Free online tool to quickly save, manage, and share locations. Works with Google Maps, Waze, Apple Maps, and Yandex.Maps.',
        images: ['/og-image-home.png'],
    },
}

export default function HomePage() {
    return <LocationPicker />
}
