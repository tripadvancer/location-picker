'use client'

import { SaveLocation } from '@/components/features/dialogs/save-location/save-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Coordinates } from '@/utils/types'

type LocationSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationSaveButton = ({ coordinates }: LocationSaveButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<SaveLocation coordinates={coordinates} />)
    }

    return (
        <Button variant="major" className="w-full" onClick={handleClick}>
            Save location
        </Button>
    )
}
