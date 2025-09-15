'use client'

import { useEffect, useMemo, useState } from 'react'

import { InfoIcon, SearchIcon } from 'lucide-react'

import Link from 'next/link'

import { getPlaces } from '@/utils/db'
import { Place } from '@/utils/types'

import { SavedLocationsItem } from './components/saved-locations-item'

export const SavedLocations = () => {
    const [places, setPlaces] = useState<Place[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        loadPlaces()
    }, [])

    const loadPlaces = async () => {
        const savedPlaces = await getPlaces()
        setPlaces(savedPlaces)
    }

    const filteredPlaces = useMemo(() => {
        if (!search.trim()) return places
        return places.filter(place => place.name.toLowerCase().includes(search.toLowerCase()))
    }, [places, search])

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

            {places.length > 0 && (
                <div className="relative">
                    <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full rounded-lg border border-gray-200 py-3 pr-3 pl-10 text-sm focus:outline-none"
                    />
                </div>
            )}

            {filteredPlaces.length > 0 && (
                <ul className="space-y-2">
                    {filteredPlaces.map(place => (
                        <SavedLocationsItem key={`place-${place.id}`} place={place} onLoadPlaces={loadPlaces} />
                    ))}
                </ul>
            )}

            {places.length > 0 && filteredPlaces.length === 0 && (
                <div className="text-sm text-gray-500">No locations match your search.</div>
            )}

            {places.length === 0 && <div className="text-sm text-gray-500">You have no saved locations yet.</div>}
        </section>
    )
}
