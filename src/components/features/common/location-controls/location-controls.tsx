'use client'

import Image from 'next/image'

import { LocationActions } from '@/components/features/dialogs/location-actions/location-actions'
import { useOverlay } from '@/components/providers/overlay-provider'
import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'
import { Coordinates } from '@/utils/types'

import { LocationSaveButton } from './components/location-save-button'

type LocationControlsProps = {
    coordinates: Coordinates
}

export const LocationControls = ({ coordinates }: LocationControlsProps) => {
    const overlay = useOverlay()

    const handleNavigatorClick = (navigator: Navigator) => {
        overlay.open(<LocationActions navigator={navigator} coordinates={coordinates} />)
    }

    return (
        <div className="space-y-4">
            <div className="grid w-full grid-cols-4 gap-2">
                {NAVIGATORS.map(nav => (
                    <div
                        key={nav.id}
                        onClick={() => handleNavigatorClick(nav.id)}
                        className="flex h-20 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-xl border border-transparent bg-orange-50 transition hover:border-orange-200 hover:bg-orange-100"
                    >
                        <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                        <div className="text-xs font-bold">{nav.name}</div>
                    </div>
                ))}
            </div>
            <LocationSaveButton coordinates={coordinates} />
        </div>
    )
}
