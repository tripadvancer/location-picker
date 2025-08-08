'use client'

import { Button } from '@/components/ui/button'
import { addPlace } from '@/utils/db'
import { useToast } from '@/utils/providers/toast-provider'
import { Coordinates, Place } from '@/utils/types'

type LocationPickerShareSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationPickerShareSaveButton = ({ coordinates }: LocationPickerShareSaveButtonProps) => {
    const toast = useToast()

    const handleSave = async () => {
        if (!coordinates) return

        const defaultName = 'My Location'
        const name = prompt('Enter location name:', defaultName)
        if (!name || !name.trim()) return

        try {
            const place: Omit<Place, 'id'> = {
                coordinates: { lat: Number(coordinates.lat), lng: Number(coordinates.lng) },
                name: name.trim(),
            }

            await addPlace(place)
            toast.success('Success', 'Location saved successfully')
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to save location')
        }
    }

    return <Button onClick={handleSave}>Save</Button>
}
