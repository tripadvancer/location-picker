import { Confirmation } from '@/components/features/dialogs/confirmation/confirmation'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { deletePlace } from '@/utils/db'
import { Place } from '@/utils/types'

import { Preview } from '../preview'

type PreviewDeleteButtonProps = {
    place: Place
    onSuccess: () => void
}

export const PreviewDeleteButton = ({ place, onSuccess }: PreviewDeleteButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(
            <Confirmation
                title="Delete location"
                message="Are you sure you want to delete this location?"
                onConfirm={async () => {
                    try {
                        await deletePlace(place.id)
                        onSuccess()
                        overlay.close()
                    } catch (err) {
                        console.error(err)
                    }
                }}
                onCancel={() => {
                    overlay.open(<Preview place={place} onSuccess={onSuccess} />)
                }}
            />,
        )
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            Delete
        </Button>
    )
}
