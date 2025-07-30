'use client'

import { ReactNode } from 'react'

type LocationPickerMapControlProps = {
    children: ReactNode
    onClick: () => void
}

export const LocationPickerMapControl = ({ children, onClick }: LocationPickerMapControlProps) => {
    return (
        <button
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-white shadow"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
