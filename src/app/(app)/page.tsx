import { Metadata } from 'next'

import { LocationPicker } from '@/components/features/location-picker/location-picker'

// prettier-ignore
export const metadata: Metadata = {
    title: 'My Saved Places - Store and Share Locations Easily',
    description: 'My Saved Places is a free online tool to quickly save, manage, and share locations. Open your saved spots instantly in Google Maps, Waze, Apple Maps, or Yandex.Maps.',
    keywords: [
        'My Saved Places',
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
        title: 'My Saved Places',
    },
    
    openGraph: {
        title: 'My Saved Places - Store and Share Locations Easily',
        description: 'My Saved Places is a free online tool to quickly save, manage, and share locations. Open your saved spots instantly in Google Maps, Waze, Apple Maps, or Yandex.Maps.',
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'My Saved Places',
        images: [
            {
                url: '/og-image-home.png',
                width: 1200,
                height: 630,
                alt: 'My Saved Places Tool Preview',
            },
        ],
    },
    
    twitter: {
        card: 'summary_large_image',
        title: 'My Saved Places - Store and Share Locations Easily',
        description: 'My Saved Places is a free online tool to quickly save, manage, and share locations. Open your saved spots instantly in Google Maps, Waze, Apple Maps, or Yandex.Maps.',
        images: ['/og-image-home.png'],
    },
}

export default function HomePage() {
    return <LocationPicker />
}
