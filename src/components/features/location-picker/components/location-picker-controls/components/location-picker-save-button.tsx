'use client'

import { Button } from '@/components/ui/button'
import { addPlace } from '@/utils/db'
import { useToast } from '@/utils/providers/toast-provider'
import { Coordinates, Place } from '@/utils/types'

type LocationPickerSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationPickerSaveButton = ({ coordinates }: LocationPickerSaveButtonProps) => {
    const toast = useToast()

    const handleSave = async () => {
        if (!coordinates) return

        const defaultName = 'My Location'
        const name = prompt('Enter location name:', defaultName)
        if (!name || !name.trim()) return

        try {
            const place: Omit<Place, 'id'> = {
                name: name.trim(),
                coordinates: { lat: Number(coordinates.lat), lng: Number(coordinates.lng) },
                pinned: false,
                createdAt: Date.now(),
                pinnedAt: undefined,
            }

            await addPlace(place)
            toast.success('Success', 'Location saved successfully')
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to save location')
        }
    }

    return (
        <Button className="w-full md:w-auto" onClick={handleSave}>
            Save location
        </Button>
    )
}
