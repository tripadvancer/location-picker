'use client'

import { CopyIcon } from 'lucide-react'

import { useSearchParams } from 'next/navigation'

export const LocationPickerResultDd = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    if (!lat || !lng) {
        return
    }

    return (
        <div>
            <strong>DD: </strong>
            <span>{`${parseFloat(lat).toFixed(6)}, ${parseFloat(lng).toFixed(6)}`} </span>
            <CopyIcon size={16} className="inline-block" />
        </div>
    )
}
