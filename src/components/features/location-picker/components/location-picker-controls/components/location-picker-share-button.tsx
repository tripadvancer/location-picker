'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/utils/providers/toast-provider'

type LocationPickerShareButtonProps = {
    navLink: string
}

export const LocationPickerShareButton = ({ navLink }: LocationPickerShareButtonProps) => {
    const toast = useToast()

    const handleShare = async () => {
        try {
            await window.navigator.share({ url: navLink })
        } catch (err: unknown) {
            if (
                err instanceof DOMException &&
                (err.name === 'AbortError' ||
                    err.name === 'DOMException' ||
                    err.message.toLowerCase().includes('cancel'))
            ) {
                return
            }

            toast.error('Error', 'Failed to share link')
        }
    }

    return (
        <Button onClick={handleShare} className="block md:hidden">
            Share
        </Button>
    )
}
