'use client'

import { useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deletePlace, updatePlace } from '@/utils/db'
import { Place } from '@/utils/types'

type EditLocationProps = {
    place: Place
    onSuccess: () => void
}

export const EditLocation = ({ place, onSuccess }: EditLocationProps) => {
    const toast = useToast()
    const overlay = useOverlay()

    const [name, setName] = useState(place.name)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            setLoading(true)
            await updatePlace({ ...place, name: trimmed })
            toast.success('Location updated', 'Changes saved successfully.')
            onSuccess()
            overlay.close()
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to update location')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this location?')

        if (!confirmed) return

        try {
            setLoading(true)
            await deletePlace(place.id!)
            toast.success('Location deleted', 'The location has been successfully deleted.')
            onSuccess()
            overlay.close()
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to delete location')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4 md:w-87">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Edit location</div>
                <div className="text-xs text-gray-500">Update the name or delete this location</div>
            </div>

            <Input
                value={name}
                error={error}
                placeholder="Location name"
                onChange={e => {
                    setName(e.target.value)
                    if (error) setError(null)
                }}
            />

            <Button className="w-full" disabled={loading} onClick={handleSave}>
                Save changes
            </Button>

            <Button className="w-full text-red-500" disabled={loading} onClick={handleDelete}>
                Delete location
            </Button>
        </div>
    )
}
