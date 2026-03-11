import { useState } from 'react'

import { CheckIcon } from 'lucide-react'

import { useToast } from '@/components/providers/toast-provider'
import { Button } from '@/components/ui/button'
import { Place } from '@/utils/types'

type PreviewCopyCoordinatesButtonProps = {
    place: Place
}

export const PreviewCopyCoordinatesButton = ({ place }: PreviewCopyCoordinatesButtonProps) => {
    const toast = useToast()
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (typeof window !== 'undefined' && window.navigator.clipboard) {
            try {
                await window.navigator.clipboard.writeText(`${place.coordinates.lat}, ${place.coordinates.lng}`)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch {
                toast.error('Error', 'Failed to copy coordinates')
            }
        } else {
            toast.error('Error', 'Clipboard not supported in this browser')
        }
    }

    return (
        <Button variant="minor" className="w-full" onClick={handleCopy}>
            {copied ? (
                <span className="flex items-center justify-center gap-1 text-green-600">
                    <CheckIcon className="h-4 w-4" /> Copied
                </span>
            ) : (
                'Copy coordinates'
            )}
        </Button>
    )
}
