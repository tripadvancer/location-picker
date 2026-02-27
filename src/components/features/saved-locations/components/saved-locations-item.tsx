'use client'

import { useEffect, useState } from 'react'

import { PencilIcon, PinIcon, TrashIcon } from 'lucide-react'

import Link from 'next/link'

import { useToast } from '@/components/providers/toast-provider'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deletePlace, updatePlace } from '@/utils/db'
import { Place } from '@/utils/types'

type SavedLocationsItemProps = {
    place: Place
    onLoadPlaces: () => void
}

export const SavedLocationsItem = ({ place, onLoadPlaces }: SavedLocationsItemProps) => {
    const toast = useToast()

    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState(place.name)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    const handleTogglePin = async () => {
        const isPinned = !!place.pinned

        await updatePlace({
            ...place,
            pinned: !isPinned,
            pinnedAt: !isPinned ? Date.now() : undefined,
        })

        onLoadPlaces()
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this location?')

        if (!confirmDelete) {
            return
        }

        await deletePlace(place.id!)
        onLoadPlaces()
        toast.success('Location deleted', 'The location has been successfully deleted.')
    }

    const handleEditDesktop = async () => {
        const newName = prompt('Edit location name:', place.name)

        if (!newName || !newName.trim()) {
            return
        }

        await updatePlace({ ...place, name: newName.trim() })
        onLoadPlaces()
    }

    const handleEditMobile = () => {
        setName(place.name)
        setError(null)
        setIsOpen(true)
    }

    const handleSaveMobile = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        await updatePlace({ ...place, name: trimmed })
        onLoadPlaces()
        setIsOpen(false)
    }

    return (
        <>
            <li className="flex items-center justify-between gap-x-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
                <Link
                    href={`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`}
                    className="font-bold"
                >
                    {place.name}
                </Link>

                <div className="flex items-center gap-x-3">
                    <div onClick={handleTogglePin} className="cursor-pointer">
                        <PinIcon size={18} color={place.pinned ? '#000000' : '#9CA3AF'} />
                    </div>

                    <div
                        className="cursor-pointer text-gray-400 hover:text-black"
                        onClick={isMobile ? handleEditMobile : handleEditDesktop}
                    >
                        <PencilIcon size={18} />
                    </div>

                    <div
                        className="hidden cursor-pointer text-gray-400 hover:text-red-500 md:block"
                        onClick={handleDelete}
                    >
                        <TrashIcon size={20} />
                    </div>
                </div>
            </li>

            {isMobile && (
                <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="mb-4 border-b border-gray-200 pb-4">
                        <div className="text-sm font-semibold">Edit location</div>
                        <div className="text-xs text-gray-500">Update the name or delete this location</div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            autoFocus
                            value={name}
                            error={error}
                            placeholder="Location name"
                            onChange={e => {
                                setName(e.target.value)
                                if (error) setError(null)
                            }}
                        />

                        <Button className="w-full" onClick={handleSaveMobile}>
                            Save changes
                        </Button>

                        <Button className="w-full text-red-500" onClick={handleDelete}>
                            Delete location
                        </Button>
                    </div>
                </BottomSheet>
            )}
        </>
    )
}
