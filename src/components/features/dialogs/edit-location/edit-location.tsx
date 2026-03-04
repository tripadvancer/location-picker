'use client'

import { useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updatePlace } from '@/utils/db'
import { Place } from '@/utils/types'

import { Preview } from '../preview/preview'

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
            onSuccess()
            overlay.close()
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to update location')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        overlay.open(<Preview place={place} onSuccess={onSuccess} />)
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

            <Button variant="major" className="w-full" disabled={loading} onClick={handleSave}>
                Save changes
            </Button>

            <Button variant="minor" className="w-full" disabled={loading} onClick={handleCancel}>
                Cancel
            </Button>
        </div>
    )
}
