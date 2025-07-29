'use client'

import { useState } from 'react'

import { useCopyToClipboard } from 'usehooks-ts'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

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

const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(window.navigator.userAgent)

export const LocationPickerShare = () => {
    const toast = useToast()
    const router = useRouter()

    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const [navigator, setNavigator] = useState<Navigator>(Navigator.Waze)

    if (!lat || !lng) {
        return
    }

    const selectedNav = NAVIGATORS.find(nav => nav.id === navigator)!
    const navLink = selectedNav.link(Number(parseFloat(lat).toFixed(6)), Number(parseFloat(lng).toFixed(6)))

    const handleCopy = async () => {
        if (typeof window !== 'undefined' && window.navigator.clipboard) {
            try {
                await window.navigator.clipboard.writeText(navLink)
                toast.success('Success', 'Link copied to clipboard!')
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
            } catch {
                toast.error('Error', 'Failed to share link')
            }
        } else {
            handleCopy()
        }
    }

    return (
        <div className="space-y-4">
            <div className="text-sm">Choose a navigator:</div>
            <div className="flex items-center gap-x-4">
                {NAVIGATORS.map(nav => (
                    <div
                        key={nav.id}
                        className={`flex size-16 cursor-pointer items-center justify-center rounded-lg border transition ${
                            navigator === nav.id ? 'border-orange-300 bg-orange-100' : 'border-transparent bg-orange-50'
                        }`}
                        title={nav.name}
                        onClick={() => setNavigator(nav.id)}
                    >
                        <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <Link href={navLink} className="cursor-pointer rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300">
                    Open
                </Link>

                <Button onClick={handleCopy}>Copy link</Button>

                {isMobile && typeof window.navigator.share === 'function' && (
                    <Button onClick={handleShare}>Share</Button>
                )}
            </div>
        </div>
    )
}
