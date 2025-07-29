'use client'

import { useEffect, useState } from 'react'

import { CheckIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useToast } from '@/utils/providers/toast-provider'

enum Navigator {
    Waze = 'waze',
    Google = 'google',
    Yandex = 'yandex',
    Apple = 'apple',
}

const NAVIGATORS = [
    {
        id: Navigator.Waze,
        name: 'Waze',
        icon: '/images/navigators/waze.png',
        link: (lat: number, lng: number) => `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    },
    {
        id: Navigator.Google,
        name: 'Google',
        icon: '/images/navigators/google.png',
        link: (lat: number, lng: number) => `https://google.com/maps/dir//${lat},${lng}`,
    },
    {
        id: Navigator.Yandex,
        name: 'Yandex',
        icon: '/images/navigators/yandex.png',
        link: (lat: number, lng: number) => `https://maps.yandex.ru/?text=${lat}+${lng}`,
    },
    {
        id: Navigator.Apple,
        name: 'Apple',
        icon: '/images/navigators/apple.png',
        link: (lat: number, lng: number) => `https://maps.apple.com/?daddr=${lat},${lng}`,
    },
]

export const LocationPickerShare = () => {
    const toast = useToast()
    const searchParams = useSearchParams()

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
        if (typeof window !== 'undefined' && window.navigator.share) {
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
        } else {
            handleCopy()
        }
    }

    return (
        <div className="space-y-4">
            <div className="text-sm">Choose a navigator and click "Open" to launch the location:</div>
            <div className="flex w-full flex-wrap items-center gap-4">
                {NAVIGATORS.map(nav => (
                    <div
                        key={nav.id}
                        className={`flex h-16 flex-1 cursor-pointer items-center justify-center rounded-lg border transition sm:flex-[1_1_100%] md:size-16 md:flex-none ${navigator === nav.id ? 'border-orange-300 bg-orange-100' : 'border-transparent bg-orange-50'}`}
                        title={nav.name}
                        onClick={() => setNavigator(nav.id)}
                    >
                        <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <Link
                    href={navLink}
                    className="cursor-pointer rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
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
            </div>
        </div>
    )
}
