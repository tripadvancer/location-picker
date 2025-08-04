'use client'

import { useState } from 'react'

import { ConverterResult } from '@/components/features/common/converter-result/converter-result'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const GoogleMapsParser = () => {
    const [value, setValue] = useState('')
    const [lat, setLat] = useState<string | null>(null)
    const [lng, setLng] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const extractCoordinatesFromGoogleMapsUrl = (url: string): { lat: number; lng: number } | null => {
        try {
            const decodedUrl = decodeURIComponent(url)

            // Try @lat,lng pattern
            const atMatch = decodedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
            if (atMatch) {
                return {
                    lat: parseFloat(atMatch[1]),
                    lng: parseFloat(atMatch[2]),
                }
            }

            // Try !3dlat!4dlng pattern
            const dMatch = decodedUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
            if (dMatch) {
                return {
                    lat: parseFloat(dMatch[1]),
                    lng: parseFloat(dMatch[2]),
                }
            }

            return null
        } catch {
            return null
        }
    }

    const handleExtract = () => {
        setError(null)
        const coords = extractCoordinatesFromGoogleMapsUrl(value.trim())
        if (coords) {
            setLat(coords.lat.toString())
            setLng(coords.lng.toString())
        } else {
            setLat(null)
            setLng(null)
            setError('Could not extract coordinates from the link')
        }
    }

    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-lg font-bold">Google Maps Link Parser</h1>
                <p className="text-sm text-gray-500">
                    Paste a&nbsp;Google Maps link here, and this tool will extract GPS coordinates (latitude &
                    longitude).
                </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:w-2/3 sm:flex-row">
                <Input
                    placeholder="Paste Google Maps link"
                    value={value}
                    error={error}
                    className="w-full"
                    onChange={e => setValue(e.target.value)}
                />
                <Button onClick={handleExtract} className="w-full sm:w-auto">
                    Extract
                </Button>
            </div>

            <ConverterResult lat={lat} lng={lng} />
        </section>
    )
}
