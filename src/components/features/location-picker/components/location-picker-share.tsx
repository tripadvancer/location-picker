import { Share2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const LocationPickerShare = () => {
    return (
        <Button className="w-full sm:w-auto">
            <Share2Icon />
            Share this location
        </Button>
    )
}
