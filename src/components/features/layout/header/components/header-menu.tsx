'use client'

import { ChevronRightIcon } from 'lucide-react'
import { useScrollLock } from 'usehooks-ts'

import Link from 'next/link'

type HeaderMenuProps = {
    closeMobileMenu: () => void
}

export const HeaderMenu = ({ closeMobileMenu }: HeaderMenuProps) => {
    useScrollLock()

    return (
        <nav className="absolute top-0 right-0 bottom-0 left-0 z-40 mt-[61px] flex flex-col gap-y-4 bg-white p-4 sm:mt-[73px] sm:px-8">
            <Link href="/" className="flex items-center justify-between" onClick={closeMobileMenu}>
                Home
                <div className="text-gray-700">
                    <ChevronRightIcon size={20} />
                </div>
            </Link>
            <Link href="/saved" className="flex items-center justify-between" onClick={closeMobileMenu}>
                My Saved Locations
                <div className="text-gray-700">
                    <ChevronRightIcon size={20} />
                </div>
            </Link>
            <Link href="/coordinate-converter" className="flex items-center justify-between" onClick={closeMobileMenu}>
                Coordinate Converter
                <div className="text-gray-700">
                    <ChevronRightIcon size={20} />
                </div>
            </Link>
            <Link href="/about" className="flex items-center justify-between" onClick={closeMobileMenu}>
                About
                <div className="text-gray-700">
                    <ChevronRightIcon size={20} />
                </div>
            </Link>
        </nav>
    )
}
