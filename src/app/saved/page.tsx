import { Metadata } from 'next'

import { SavedLocations } from '@/components/features/saved-locations/saved-locations'

// prettier-ignore
export const metadata: Metadata = {
    title: 'My Saved Locations',
    description: 'A list of your saved locations.',
    alternates: {
        canonical: '/saved',
    },
    openGraph: {
        title: 'My Saved Locations',
        description: 'A list of your saved locations.',
    },
}

export default function SavedLocationsPage() {
    return <SavedLocations />
}
