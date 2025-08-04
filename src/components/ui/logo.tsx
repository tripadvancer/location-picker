import { MapPinCheckIcon } from 'lucide-react'

import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/" className="flex w-full items-center gap-x-2 sm:w-auto">
            <MapPinCheckIcon strokeWidth={2.5} />
            <span className="text-xl font-extrabold whitespace-nowrap uppercase">Location Picker</span>
        </Link>
    )
}
