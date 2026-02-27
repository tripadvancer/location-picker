'use client'

import { useState } from 'react'

import classNames from 'classnames'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'

import { LocationPickerCopyButton } from './components/location-picker-copy-button'
import { LocationPickerOpenButton } from './components/location-picker-open-button'
import { LocationPickerSaveButton } from './components/location-picker-save-button'
import { LocationPickerShareButton } from './components/location-picker-share-button'

export const LocationPickerControlsDesktop = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const [navigator, setNavigator] = useState<Navigator>(Navigator.Waze)

    if (!lat || !lng) return null

    const navLink = NAVIGATORS.find(nav => nav.id === navigator)!.link(
        Number(parseFloat(lat).toFixed(6)),
        Number(parseFloat(lng).toFixed(6)),
    )

    const handleNavigatorClick = (id: Navigator) => {
        setNavigator(id)
    }

    return (
        <div className="hidden space-y-4 md:block">
            <div className="grid w-full grid-cols-4 gap-2">
                {NAVIGATORS.map(nav => (
                    <div
                        key={nav.id}
                        onClick={() => handleNavigatorClick(nav.id)}
                        className={classNames(
                            'flex h-20 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border transition',
                            navigator === nav.id
                                ? 'border-orange-300 bg-orange-100'
                                : 'border-transparent bg-orange-50',
                        )}
                    >
                        <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                        <div className="text-xs font-bold">{nav.name}</div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <LocationPickerOpenButton navLink={navLink} />
                <LocationPickerCopyButton navLink={navLink} />
                <LocationPickerShareButton navLink={navLink} />
                <LocationPickerSaveButton coordinates={{ lat: Number(lat), lng: Number(lng) }} />
            </div>
        </div>
    )
}
