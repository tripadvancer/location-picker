'use client'

import { useState } from 'react'

import { ConverterResult } from '@/components/features/common/converter-result/converter-result'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { SearchType } from '@/utils/enums'
import { detectSearchType } from '@/utils/helpers'
import { convertDMStoDD, parseDDCoordinates } from '@/utils/helpers'

export const CoordinateConverter = () => {
    const [value, setValue] = useState('')
    const [lat, setLat] = useState<string | null>(null)
    const [lng, setLng] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleConvert = () => {
        setError(null)

        const type = detectSearchType(value)

        if (type === SearchType.DD) {
            const coordinates = parseDDCoordinates(value)
            if (coordinates) {
                setLat(coordinates.lat.toString())
                setLng(coordinates.lng.toString())
            } else {
                setError('Invalid DD coordinates')
            }
        } else if (type === SearchType.DMS) {
            const coordinates = convertDMStoDD(value)
            if (coordinates) {
                setLat(coordinates.lat.toString())
                setLng(coordinates.lng.toString())
            } else {
                setError('Invalid DMS coordinates')
            }
        } else {
            setError('Could not detect coordinate format')
        }
    }

    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-lg font-bold">GPS Coordinates Converter</h1>
                <p className="text-sm text-gray-500">
                    A&nbsp;simple tool to&nbsp;convert coordinates between&nbsp;DD (Decimal Degrees) and DMS (Degrees,
                    Minutes, Seconds) formats. Enter coordinates in&nbsp;either format, and the result will
                    be&nbsp;displayed in&nbsp;both.
                </p>
            </div>

            <div className="flex flex-col items-start gap-4 md:w-2/3 md:flex-row">
                <Input
                    placeholder="Enter coordinates DD or DMS"
                    value={value}
                    error={error}
                    className="w-full"
                    onChange={e => setValue(e.target.value)}
                />
                <Button variant="minor" onClick={handleConvert} className="w-full md:w-auto">
                    Convert
                </Button>
            </div>

            {lat && lng && (
                <>
                    <Divider label="Result" />
                    <ConverterResult coordinates={{ lat: Number(lat), lng: Number(lng) }} />
                </>
            )}
        </section>
    )
}
