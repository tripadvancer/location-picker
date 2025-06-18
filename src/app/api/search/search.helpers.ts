import { NextResponse } from 'next/server'

import { reverseGeocode } from '@/services/reverse-geocode'
import { Coordinates } from '@/utils/types/common.types'
import { SearchItem } from '@/utils/types/search.types'

type SearchResponse = {
    items: SearchItem[]
    error?: string
}

export async function handleCoordinates(coordinates: Coordinates): Promise<NextResponse> {
    try {
        const data = await reverseGeocode(coordinates)

        const item: SearchItem = {
            title: `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
            description: data.address || 'No address found',
            coordinates,
        }

        const response: SearchResponse = { items: [item] }
        return NextResponse.json(response)
    } catch (error) {
        console.error('Reverse geocoding error:', error)
        return NextResponse.json({ items: [], error: 'Failed to reverse geocode coordinates' }, { status: 500 })
    }
}
