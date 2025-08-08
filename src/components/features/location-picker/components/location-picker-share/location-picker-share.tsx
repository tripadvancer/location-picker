'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'

import { LocationPickerShareCopyButton } from './components/location-picker-share-copy-button'
import { LocationPickerShareOpenButton } from './components/location-picker-share-open-button'
import { LocationPickerShareSaveButton } from './components/location-picker-share-save-button'
import { LocationPickerShareShareButton } from './components/location-picker-share-share-button'

export const LocationPickerShare = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const [navigator, setNavigator] = useState<Navigator>(Navigator.Waze)

    if (!lat || !lng) return null

    const navLink = NAVIGATORS.find(nav => nav.id === navigator)!.link(
        Number(parseFloat(lat).toFixed(6)),
        Number(parseFloat(lng).toFixed(6)),
    )

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
                <LocationPickerShareOpenButton navLink={navLink} />
                <LocationPickerShareCopyButton navLink={navLink} />
                <LocationPickerShareShareButton navLink={navLink} />
                <LocationPickerShareSaveButton coordinates={{ lat: Number(lat), lng: Number(lng) }} />
            </div>
        </div>
    )
}
