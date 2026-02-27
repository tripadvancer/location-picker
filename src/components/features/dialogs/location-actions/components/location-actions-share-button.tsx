'use client'

import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'

type LocationActionsShareButtonProps = {
    navLink: string
}

export const LocationActionsShareButton = ({ navLink }: LocationActionsShareButtonProps) => {
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
