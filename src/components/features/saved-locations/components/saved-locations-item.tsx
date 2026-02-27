'use client'

import { PencilIcon, PinIcon } from 'lucide-react'

import Link from 'next/link'

import { useOverlay } from '@/components/providers/overlay-provider'
import { updatePlace } from '@/utils/db'
import { Place } from '@/utils/types'

import { EditLocation } from '../../dialogs/edit-location/edit-location'

type SavedLocationsItemProps = {
    place: Place
    onLoadPlaces: () => void
}

export const SavedLocationsItem = ({ place, onLoadPlaces }: SavedLocationsItemProps) => {
    const overlay = useOverlay()

    const handleTogglePin = async () => {
        const isPinned = !!place.pinned

        await updatePlace({
            ...place,
            pinned: !isPinned,
            pinnedAt: !isPinned ? Date.now() : undefined,
        })

        onLoadPlaces()
    }

    const handleEdit = () => {
        overlay.open(<EditLocation place={place} onSuccess={onLoadPlaces} />)
    }

    return (
        <li className="flex items-center justify-between gap-x-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
            <Link href={`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`} className="font-bold">
                {place.name}
            </Link>

            <div className="flex items-center gap-x-3">
                <div className="cursor-pointer text-gray-400 hover:text-black" onClick={handleEdit}>
                    <PencilIcon size={18} />
                </div>
                <div onClick={handleTogglePin} className="cursor-pointer">
                    <PinIcon size={18} color={place.pinned ? '#000000' : '#9CA3AF'} />
                </div>
            </div>
        </li>
    )
}
