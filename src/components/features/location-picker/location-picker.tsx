'use client'

import { useEffect } from 'react'

import { InfoIcon } from 'lucide-react'

import { useRouter, useSearchParams } from 'next/navigation'

import { LocationPickerMap } from './components/location-picker-map'
import { LocationPickerResult } from './components/location-picker-result'
import { LocationPickerSaved } from './components/location-picker-saved'
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

            if (!lat) params.set('lat', '51.47722')
            if (!lng) params.set('lng', '0.00000')
            if (!zoom) params.set('zoom', '5')

            router.replace(`?${params.toString()}`, { scroll: false })
        }
    }, [lat, lng, zoom, searchParams, router])

    return (
        <section className="space-y-8">
            <div className="flex items-center gap-x-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                <InfoIcon />
                <p>
                    We dont't store your location data, all <strong>data is processed locally</strong>.
                </p>
            </div>
            <LocationPickerMap />
            <LocationPickerResult />

            <LocationPickerSaved />

            {/* <div className="flex flex-col items-start gap-y-8 sm:flex-row sm:justify-between">
                <LocationPickerShare />
            </div> */}
        </section>
    )
}
