import { NextResponse } from 'next/server'

import { Coordinates, SearchItem } from '@/utils/types'

export async function handleCoordinates(coordinates: Coordinates): Promise<NextResponse> {
    try {
        const params = new URLSearchParams({
            lat: coordinates.lat.toString(),
            lon: coordinates.lng.toString(),
        })

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/reverse-geocode?${params.toString()}`
        const res = await fetch(url)

        if (!res.ok) {
            console.error('Reverse geocoding fetch failed:', res.statusText)
            return NextResponse.json({ items: [], error: 'Failed to fetch address' }, { status: 502 })
        }

        const data = await res.json()

        const item: SearchItem = {
            title: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
            description: data.address || 'No address found',
            coordinates,
        }

        return NextResponse.json({ items: [item] })
    } catch (error) {
        console.error('handleCoordinates error:', error)
        return NextResponse.json({ items: [], error: 'Unexpected error occurred' }, { status: 500 })
    }
}

export const handleAutocomplete = async (q: string): Promise<NextResponse> => {
    try {
        const params = new URLSearchParams({ q })

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/autocomplete?${params.toString()}`
        const res = await fetch(url)

        if (!res.ok) {
            console.error('Autocomplete fetch failed:', res.statusText)
            return NextResponse.json({ items: [], error: 'Failed to fetch autocomplete results' }, { status: 502 })
        }

        const data = await res.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error('handleAutocomplete error:', error)
        return NextResponse.json({ items: [], error: 'Unexpected error occurred' }, { status: 500 })
    }
}
