'use client'

import { CopyIcon } from 'lucide-react'

import { useSearchParams } from 'next/navigation'

function toDMS(deg: number, isLat: boolean) {
    const absolute = Math.abs(deg)
    const degrees = Math.floor(absolute)
    const minutesFull = (absolute - degrees) * 60
    const minutes = Math.floor(minutesFull)
    const seconds = (minutesFull - minutes) * 60

    const direction = isLat ? (deg >= 0 ? 'N' : 'S') : deg >= 0 ? 'E' : 'W'

    return `${degrees}°${minutes}'${seconds.toFixed(1)}"${direction}`
}

export const LocationPickerResultDms = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    if (!lat || !lng) {
        return null
    }

    const latNum = parseFloat(lat)
    const lngNum = parseFloat(lng)

    if (isNaN(latNum) || isNaN(lngNum)) {
        return null
    }

    return (
        <div>
            <strong>DMS: </strong>
            <span>
                {toDMS(latNum, true)} {toDMS(lngNum, false)}{' '}
            </span>
            <CopyIcon size={16} className="inline-block" />
        </div>
    )
}
