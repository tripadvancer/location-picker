'use client'

import { useState } from 'react'

import { CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/utils/providers/toast-provider'

type LocationPickerShareCopyButtonProps = {
    navLink: string
}

export const LocationPickerShareCopyButton = ({ navLink }: LocationPickerShareCopyButtonProps) => {
    const toast = useToast()
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (typeof window !== 'undefined' && window.navigator.clipboard) {
            try {
                await window.navigator.clipboard.writeText(navLink)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch {
                toast.error('Error', 'Failed to copy link')
            }
        } else {
            toast.error('Error', 'Clipboard not supported in this browser')
        }
    }

    return (
        <Button onClick={handleCopy}>
            {copied ? (
                <span className="flex items-center gap-1 text-green-600">
                    <CheckIcon className="h-4 w-4" /> Copied
                </span>
            ) : (
                'Copy link'
            )}
        </Button>
    )
}
