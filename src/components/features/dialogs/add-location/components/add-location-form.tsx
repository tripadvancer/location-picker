'use client'

import { useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addPlace } from '@/utils/db'
import { generateDefaultName } from '@/utils/helpers'
import { Coordinates, Place } from '@/utils/types'

type AddLocationFormProps = {
    coordinates: Coordinates
}

export const AddLocationForm = ({ coordinates }: AddLocationFormProps) => {
    const toast = useToast()
    const overlay = useOverlay()

    const [name, setName] = useState(generateDefaultName())
    const [error, setError] = useState<string | null>(null)

    const handleClick = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            const place: Omit<Place, 'id'> = {
                name: trimmed,
                coordinates: {
                    lat: Number(coordinates.lat),
                    lng: Number(coordinates.lng),
                },
                pinned: false,
                createdAt: Date.now(),
                pinnedAt: undefined,
            }
            await addPlace(place)
            overlay.close()
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to save location')
        }
    }

    return (
        <div className="space-y-4">
            <Input
                placeholder="Location name"
                value={name}
                error={error}
                onChange={e => {
                    setName(e.target.value)
                    if (error) setError(null)
                }}
            />

            <Button variant="major" className="w-full" onClick={handleClick}>
                Save
            </Button>
        </div>
    )
}
