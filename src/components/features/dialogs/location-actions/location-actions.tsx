'use client'

import Image from 'next/image'

import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'
import { Coordinates } from '@/utils/types'

import { LocationActionsCancelButton } from './components/location-actions-cancel-button'
import { LocationActionsCopyButton } from './components/location-actions-copy-button'
import { LocationActionsOpenButton } from './components/location-actions-open-button'
import { LocationActionsShareButton } from './components/location-actions-share-button'

type LocationActionsProps = {
    navigator: Navigator
    coordinates: Coordinates
}

export const LocationActions = ({ navigator, coordinates }: LocationActionsProps) => {
    const link = NAVIGATORS.find(nav => nav.id === navigator)!.link(coordinates.lat, coordinates.lng)

    return (
        <div className="md:w-87">
            {(() => {
                const activeNav = NAVIGATORS.find(n => n.id === navigator)!

                return (
                    <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
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
                <LocationActionsOpenButton link={link} />
                <LocationActionsCopyButton link={link} />
                <LocationActionsShareButton link={link} />
                <LocationActionsCancelButton />
            </div>
        </div>
    )
}
