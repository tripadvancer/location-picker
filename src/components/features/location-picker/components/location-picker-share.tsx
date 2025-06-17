import { Share2Icon } from 'lucide-react'

export const LocationPickerShare = () => {
    return (
        <div className="flex cursor-pointer items-center gap-x-2 text-blue-500">
            Share this location
            <Share2Icon />
        </div>
    )
}
