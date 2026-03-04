'use client'

import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'

type LocationActionsShareButtonProps = {
    link: string
}

export const LocationActionsShareButton = ({ link }: LocationActionsShareButtonProps) => {
    const toast = useToast()

    const handleShare = async () => {
        try {
            await window.navigator.share({ url: link })
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
        <Button variant="minor" onClick={handleShare} className="block md:hidden">
            Share
        </Button>
    )
}
