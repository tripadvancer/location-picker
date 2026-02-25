import { PinIcon, TrashIcon } from 'lucide-react'

import Link from 'next/link'

import { deletePlace, updatePlace } from '@/utils/db'
import { useToast } from '@/utils/providers/toast-provider'
import { Place } from '@/utils/types'

type SavedLocationsItemProps = {
    place: Place
    onLoadPlaces: () => void
}

export const SavedLocationsItem = ({ place, onLoadPlaces }: SavedLocationsItemProps) => {
    const toast = useToast()

    const handleTogglePin = async () => {
        const isPinned = !!place.pinned

        await updatePlace({
            ...place,
            pinned: !isPinned,
            pinnedAt: !isPinned ? Date.now() : undefined,
        })

        onLoadPlaces()
    }

    const handleDelete = async (id?: number) => {
        if (id !== undefined) {
            const confirmDelete = window.confirm('Are you sure you want to delete this location?')
            if (!confirmDelete) return

            await deletePlace(id)
            onLoadPlaces()
            toast.success('Location deleted', 'The location has been successfully deleted.')
        }
    }

    return (
        <li
            key={`place-${place.id}`}
            className="flex items-center justify-between gap-x-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm"
        >
            <Link href={`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`} className="font-bold">
                {place.name}
            </Link>

            <div className="flex items-center gap-x-3">
                <div className="cursor-pointer" onClick={handleTogglePin} title={place.pinned ? 'Unpin' : 'Pin'}>
                    <PinIcon size={18} color={place.pinned ? '#000000' : '#9CA3AF'} />
                </div>
                <div
                    className="pointer-none: cursor-pointer text-gray-400 hover:text-red-500"
                    onClick={() => handleDelete(place.id)}
                >
                    <TrashIcon size={20} />
                </div>
            </div>
        </li>
    )
}
