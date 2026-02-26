'use client'

import { useEffect, useState } from 'react'

import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addPlace } from '@/utils/db'
import { useToast } from '@/utils/providers/toast-provider'
import { Coordinates, Place } from '@/utils/types'

type LocationPickerSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationPickerSaveButton = ({ coordinates }: LocationPickerSaveButtonProps) => {
    const toast = useToast()

    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    const generateDefaultName = () => {
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

    const savePlace = async (placeName: string) => {
        try {
            const place: Omit<Place, 'id'> = {
                name: placeName.trim(),
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
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to save location')
        }
    }

    const handleClick = async () => {
        const defaultName = generateDefaultName()

        if (isMobile) {
            setName(defaultName)
            setError(null)
            setIsOpen(true)
            return
        }

        const enteredName = prompt('Enter location name:', defaultName)

        if (!enteredName || !enteredName.trim()) {
            return
        }

        await savePlace(enteredName)
    }

    const handleSheetSave = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        setError(null)
        await savePlace(trimmed)
        setIsOpen(false)
    }

    return (
        <>
            <Button className="w-full md:w-auto" onClick={handleClick}>
                Save location
            </Button>

            {isMobile && (
                <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="mb-4 border-b border-gray-200 pb-4">
                        <div className="text-sm font-semibold">Save location</div>
                        <div className="text-xs text-gray-500">Enter a name for this place</div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            autoFocus
                            placeholder="Location name"
                            value={name}
                            error={error}
                            className="w-full"
                            onChange={e => {
                                setName(e.target.value)
                                if (error) setError(null)
                            }}
                        />

                        <Button className="w-full" onClick={handleSheetSave}>
                            Save
                        </Button>
                    </div>
                </BottomSheet>
            )}
        </>
    )
}
