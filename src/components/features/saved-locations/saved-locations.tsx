'use client'

import { useEffect, useState } from 'react'

import { InfoIcon } from 'lucide-react'

import Link from 'next/link'

import { getPlaces } from '@/utils/db'
import { Place } from '@/utils/types'

import { SavedLocationsItem } from './components/saved-locations-item'

export const SavedLocations = () => {
    const [places, setPlaces] = useState<Place[]>([])

    useEffect(() => {
        loadPlaces()
    }, [])

    const loadPlaces = async () => {
        const savedPlaces = await getPlaces()
        setPlaces(savedPlaces)
    }

    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-lg font-bold">My Saved Locations</h1>
                <p className="text-sm text-gray-500">
                    All your saved locations are shown here. To&nbsp;save a&nbsp;new location, use the
                    &lsquo;Save&rsquo; button on&nbsp;the{' '}
                    <Link href="/" className="text-blue-500 hover:text-blue-600">
                        map
                    </Link>
                    .
                </p>
            </div>

            <div className="flex items-start gap-x-2 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-400">
                <InfoIcon size={20} className="shrink-0" />
                We&nbsp;don&rsquo;t store any personal data. The saved locations are only stored in&nbsp;your
                browser&rsquo;s local storage.
            </div>

            <ul className="space-y-2">
                {places.map(place => (
                    <SavedLocationsItem key={`place-${place.id}`} place={place} onLoadPlaces={loadPlaces} />
                ))}
            </ul>
        </section>
    )
}
