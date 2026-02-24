'use client'

import Link from 'next/link'

type LocationPickerShareOpenButtonProps = {
    navLink: string
}

export const LocationPickerShareOpenButton = ({ navLink }: LocationPickerShareOpenButtonProps) => {
    return (
        <Link
            href={navLink}
            className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-gray-200 px-4 text-sm hover:bg-gray-300"
            target="_blank"
            rel="noopener noreferrer"
        >
            Open
        </Link>
    )
}
