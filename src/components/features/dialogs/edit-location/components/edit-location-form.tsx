'use client'

import { useState } from 'react'

import { useOverlay } from '@/components/providers/overlay-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updatePlace } from '@/utils/db'
import { Place } from '@/utils/types'

type EditLocationFormProps = {
    place: Place
    onSuccess: () => void
}

export const EditLocationForm = ({ place, onSuccess }: EditLocationFormProps) => {
    const toast = useToast()
    const overlay = useOverlay()

    const [name, setName] = useState(place.name)
    const [error, setError] = useState<string | null>(null)

    const handleClick = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            await updatePlace({ ...place, name: trimmed })
            onSuccess()
            overlay.close()
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to update location')
        }
    }

    return (
        <div className="space-y-4">
            <Input
                value={name}
                error={error}
                placeholder="Location name"
                onChange={e => {
                    setName(e.target.value)
                    if (error) setError(null)
                }}
            />

            <Button variant="major" className="w-full" onClick={handleClick}>
                Save changes
            </Button>
        </div>
    )
}
