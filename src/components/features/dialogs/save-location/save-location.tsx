'use client'

import { useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addPlace } from '@/utils/db'
import { Coordinates, Place } from '@/utils/types'

type SaveLocationProps = {
    coordinates: Coordinates
}

export const SaveLocation = ({ coordinates }: SaveLocationProps) => {
    const toast = useToast()
    const overlay = useOverlay()

    const [name, setName] = useState(generateDefaultName())
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    function generateDefaultName() {
        const now = new Date()

        const date = now.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })

        const time = now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        })

        return `${date} • ${time}`
    }

    const savePlace = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            setLoading(true)
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
            toast.success('Success', 'Location saved successfully')
            overlay.close()
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to save location')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4 md:w-87">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Save location</div>
                <div className="text-xs text-gray-500">Enter a name for this place</div>
            </div>

            <Input
                autoFocus
                placeholder="Location name"
                value={name}
                error={error}
                onChange={e => {
                    setName(e.target.value)
                    if (error) setError(null)
                }}
            />

            <Button className="w-full" disabled={loading} onClick={savePlace}>
                Save
            </Button>
        </div>
    )
}
