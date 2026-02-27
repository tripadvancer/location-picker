'use client'

import { LocationPickerControlsDesktop } from './location-picker-controls-desktop'
import { LocationPickerControlsMobile } from './location-picker-controls-mobile'

export const LocationPickerControls = () => {
    return (
        <>
            <LocationPickerControlsMobile />
            <LocationPickerControlsDesktop />
        </>
    )
}
