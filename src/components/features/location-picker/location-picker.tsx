'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { LocationControls } from '@/components/features/common/location-controls/location-controls'
import { Search } from '@/components/features/search/search'

import { LocationPickerMap } from './components/location-picker-map'

export const LocationPicker = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const lng = searchParams.get('lng')
    const lat = searchParams.get('lat')
    const zoom = searchParams.get('zoom')

    useEffect(() => {
        if (!lng || !lat || !zoom) {
            const params = new URLSearchParams(searchParams.toString())

            params.set('lat', '51.47722')
            params.set('lng', '0.00000')
            params.set('zoom', '5')

            router.replace(`?${params.toString()}`, { scroll: false })
        }
    }, [lat, lng, zoom, searchParams, router])

    return (
        <section className="flex w-full flex-col gap-y-4">
            <div className="flex-0">
                <Search />
            </div>
            <div className="flex-1">
                <LocationPickerMap />
            </div>
            <div className="flex-0">
                <LocationControls coordinates={{ lat: Number(lat), lng: Number(lng) }} />
            </div>
        </section>
    )
}
