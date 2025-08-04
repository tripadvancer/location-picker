import { Metadata } from 'next'

import { GoogleMapsParser } from '@/components/features/google-maps-parser/google-maps-parser'

// prettier-ignore
export const metadata: Metadata = {
    title: 'Google Maps Parser - Extract Coordinates from Links',
    description: 'Google Maps Parser is a free online tool that extracts GPS coordinates from any Google Maps URL. Quickly retrieve latitude and longitude from shared links.',
    alternates: {
        canonical: '/google-maps-parser',
    },
    openGraph: {
        title: 'Google Maps Parser - Extract Coordinates from Links',
    },
}

export default function GoogleMapsParserPage() {
    return <GoogleMapsParser />
}
