'use client'

import { AddLocation } from '@/components/features/dialogs/add-location/add-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Coordinates } from '@/utils/types'

type LocationSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationSaveButton = ({ coordinates }: LocationSaveButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<AddLocation coordinates={coordinates} />)
    }

    return (
        <Button variant="major" className="w-full" onClick={handleClick}>
            Save location
        </Button>
    )
}
