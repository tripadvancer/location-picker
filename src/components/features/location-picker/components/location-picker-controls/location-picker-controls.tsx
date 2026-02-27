'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { LocationActions } from '@/components/features/dialogs/location-actions/location-actions'
import { useOverlay } from '@/components/providers/overlay-provider'
import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'

import { LocationPickerSaveButton } from './components/location-picker-save-button'

export const LocationPickerControls = () => {
    const overlay = useOverlay()
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    if (!lat || !lng) return null

    const handleNavigatorClick = (navigator: Navigator) => {
        overlay.open(<LocationActions navigator={navigator} coordinates={{ lat: Number(lat), lng: Number(lng) }} />)
    }

    return (
        <div className="space-y-4">
            <div className="grid w-full grid-cols-4 gap-2">
                {NAVIGATORS.map(nav => (
                    <div
                        key={nav.id}
                        onClick={() => handleNavigatorClick(nav.id)}
                        className="flex h-20 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-transparent bg-orange-50 transition hover:border-orange-200 hover:bg-orange-100"
                    >
                        <Image src={nav.icon} width={32} height={32} alt={nav.name} />
                        <div className="text-xs font-bold">{nav.name}</div>
                    </div>
                ))}
            </div>
            <LocationPickerSaveButton coordinates={{ lat: Number(lat), lng: Number(lng) }} />
        </div>
    )
}
