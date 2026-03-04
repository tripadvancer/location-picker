'use client'

import Link from 'next/link'

type LocationActionsOpenButtonProps = {
    link: string
}

export const LocationActionsOpenButton = ({ link }: LocationActionsOpenButtonProps) => {
    return (
        <Link
            href={link}
            className="flex h-12 cursor-pointer items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white hover:bg-orange-400"
            target="_blank"
            rel="noopener noreferrer"
        >
            Open
        </Link>
    )
}
