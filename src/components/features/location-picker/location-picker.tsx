'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { LocationPickerInfo } from './components/location-picker-info'
import { LocationPickerMap } from './components/location-picker-map'
import { LocationPickerResult } from './components/location-picker-result'
import { LocationPickerSaved } from './components/location-picker-saved'

export const LocationPicker = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const lng = searchParams.get('lng')
    const lat = searchParams.get('lat')
    const zoom = searchParams.get('zoom')

    useEffect(() => {
        if (!lng || !lat || !zoom) {
            const params = new URLSearchParams(searchParams.toString())

            if (!lat) params.set('lat', '51.47722')
            if (!lng) params.set('lng', '0.00000')
            if (!zoom) params.set('zoom', '5')

            router.replace(`?${params.toString()}`, { scroll: false })
        }
    }, [lat, lng, zoom, searchParams, router])

    return (
        <section className="space-y-8">
            <LocationPickerInfo />
            <LocationPickerMap />
            <LocationPickerResult />
            <LocationPickerSaved />
        </section>
    )
}
