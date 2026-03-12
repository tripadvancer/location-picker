import { Metadata } from 'next'

import { About } from '@/components/features/about/about'

// prettier-ignore
export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about My Saved Places, a free online tool for searching, converting, storing and sharing locations by address or coordinates. Discover how it works and its features.',
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
        title: 'About',
        description: 'Learn more about My Saved Places, a free online tool for searching, converting, storing and sharing locations by address or coordinates. Discover how it works and its features.',
        type: 'website',
        url: '/about',
        siteName: 'My Saved Places',
        images: [
            {
                url: '/og-image-about.png',
                width: 1200,
                height: 630,
                alt: 'About My Saved Places',
            },
        ],
    },
    
    twitter: {
        card: 'summary_large_image',
        title: 'About',
        description: 'Learn more about My Saved Places, a free online tool for searching, converting, storing and sharing locations by address or coordinates. Discover how it works and its features.',
        images: ['/og-image-about.png'],
    },
}

export default function AboutPage() {
    return <About />
}
