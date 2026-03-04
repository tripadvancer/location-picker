import { EditLocation } from '@/components/features/dialogs/edit-location/edit-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Place } from '@/utils/types'

type PreviewEditButtonProps = {
    place: Place
    onSuccess: () => void
}

export const PreviewEditButton = ({ place, onSuccess }: PreviewEditButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<EditLocation place={place} onSuccess={onSuccess} />)
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleClick}>
            Edit
        </Button>
    )
}
