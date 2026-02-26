import { Metadata } from 'next'

import { CoordinateConverter } from '@/components/features/coordinate-converter/coordinate-converter'

// prettier-ignore
export const metadata: Metadata = {
    title: 'GPS Coordinates Converter - DD & DMS Formats',
    description: 'Convert GPS coordinates easily between Decimal Degrees (DD) and Degrees Minutes Seconds (DMS) formats using Location Picker.',
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
        title: 'GPS Coordinates Converter - DD & DMS Formats',
        description: 'Convert GPS coordinates easily between Decimal Degrees (DD) and Degrees Minutes Seconds (DMS) formats.',
        type: 'website',
        url: '/coordinate-converter',
        siteName: 'Location Picker',
        images: [
            {
                url: '/og-image-converter.png',
                width: 1200,
                height: 630,
                alt: 'GPS Coordinates Converter',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GPS Coordinates Converter',
        description: 'Convert coordinates between DD and DMS formats quickly and easily.',
        images: ['/og-image-converter.png'],
    },
}

export default function CoordinateConverterPage() {
    return <CoordinateConverter />
}
