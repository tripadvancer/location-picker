'use client'

import { Preview } from '@/components/features/dialogs/preview/preview'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Place } from '@/utils/types'

type EditLocationCancelButtonProps = {
    place: Place
    onSuccess: () => void
}

export const EditLocationCancelButton = ({ place, onSuccess }: EditLocationCancelButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<Preview place={place} onSuccess={onSuccess} />)
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            Cancel
        </Button>
    )
}
