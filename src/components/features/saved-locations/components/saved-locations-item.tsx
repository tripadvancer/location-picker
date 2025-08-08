import { CircleArrowRightIcon, TrashIcon } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { deletePlace } from '@/utils/db'
import { useToast } from '@/utils/providers/toast-provider'
import { Place } from '@/utils/types'

type SavedLocationsItemProps = {
    place: Place
    onLoadPlaces: () => void
}

export const SavedLocationsItem = ({ place, onLoadPlaces }: SavedLocationsItemProps) => {
    const toast = useToast()
    const router = useRouter()

    const handleDelete = async (id?: number) => {
        if (id !== undefined) {
            const confirmDelete = window.confirm('Are you sure you want to delete this location?')
            if (!confirmDelete) return

            await deletePlace(id)
            onLoadPlaces()
            toast.success('Location deleted', 'The location has been successfully deleted.')
        }
    }

    const handleClick = (place: Place) => {
        router.push(`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`)
    }

    return (
        <li
            key={`place-${place.id}`}
            className="flex items-center justify-between gap-x-4 rounded-lg bg-gray-50 p-4 text-sm"
        >
            <Link href={`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`} className="font-bold">
                {place.name}
            </Link>

            <div className="flex items-center gap-x-4">
                <div
                    className="pointer-none: cursor-pointer text-gray-400 hover:text-gray-950"
                    onClick={() => handleDelete(place.id)}
                >
                    <TrashIcon size={20} />
                </div>
                <div
                    className="pointer-none: cursor-pointer text-gray-400 hover:text-gray-950"
                    onClick={() => handleClick(place)}
                >
                    <CircleArrowRightIcon size={20} />
                </div>
            </div>
        </li>
    )
}
