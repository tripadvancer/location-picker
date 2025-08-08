'use client'

import { useEffect, useState } from 'react'

import { CheckIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { NAVIGATORS } from '@/utils/constants'
import { addPlace } from '@/utils/db'
import { Navigator } from '@/utils/enums'
import { useToast } from '@/utils/providers/toast-provider'
import { Place } from '@/utils/types'

export const LocationPickerShare = () => {
    const searchParams = useSearchParams()
    const toast = useToast()

    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const [navigator, setNavigator] = useState<Navigator>(Navigator.Waze)
    const [copied, setCopied] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(/Mobi|Android/i.test(window.navigator.userAgent))
        }
    }, [])

    if (!lat || !lng) return null

    const selectedNav = NAVIGATORS.find(nav => nav.id === navigator)!
    const navLink = selectedNav.link(Number(parseFloat(lat).toFixed(6)), Number(parseFloat(lng).toFixed(6)))

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

    const handleShare = async () => {
        try {
            await window.navigator.share({
                title: `Open in ${selectedNav.name}`,
                url: navLink,
            })
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

    const handleSave = async () => {
        if (!lat || !lng) return

        const name = prompt('Enter location name:')
        if (!name || !name.trim()) return

        try {
            const place: Omit<Place, 'id'> = {
                coordinates: { lat: Number(lat), lng: Number(lng) },
                name: name.trim(),
            }

            await addPlace(place)
            toast.success('Success', 'Location saved successfully')
        } catch (err) {
            console.error(err)
            toast.error('Error', 'Failed to save location')
        }
    }

    return (
        <div className="space-y-4">
            <div className="text-sm">
                Choose a&nbsp;navigator and click &laquo;Open&raquo; to&nbsp;launch the location:
            </div>
            <div className="flex w-full flex-wrap items-center gap-4">
                {NAVIGATORS.map(nav => (
                    <div
                        key={nav.id}
                        className={`flex h-20 flex-1 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border transition sm:flex-[1_1_100%] md:size-20 md:flex-none ${navigator === nav.id ? 'border-orange-300 bg-orange-100' : 'border-transparent bg-orange-50'}`}
                        title={nav.name}
                        onClick={() => setNavigator(nav.id)}
                    >
                        <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                        <div className="text-xs font-bold">{nav.name}</div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <Link
                    href={navLink}
                    className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-gray-200 px-4 text-sm hover:bg-gray-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open
                </Link>

                <Button onClick={handleCopy}>
                    {copied ? (
                        <span className="flex items-center gap-1 text-green-600">
                            <CheckIcon className="h-4 w-4" /> Copied
                        </span>
                    ) : (
                        'Copy link'
                    )}
                </Button>

                {isMobile && typeof window !== 'undefined' && typeof window.navigator.share === 'function' && (
                    <Button onClick={handleShare}>Share</Button>
                )}

                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}
