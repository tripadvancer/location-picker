import { Metadata } from 'next'

import { CoordinateConverter } from '@/components/features/coordinate-converter/coordinate-converter'

// prettier-ignore
export const metadata: Metadata = {
    title: 'Coordinates Converter',
    description: 'Convert GPS coordinates easily between Decimal Degrees (DD) and Degrees Minutes Seconds (DMS) formats.',
    keywords: [
        'gps converter',
        'coordinates converter',
        'DD to DMS',
        'DMS to DD',
        'location tool',
        'map coordinates',
    ],
    alternates: {
        canonical: '/coordinate-converter',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Coordinates Converter',
        description: 'Convert GPS coordinates easily between Decimal Degrees (DD) and Degrees Minutes Seconds (DMS) formats.',
        type: 'website',
        url: '/coordinate-converter',
        siteName: 'My Saved Places',
        images: [
            {
                url: '/og-image-converter.png',
                width: 1200,
                height: 630,
                alt: 'Coordinates Converter',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Coordinates Converter',
        description: 'Convert GPS coordinates easily between Decimal Degrees (DD) and Degrees Minutes Seconds (DMS) formats.',
        images: ['/og-image-converter.png'],
    },
}

export default function CoordinateConverterPage() {
    return <CoordinateConverter />
}
