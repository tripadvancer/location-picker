'use client'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Place } from '@/utils/types'

import { PreviewDeleteButton } from './components/preview-delete-button'
import { PreviewEditButton } from './components/preview-edit-button'
import { PreviewShowOnMapButton } from './components/preview-show-on-map-button'

type PreviewProps = {
    place: Place
    onSuccess: () => void
}

export const Preview = ({ place, onSuccess }: PreviewProps) => {
    const overlay = useOverlay()

    const handleCancel = () => {
        overlay.close()
    }

    return (
        <div className="space-y-4 md:w-87">
            <div className="border-b border-gray-200 pb-4">
                <div className="text-sm font-semibold">{place.name}</div>
                <div className="text-xs text-gray-500">Choose an action</div>
            </div>

            <PreviewShowOnMapButton place={place} />
            <PreviewEditButton place={place} onSuccess={onSuccess} />
            <PreviewDeleteButton place={place} onSuccess={onSuccess} />

            <Button variant="minor" className="w-full md:hidden" onClick={handleCancel}>
                Cancel
            </Button>
        </div>
    )
}
