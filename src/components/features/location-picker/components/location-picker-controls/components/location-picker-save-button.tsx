'use client'

import { SaveLocation } from '@/components/features/dialogs/save-location/save-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Coordinates } from '@/utils/types'

type LocationPickerSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationPickerSaveButton = ({ coordinates }: LocationPickerSaveButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<SaveLocation coordinates={coordinates} />)
    }

    return (
        <Button className="w-full" onClick={handleClick}>
            Save location
        </Button>
    )
}
