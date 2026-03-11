import { Metadata } from 'next'

import { SavedLocations } from '@/components/features/saved-locations/saved-locations'

// prettier-ignore
export const metadata: Metadata = {
    title: 'My Saved Locations',
    description: 'View and manage all your saved locations in one place. Easily access, edit, and share your locations.',
    keywords: [
        'my saved location',
        'saved locations',
        'my locations',
        'location picker',
        'GPS locations',
        'map bookmarks',
    ],
    alternates: {
        canonical: '/saved',
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'My Saved Locations',
        description: 'View and manage all your saved locations in one place. Easily access, edit, and share your locations.',
        type: 'website',
        url: '/saved',
        siteName: 'My Saved Location',
        images: [
            {
                url: '/og-image-saved.png',
                width: 1200,
                height: 630,
                alt: 'Saved Locations',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'My Saved Locations',
        description: 'View and manage all your saved locations in one place. Easily access, edit, and share your locations.',
        images: ['/og-image-saved.png'],
    },
}

export default function SavedLocationsPage() {
    return <SavedLocations />
}
