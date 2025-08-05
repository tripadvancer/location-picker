import { Metadata } from 'next'

import { CoordinateConverter } from '@/components/features/coordinate-converter/coordinate-converter'

// prettier-ignore
export const metadata: Metadata = {
    title: 'GPS Coordinates Converter',
    description: 'A simple tool to convert coordinates between DD and DMS formats.',
    alternates: {
        canonical: '/coordinate-converter',
    },
    openGraph: {
        title: 'GPS Coordinates Converter',
        description: 'A simple tool to convert coordinates between DD and DMS formats.',
    },
}

export default function CoordinateConverterPage() {
    return <CoordinateConverter />
}
