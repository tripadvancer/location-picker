'use client'

import { useEffect, useState } from 'react'

import { CircleArrowRightIcon, TrashIcon } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { deletePlace, getPlaces } from '@/utils/db'
import { useToast } from '@/utils/providers/toast-provider'
import { Place } from '@/utils/types'

export const SavedLocations = () => {
    const toast = useToast()
    const router = useRouter()
    const [places, setPlaces] = useState<Place[]>([])

    useEffect(() => {
        loadPlaces()
    }, [])

    const loadPlaces = async () => {
        const savedPlaces = await getPlaces()
        setPlaces(savedPlaces)
    }

    const handleDelete = async (id?: number) => {
        if (id !== undefined) {
            const confirmDelete = window.confirm('Are you sure you want to delete this location?')
            if (!confirmDelete) return

            await deletePlace(id)
            loadPlaces()
            toast.success('Location deleted', 'The location has been successfully deleted.')
        }
    }

    const handleClick = (place: Place) => {
        router.push(`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`)
    }

    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-lg font-bold">My Saved Locations</h1>
                <p className="text-sm text-gray-500">
                    Here you can find all the locations you have saved. For saving a&nbsp;location, use the
                    &laquo;Save&raquo; button on the map.
                </p>
            </div>

            <ul className="space-y-2">
                {places.map(place => (
                    <li
                        key={`place-${place.id}`}
                        className="flex items-center justify-between space-y-1 gap-x-4 rounded-lg bg-gray-50 p-4 text-sm"
                    >
                        <Link
                            href={`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`}
                            className="font-bold"
                        >
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
                ))}
            </ul>
        </section>
    )
}
