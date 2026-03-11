'use client'

import { Coordinates } from '@/utils/types'

import { AddLocationCancelButton } from './components/add-location-cancel-button'
import { AddLocationForm } from './components/add-location-form'

type AddLocationProps = {
    coordinates: Coordinates
}

export const AddLocation = ({ coordinates }: AddLocationProps) => {
    return (
        <div className="space-y-4 md:w-87">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Save location</div>
                <div className="text-xs text-gray-500">Enter a name for this location</div>
            </div>

            <AddLocationForm coordinates={coordinates} />
            <AddLocationCancelButton />
        </div>
    )
}
