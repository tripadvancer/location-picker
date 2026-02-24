import { Metadata } from 'next'

import { LocationPicker } from '@/components/features/location-picker/location-picker'

// prettier-ignore
export const metadata: Metadata = {
    metadataBase: new URL('https://location-picker.tripadvancer.com'),
    alternates: {
        canonical: '/',
    },
    title: 'Location Picker - Store and Share Locations',
    description: 'Location Picker is a free online tool for storing and sharing locations by address or coordinates. Supports DD and DMS formats, and integration with Google Maps, Waze, Apple Maps, and Yandex.Maps.',
    appleWebApp: {
        title: 'Location Picker',
    },
    openGraph: {
        title: 'Location Picker - Store and Share Locations',
        description: 'Location Picker is a free online tool for storing and sharing locations by address or coordinates. Supports DD and DMS formats, and integration with Google Maps, Waze, Apple Maps, and Yandex.Maps.',
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Location Picker',
    },
    twitter: {
        title: 'Location Picker - Store and Share Locations',
        description: 'Location Picker is a free online tool for storing and sharing locations by address or coordinates. Supports DD and DMS formats, and integration with Google Maps, Waze, Apple Maps, and Yandex.Maps.',
        card: 'summary_large_image',
    },
}

export default function HomePage() {
    return <LocationPicker />
}
