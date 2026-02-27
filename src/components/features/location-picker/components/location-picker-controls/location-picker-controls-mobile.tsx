'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { BottomSheet } from '@/components/ui/bottom-sheet'
import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'

import { LocationPickerCopyButton } from './components/location-picker-copy-button'
import { LocationPickerOpenButton } from './components/location-picker-open-button'
import { LocationPickerSaveButton } from './components/location-picker-save-button'
import { LocationPickerShareButton } from './components/location-picker-share-button'

export const LocationPickerControlsMobile = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const [navigator, setNavigator] = useState<Navigator>(Navigator.Waze)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    if (!lat || !lng) return null

    const navLink = NAVIGATORS.find(nav => nav.id === navigator)!.link(
        Number(parseFloat(lat).toFixed(6)),
        Number(parseFloat(lng).toFixed(6)),
    )

    const handleNavigatorClick = (id: Navigator) => {
        setNavigator(id)
        setIsSheetOpen(true)
    }

    return (
        <div className="block space-y-4 md:hidden">
            <div className="grid w-full grid-cols-4 gap-2">
                {NAVIGATORS.map(nav => (
                    <div
                        key={`navigators-app-${nav.id}`}
                        onClick={() => handleNavigatorClick(nav.id)}
                        className="flex h-20 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg bg-orange-50 transition"
                    >
                        <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                        <div className="text-xs font-bold">{nav.name}</div>
                    </div>
                ))}
            </div>

            <div>
                <LocationPickerSaveButton coordinates={{ lat: Number(lat), lng: Number(lng) }} />
                <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
                    {(() => {
                        const activeNav = NAVIGATORS.find(n => n.id === navigator)!
                        return (
                            <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                                    <Image src={activeNav.icon} width={24} height={24} alt={activeNav.name} />
                                </div>
                                <div className="text-sm">
                                    <div className="font-semibold">{activeNav.name}</div>
                                    <div className="text-gray-500">Choose an action</div>
                                </div>
                            </div>
                        )
                    })()}

                    <div className="flex flex-col gap-3">
                        <LocationPickerOpenButton navLink={navLink} />
                        <LocationPickerCopyButton navLink={navLink} />
                        <LocationPickerShareButton navLink={navLink} />
                    </div>
                </BottomSheet>
            </div>
        </div>
    )
}
