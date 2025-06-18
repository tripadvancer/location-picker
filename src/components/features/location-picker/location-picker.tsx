'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { config } from '@/utils/config'

import { LocationPickerMap } from './components/location-picker-map'
import { LocationPickerResult } from './components/location-picker-result'
import { LocationPickerShare } from './components/location-picker-share'

export const LocationPicker = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const lng = searchParams.get('lng')
    const lat = searchParams.get('lat')
    const zoom = searchParams.get('zoom')

    useEffect(() => {
        if (!lng || !lat || !zoom) {
            const params = new URLSearchParams(searchParams.toString())

            if (!lat) params.set('lat', config.map.lat.toString())
            if (!lng) params.set('lng', config.map.lng.toString())
            if (!zoom) params.set('zoom', config.map.zoom.toString())

            router.replace(`?${params.toString()}`, { scroll: false })
        }
    }, [lat, lng, zoom, searchParams, router])

    return (
        <section className="space-y-8">
            <LocationPickerMap />

            <div className="flex flex-col items-start gap-y-8 sm:flex-row sm:justify-between">
                <LocationPickerResult />
                <LocationPickerShare />
            </div>
        </section>
    )
}
