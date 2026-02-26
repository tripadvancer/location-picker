import { Metadata } from 'next'

import { About } from '@/components/features/about/about'

// prettier-ignore
export const metadata: Metadata = {
    title: 'About Location Picker - Your Online Location Tool',
    description: 'Learn more about Location Picker, a free online tool for searching, converting, storing and sharing locations by address or coordinates. Discover how it works and its features.',
    keywords: [
        'location picker',
        'about location picker',
        'location tool',
        'GPS tools',
        'map tools',
        'coordinates converter',
    ],
    alternates: {
        canonical: '/about'
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'About Location Picker - Your Online Location Tool',
        description: 'Learn more about Location Picker, a free online tool for searching, converting, storing and sharing locations by address or coordinates.',
        type: 'website',
        url: '/about',
        siteName: 'Location Picker',
        images: [
            {
                url: '/og-image-about.png',
                width: 1200,
                height: 630,
                alt: 'About Location Picker',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Location Picker',
        description: 'Learn more about Location Picker, a free online tool for searching, converting, storing and sharing locations by address or coordinates.',
        images: ['/og-image-about.png'],
    },
}

export default function AboutPage() {
    return <About />
}
