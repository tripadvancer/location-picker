import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="https://www.tripadvancer.com" className="flex items-center gap-x-2" target="_blank">
            <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" />
            <span>|</span>
            <span className="text-sm font-semibold uppercase">Location Picker</span>
        </Link>
    )
}
