'use client'

import Link from 'next/link'

type LocationActionsOpenButtonProps = {
    navLink: string
}

export const LocationActionsOpenButton = ({ navLink }: LocationActionsOpenButtonProps) => {
    return (
        <Link
            href={navLink}
            className="flex h-12 cursor-pointer items-center justify-center rounded-lg bg-gray-200 px-4 text-sm hover:bg-gray-300"
            target="_blank"
            rel="noopener noreferrer"
        >
            Open
        </Link>
    )
}
