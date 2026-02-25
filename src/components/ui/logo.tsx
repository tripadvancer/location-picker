import { MapPinCheckIcon } from 'lucide-react'

import Link from 'next/link'

type LogoProps = {
    onClick: () => void
}

export const Logo = ({ onClick }: LogoProps) => {
    return (
        <Link href="/" className="flex w-full items-center gap-x-2 md:w-auto" onClick={onClick}>
            <MapPinCheckIcon strokeWidth={2.5} />
            <span className="text-xl font-extrabold whitespace-nowrap uppercase">Location Picker</span>
        </Link>
    )
}
