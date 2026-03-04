import { useRouter } from 'next/navigation'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Place } from '@/utils/types'

type PreviewShowOnMapButtonProps = {
    place: Place
}

export const PreviewShowOnMapButton = ({ place }: PreviewShowOnMapButtonProps) => {
    const router = useRouter()
    const overlay = useOverlay()

    const handleClick = () => {
        router.push(`/?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}&zoom=15`)
        overlay.close()
    }

    return (
        <Button variant="major" className="w-full" onClick={handleClick}>
            Show on map
        </Button>
    )
}
