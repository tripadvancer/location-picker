import { MapPinCheckIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/" className="flex w-full items-center gap-x-2 sm:w-auto">
            {/* <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" /> */}
            {/* <span>|</span> */}
            <MapPinCheckIcon strokeWidth={2.5} />
            <span className="text-xl font-extrabold whitespace-nowrap uppercase">Location Picker</span>
        </Link>
    )
}
