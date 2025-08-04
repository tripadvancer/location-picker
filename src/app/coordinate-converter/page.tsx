import { Metadata } from 'next'

import { CoordinateConverter } from '@/components/features/coordinate-converter/coordinate-converter'

// prettier-ignore
export const metadata: Metadata = {
    title: 'GPS Coordinates Converter Online - Convert DD and DMS Formats',
    description: 'A simple tool to convert coordinates between DD (Decimal Degrees) and DMS (Degrees, Minutes, Seconds) formats. Enter coordinates in either format, and the result will be displayed in both.',
    alternates: {
        canonical: '/coordinate-converter',
    },
    openGraph: {
        title: 'GPS Coordinates Converter Online',
        description: 'A simple tool to convert coordinates between DD (Decimal Degrees) and DMS (Degrees, Minutes, Seconds) formats. Enter coordinates in either format, and the result will be displayed in both.',
    },
}

export default function CoordinateConverterPage() {
    return <CoordinateConverter />
}
