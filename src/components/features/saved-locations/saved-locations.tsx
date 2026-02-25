'use client'

import { useEffect, useMemo, useState } from 'react'

import { SearchInput } from '@/components/ui/search-input'
import { getPlaces } from '@/utils/db'
import { Place } from '@/utils/types'

import { SavedLocationsItem } from './components/saved-locations-item'

export const SavedLocations = () => {
    const [places, setPlaces] = useState<Place[]>([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadPlaces()
    }, [])

    const loadPlaces = async () => {
        setIsLoading(true)
        const savedPlaces = await getPlaces()
        setPlaces(savedPlaces)
        setIsLoading(false)
    }

    const filteredPlaces = useMemo(() => {
        if (!search.trim()) return places
        return places.filter(place => place.name.toLowerCase().includes(search.toLowerCase()))
    }, [places, search])

    const handleClear = () => setSearch('')

    return (
        <section className="w-full space-y-4">
            {places.length > 0 && (
                <SearchInput
                    value={search}
                    placeholder="Search by name..."
                    variant="white"
                    isLoading={isLoading}
                    onChange={setSearch}
                    onClick={() => {}}
                    onClear={handleClear}
                />
            )}

            {filteredPlaces.length > 0 && (
                <ul className="space-y-2">
                    {[...filteredPlaces].reverse().map(place => (
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
