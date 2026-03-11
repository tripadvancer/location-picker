'use client'

import { Place } from '@/utils/types'

import { EditLocationCancelButton } from './components/edit-location-cancel-button'
import { EditLocationDeleteButton } from './components/edit-location-delete-button'
import { EditLocationForm } from './components/edit-location-form'

type EditLocationProps = {
    place: Place
    onSuccess: () => void
}

export const EditLocation = ({ place, onSuccess }: EditLocationProps) => {
    return (
        <div className="space-y-4 md:w-87">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">Edit location</div>
                <div className="text-xs text-gray-500">Update the name or delete this location</div>
            </div>

            <EditLocationForm place={place} onSuccess={onSuccess} />
            <EditLocationDeleteButton place={place} onSuccess={onSuccess} />
            <EditLocationCancelButton place={place} onSuccess={onSuccess} />
        </div>
    )
}
